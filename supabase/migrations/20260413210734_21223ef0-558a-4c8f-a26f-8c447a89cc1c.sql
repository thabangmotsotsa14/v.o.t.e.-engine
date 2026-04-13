
-- Create pledges/members table
CREATE TABLE public.pledges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('email', 'mobile')),
  email TEXT,
  mobile TEXT,
  national_id TEXT,
  province TEXT NOT NULL,
  transaction_id TEXT NOT NULL DEFAULT ('VOTE-' || upper(substr(md5(random()::text), 1, 8))),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Prevent duplicate name registrations
  CONSTRAINT unique_full_name UNIQUE (full_name),
  -- Prevent duplicate mobile registrations
  CONSTRAINT unique_mobile UNIQUE (mobile),
  -- Prevent duplicate email registrations
  CONSTRAINT unique_email UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can submit a pledge"
  ON public.pledges FOR INSERT
  WITH CHECK (true);

-- Allow public read for counter
CREATE POLICY "Anyone can read pledge count"
  ON public.pledges FOR SELECT
  USING (true);
