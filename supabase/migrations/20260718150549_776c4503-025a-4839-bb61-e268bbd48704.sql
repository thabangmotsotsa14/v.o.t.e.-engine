
CREATE TABLE public.pledge_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  outcome text NOT NULL,
  reason text,
  ip_hash text,
  user_agent text,
  pledge_id uuid,
  transaction_id text,
  email_status text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.pledge_audit_log TO service_role;
ALTER TABLE public.pledge_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to pledge_audit_log"
  ON public.pledge_audit_log FOR SELECT
  USING (false);

CREATE TABLE public.pledge_rate_limit (
  ip_hash text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.pledge_rate_limit TO service_role;
ALTER TABLE public.pledge_rate_limit ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to pledge_rate_limit"
  ON public.pledge_rate_limit FOR SELECT
  USING (false);
