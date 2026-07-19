
-- Grant privileges required for the Data API to reach public tables.
-- RLS policies already exist and are strict; these GRANTs are what was missing.

GRANT SELECT ON public.hotspot_metadata TO anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT INSERT ON public.deed_of_foundation_signatures TO anon, authenticated;
GRANT INSERT ON public.donations TO anon, authenticated;
GRANT INSERT ON public.interview_bookings TO anon, authenticated;
GRANT INSERT ON public.members TO anon, authenticated;
GRANT INSERT ON public.pledges TO anon, authenticated;

GRANT ALL ON public.contact_submissions TO service_role;
GRANT ALL ON public.deed_of_foundation_signatures TO service_role;
GRANT ALL ON public.donations TO service_role;
GRANT ALL ON public.interview_bookings TO service_role;
GRANT ALL ON public.members TO service_role;
GRANT ALL ON public.pledges TO service_role;
GRANT ALL ON public.hotspot_metadata TO service_role;
GRANT ALL ON public.pledge_audit_log TO service_role;
GRANT ALL ON public.pledge_rate_limit TO service_role;

-- Secure RPC to sign the deed and return transaction_id without granting SELECT on PII.
CREATE OR REPLACE FUNCTION public.submit_deed_signature(
  p_full_name text,
  p_id_number_hash text,
  p_province text,
  p_email text DEFAULT NULL,
  p_digital_consent boolean DEFAULT false
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_txn text;
BEGIN
  IF p_digital_consent IS NOT TRUE THEN
    RAISE EXCEPTION 'Digital consent required';
  END IF;
  IF char_length(btrim(p_full_name)) < 2 OR char_length(btrim(p_full_name)) > 100 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF char_length(p_id_number_hash) < 32 OR char_length(p_id_number_hash) > 128 THEN
    RAISE EXCEPTION 'Invalid identity hash';
  END IF;
  IF char_length(p_province) < 2 OR char_length(p_province) > 50 THEN
    RAISE EXCEPTION 'Invalid province';
  END IF;
  IF p_email IS NOT NULL AND p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;

  INSERT INTO public.deed_of_foundation_signatures
    (full_name, id_number_hash, province, email, digital_consent)
  VALUES
    (btrim(p_full_name), p_id_number_hash, p_province, NULLIF(p_email,''), true)
  RETURNING transaction_id INTO v_txn;

  RETURN v_txn;
END;
$$;

-- Secure RPC for donation pledges returning transaction_id.
CREATE OR REPLACE FUNCTION public.submit_donation(
  p_full_name text,
  p_email text,
  p_amount numeric,
  p_purpose text,
  p_message text DEFAULT NULL
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_txn text;
BEGIN
  IF char_length(btrim(p_full_name)) < 2 OR char_length(btrim(p_full_name)) > 100 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF p_amount <= 0 OR p_amount > 10000000 THEN
    RAISE EXCEPTION 'Invalid amount';
  END IF;
  IF p_purpose NOT IN ('registration_fee','gazette','startavotingparty','general') THEN
    RAISE EXCEPTION 'Invalid purpose';
  END IF;

  INSERT INTO public.donations (full_name, email, amount, purpose, message)
  VALUES (btrim(p_full_name), p_email, p_amount, p_purpose, NULLIF(p_message,''))
  RETURNING transaction_id INTO v_txn;

  RETURN v_txn;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_deed_signature(text,text,text,text,boolean) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_donation(text,text,numeric,text,text) TO anon, authenticated;
