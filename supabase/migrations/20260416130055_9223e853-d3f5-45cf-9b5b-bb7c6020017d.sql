
CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile_number text UNIQUE,
  province text,
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  is_verified boolean DEFAULT false
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert members" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read member count" ON public.members FOR SELECT USING (true);
