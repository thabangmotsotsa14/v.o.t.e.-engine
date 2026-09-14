import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

const RATE_WINDOW_MS = 60 * 60 * 1000 // 1h
const RATE_MAX = 5

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  contact_method: z.enum(['email', 'mobile']),
  email: z.string().trim().email().max(255).optional().nullable(),
  mobile: z.string().trim().regex(/^(\+?27|0)[6-8]\d{8}$/).max(20).optional().nullable(),
  national_id: z.string().regex(/^\d{13}$/).optional().nullable(),
  province: z.string().min(2).max(50),
}).refine((d) => (d.contact_method === 'email' ? !!d.email : !!d.mobile), {
  message: 'Provide the selected contact detail',
})

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

async function checkRateLimit(ipHash: string): Promise<boolean> {
  const now = new Date()
  const { data } = await supabase
    .from('pledge_rate_limit')
    .select('count, window_start')
    .eq('ip_hash', ipHash)
    .maybeSingle()

  if (!data) {
    await supabase.from('pledge_rate_limit').insert({ ip_hash: ipHash, count: 1, window_start: now.toISOString() })
    return true
  }
  const started = new Date(data.window_start).getTime()
  if (now.getTime() - started > RATE_WINDOW_MS) {
    await supabase.from('pledge_rate_limit').update({ count: 1, window_start: now.toISOString(), updated_at: now.toISOString() }).eq('ip_hash', ipHash)
    return true
  }
  if (data.count >= RATE_MAX) return false
  await supabase.from('pledge_rate_limit').update({ count: data.count + 1, updated_at: now.toISOString() }).eq('ip_hash', ipHash)
  return true
}

async function logAudit(entry: Record<string, unknown>) {
  try { await supabase.from('pledge_audit_log').insert(entry) } catch (e) { console.warn('audit log failed', e) }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  const ipHash = await sha256Hex(ip)
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null

  let body: unknown
  try { body = await req.json() } catch {
    await logAudit({ outcome: 'invalid', reason: 'bad_json', ip_hash: ipHash, user_agent: userAgent })
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: jsonHeaders })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const reason = parsed.error.issues[0]?.message ?? 'validation_failed'
    await logAudit({ outcome: 'invalid', reason, ip_hash: ipHash, user_agent: userAgent })
    return new Response(JSON.stringify({ error: reason }), { status: 400, headers: jsonHeaders })
  }

  const allowed = await checkRateLimit(ipHash)
  if (!allowed) {
    await logAudit({ outcome: 'rate_limited', ip_hash: ipHash, user_agent: userAgent })
    return new Response(JSON.stringify({ error: 'Too many submissions from this network. Please try again later.' }), { status: 429, headers: jsonHeaders })
  }

  const d = parsed.data
  const { data: inserted, error } = await supabase
    .from('pledges')
    .insert({
      full_name: d.full_name,
      contact_method: d.contact_method,
      email: d.email ?? null,
      mobile: d.mobile ?? null,
      national_id: d.national_id ?? null,
      province: d.province,
    })
    .select('id, transaction_id')
    .single()

  if (error) {
    if (error.code === '23505') {
      let reason = 'duplicate'
      if (error.message.includes('unique_full_name')) reason = 'duplicate_name'
      else if (error.message.includes('unique_mobile')) reason = 'duplicate_mobile'
      else if (error.message.includes('unique_email')) reason = 'duplicate_email'
      await logAudit({ outcome: 'duplicate', reason, ip_hash: ipHash, user_agent: userAgent })
      const msg = reason === 'duplicate_name' ? 'This name has already been registered.'
        : reason === 'duplicate_mobile' ? 'This mobile number has already been registered.'
        : reason === 'duplicate_email' ? 'This email has already been registered.'
        : 'You have already registered.'
      // Return 200 so the client SDK does not throw; the form reads `ok: false`.
      return new Response(JSON.stringify({ ok: false, error: msg, code: 'duplicate' }), { status: 200, headers: jsonHeaders })
    }
    console.error('pledge insert error', error)
    await logAudit({ outcome: 'error', reason: error.message?.slice(0, 200), ip_hash: ipHash, user_agent: userAgent })
    return new Response(JSON.stringify({ error: 'Could not record your pledge. Please try again.' }), { status: 500, headers: jsonHeaders })
  }

  // Graceful email send — never breaks the pledge
  let emailStatus: 'sent' | 'queued_fallback' | 'skipped' = 'skipped'
  if (d.email) {
    try {
      const { error: emailErr } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'pledge-confirmation',
          recipientEmail: d.email,
          idempotencyKey: `pledge-${inserted.transaction_id}`,
          templateData: { name: d.full_name, transactionId: inserted.transaction_id, province: d.province },
        },
      })
      if (emailErr) throw emailErr
      emailStatus = 'sent'
    } catch (e) {
      console.warn('email send failed, queued fallback', e)
      emailStatus = 'queued_fallback'
    }
  }

  await logAudit({
    outcome: 'success',
    ip_hash: ipHash,
    user_agent: userAgent,
    pledge_id: inserted.id,
    transaction_id: inserted.transaction_id,
    email_status: emailStatus,
  })

  return new Response(JSON.stringify({
    ok: true,
    transaction_id: inserted.transaction_id,
    email_status: emailStatus,
  }), { status: 200, headers: jsonHeaders })
})