
-- Remove public SELECT policies that expose PII
DROP POLICY IF EXISTS "Anyone can read member count" ON public.members;
DROP POLICY IF EXISTS "Anyone can read pledge count" ON public.pledges;
DROP POLICY IF EXISTS "Anyone can read donation totals" ON public.donations;
DROP POLICY IF EXISTS "Anyone can read signature count" ON public.deed_of_foundation_signatures;

-- Revoke direct SELECT from anon/authenticated on PII-bearing tables
REVOKE SELECT ON public.members FROM anon, authenticated;
REVOKE SELECT ON public.pledges FROM anon, authenticated;
REVOKE SELECT ON public.donations FROM anon, authenticated;
REVOKE SELECT ON public.deed_of_foundation_signatures FROM anon, authenticated;
REVOKE SELECT ON public.contact_submissions FROM anon, authenticated;
REVOKE SELECT ON public.interview_bookings FROM anon, authenticated;

-- Drop pledges from realtime publication so row payloads don't leak PII
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'pledges'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.pledges';
  END IF;
END $$;

-- Tighten INSERT policies (remove always-true WITH CHECK)
DROP POLICY IF EXISTS "Anyone can insert members" ON public.members;
CREATE POLICY "Anyone can insert members" ON public.members
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (province IS NULL OR char_length(province) <= 50)
    AND (mobile_number IS NULL OR char_length(mobile_number) <= 20)
    AND is_verified = false
  );

DROP POLICY IF EXISTS "Anyone can submit a pledge" ON public.pledges;
CREATE POLICY "Anyone can submit a pledge" ON public.pledges
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 100
    AND contact_method IN ('email','mobile')
    AND char_length(province) BETWEEN 2 AND 50
    AND (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
    AND (mobile IS NULL OR char_length(mobile) BETWEEN 6 AND 20)
    AND (national_id IS NULL OR national_id ~ '^\d{13}$')
  );

DROP POLICY IF EXISTS "Anyone can pledge a donation" ON public.donations;
CREATE POLICY "Anyone can pledge a donation" ON public.donations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND amount > 0 AND amount <= 10000000
    AND purpose IN ('registration_fee','gazette','startavotingparty','general')
    AND (message IS NULL OR char_length(message) <= 1000)
  );

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 5 AND 2000
    AND (subject IS NULL OR char_length(subject) <= 200)
  );

DROP POLICY IF EXISTS "Anyone can request a booking" ON public.interview_bookings;
CREATE POLICY "Anyone can request a booking" ON public.interview_bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (organization IS NULL OR char_length(organization) <= 200)
    AND (topic IS NULL OR char_length(topic) <= 200)
    AND (message IS NULL OR char_length(message) <= 2000)
  );

DROP POLICY IF EXISTS "Anyone can sign the deed" ON public.deed_of_foundation_signatures;
CREATE POLICY "Anyone can sign the deed" ON public.deed_of_foundation_signatures
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    digital_consent = true
    AND char_length(trim(full_name)) BETWEEN 2 AND 100
    AND char_length(province) BETWEEN 2 AND 50
    AND char_length(id_number_hash) BETWEEN 32 AND 128
    AND (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  );

-- Aggregate-only RPCs so public UI still shows counts/totals without exposing rows
CREATE OR REPLACE FUNCTION public.get_member_count()
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*)::bigint FROM public.members $$;

CREATE OR REPLACE FUNCTION public.get_pledge_count()
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*)::bigint FROM public.pledges $$;

CREATE OR REPLACE FUNCTION public.get_signature_count()
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*)::bigint FROM public.deed_of_foundation_signatures $$;

CREATE OR REPLACE FUNCTION public.get_donation_totals()
RETURNS TABLE(total_count bigint, total_amount numeric)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*)::bigint, COALESCE(sum(amount), 0)::numeric FROM public.donations $$;

GRANT EXECUTE ON FUNCTION public.get_member_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_pledge_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_signature_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_donation_totals() TO anon, authenticated;
