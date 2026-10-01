import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, ...extra, "Content-Type": "application/json" },
  });

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured." }, 500);

    const { url, text } = (await req.json()) as { url?: string; text?: string };
    let content = (text ?? "").trim();
    if (!content && url) {
      let parsed: URL;
      try {
        parsed = new URL(url);
        if (!/^https?:$/.test(parsed.protocol)) throw new Error();
      } catch {
        return json({ error: "Please provide a valid http(s) URL." }, 400);
      }
      const page = await fetch(parsed.toString(), {
        headers: { "User-Agent": "Mozilla/5.0 (VOTE Party Summarizer)" },
      }).catch(() => null);
      if (!page || !page.ok) return json({ error: "Could not fetch that URL. Try pasting the text instead." }, 422);
      content = htmlToText(await page.text());
    }
    if (content.length < 40) return json({ error: "Please provide more article content to summarize." }, 400);
    content = content.slice(0, 30000);

    let runId = req.headers.get("X-Lovable-AIG-Run-ID")?.trim() || undefined;
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: async (input, init) => {
        const headers = new Headers(init?.headers);
        if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
        const res = await fetch(input, { ...init, headers });
        runId ??= res.headers.get("X-Lovable-AIG-Run-ID")?.trim() || undefined;
        return res;
      },
    });

    let upstreamError: unknown;
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      abortSignal: req.signal,
      system:
        'You summarize articles. Respond ONLY with JSON of the form {"summary": string, "takeaways": string[]} — summary is a concise 2-sentence executive summary; takeaways has 3-5 short bullet points. Keep the whole answer under 200 words.',
      prompt: `Analyze the following article text/content and provide: 1. A concise 2-sentence executive summary. 2. 3-5 key takeaways as bullet points.\n\n---\n${content}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
      onError: ({ error }) => {
        upstreamError = error;
      },
    });

    let out = "";
    for await (const chunk of result.textStream) out += chunk;
    const runHeaders: Record<string, string> = runId ? { "X-Lovable-AIG-Run-ID": runId } : {};

    if (upstreamError || !out.trim()) {
      const status = (upstreamError as { statusCode?: number })?.statusCode ?? 502;
      const msg =
        status === 402
          ? "AI credits are exhausted. Please add credits to continue."
          : status === 429
            ? "Too many requests — please wait a moment and try again."
            : "The AI could not summarize this article.";
      console.error("summarize error", upstreamError);
      return json({ error: msg }, status, runHeaders);
    }

    const match = out.match(/\{[\s\S]*\}/);
    let parsedOut: { summary: string; takeaways: string[] };
    try {
      parsedOut = JSON.parse(match ? match[0] : out);
    } catch {
      parsedOut = { summary: out.trim(), takeaways: [] };
    }
    return json(parsedOut, 200, runHeaders);
  } catch (e) {
    if (req.signal.aborted) return json({ error: "Cancelled" }, 499);
    console.error(e);
    return json({ error: "Unexpected error while summarizing." }, 500);
  }
});
