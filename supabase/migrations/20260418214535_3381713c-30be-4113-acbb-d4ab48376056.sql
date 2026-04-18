-- ============================================
-- HOTSPOT METADATA (IEC search index)
-- ============================================
CREATE TABLE public.hotspot_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text,
  target_url text NOT NULL,
  icon text,
  search_tags text[],
  display_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_hotspot_search ON public.hotspot_metadata USING gin (search_tags);
CREATE INDEX idx_hotspot_category ON public.hotspot_metadata (category);

ALTER TABLE public.hotspot_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hotspot resources"
ON public.hotspot_metadata FOR SELECT
USING (true);

-- ============================================
-- DEED OF FOUNDATION SIGNATURES (Annexure 6)
-- ============================================
CREATE TABLE public.deed_of_foundation_signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  id_number_hash text NOT NULL UNIQUE,
  province text NOT NULL,
  email text,
  digital_consent boolean NOT NULL DEFAULT false,
  transaction_id text NOT NULL DEFAULT ('VOTE-DOF-' || upper(substr(md5(random()::text), 1, 10))),
  signed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.deed_of_foundation_signatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign the deed"
ON public.deed_of_foundation_signatures FOR INSERT
WITH CHECK (digital_consent = true);

CREATE POLICY "Anyone can read signature count"
ON public.deed_of_foundation_signatures FOR SELECT
USING (true);

-- ============================================
-- DONATIONS (IEC legal drive pledges)
-- ============================================
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  purpose text NOT NULL CHECK (purpose IN ('registration_fee','gazette','startavotingparty','general')),
  message text,
  transaction_id text NOT NULL DEFAULT ('VOTE-DON-' || upper(substr(md5(random()::text), 1, 10))),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can pledge a donation"
ON public.donations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read donation totals"
ON public.donations FOR SELECT
USING (true);

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  source text DEFAULT 'contact_form',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- ============================================
-- INTERVIEW BOOKINGS
-- ============================================
CREATE TABLE public.interview_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  organization text,
  topic text,
  preferred_date date,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.interview_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a booking"
ON public.interview_bookings FOR INSERT
WITH CHECK (true);

-- ============================================
-- SEED HOTSPOT METADATA
-- ============================================
INSERT INTO public.hotspot_metadata (category, title, description, target_url, icon, search_tags, display_order) VALUES
-- VOTER CENTER
('voter', 'Register to Vote', 'Register online with the IEC using your South African ID', 'https://registertovote.elections.org.za/', 'UserPlus', ARRAY['register','voter','registration','sign up','enrol'], 1),
('voter', 'Check Voter Status', 'Confirm your registration status and voting district', 'https://www.elections.org.za/pw/Voter/Check-Registration', 'CheckCircle', ARRAY['status','check','verify','confirm','registered'], 2),
('voter', 'Find Your Voting Station', 'Locate your assigned voting station by ID number', 'https://www.elections.org.za/pw/Voter/Voting-Station-Finder', 'MapPin', ARRAY['station','find','location','where','vote'], 3),
('voter', 'Who is My Ward Councillor?', 'Look up your ward and elected councillor', 'https://www.elections.org.za/pw/Voter/My-Ward', 'Users', ARRAY['ward','councillor','representative','local'], 4),
-- ELECTION CENTER
('election', 'Results & Statistics', 'Official IEC results portal for all elections', 'https://results.elections.org.za/', 'BarChart3', ARRAY['results','statistics','outcomes','tally'], 1),
('election', 'Atlas of Results', 'Geographic visualisation of election results', 'https://www.elections.org.za/pw/Elections-And-Results/Atlas-of-Results', 'Map', ARRAY['atlas','map','geographic','visualisation'], 2),
('election', 'Seat Calculation', 'How seats are allocated under proportional representation', 'https://www.elections.org.za/pw/Elections-And-Results/Seat-Calculation', 'Calculator', ARRAY['seats','calculation','allocation','proportional'], 3),
('election', 'Voters'' Roll Statistics', 'National voter registration statistics', 'https://www.elections.org.za/pw/Voter/Voters-Roll-Statistics', 'TrendingUp', ARRAY['roll','statistics','demographics','registered voters'], 4),
-- PARTY CENTER
('party', 'Party Registration Statistics', 'List of all registered political parties in SA', 'https://www.elections.org.za/pw/Parties-And-Candidates/Registered-Parties-Statistics', 'Building', ARRAY['parties','registered','statistics','political'], 1),
('party', 'Political Funding Declarations', 'Public and private funding disclosures', 'https://www.elections.org.za/pw/Parties-And-Candidates/Political-Party-Funding', 'DollarSign', ARRAY['funding','declarations','private','public','donations'], 2),
('party', 'Contesting Elections', 'Candidate nomination requirements and process', 'https://www.elections.org.za/pw/Parties-And-Candidates/Contesting-Elections', 'Award', ARRAY['contest','candidate','nomination','elections'], 3),
('party', 'Register a New Party', 'Annexure 1 requirements and the R5,000 fee', 'https://www.elections.org.za/pw/Parties-And-Candidates/Register-A-Party', 'FileText', ARRAY['register party','annexure','founding','new party'], 4),
-- PROCESS CENTER
('process', 'How Voting Works', 'Step-by-step guide to casting your ballot', 'https://www.elections.org.za/pw/Voter/Voting-Process', 'BookOpen', ARRAY['voting','process','how to','guide','ballot'], 1),
('process', 'Counting & Verification', 'How votes are counted and audited', 'https://www.elections.org.za/pw/Elections-And-Results/Counting', 'CheckSquare', ARRAY['counting','verification','audit','tally'], 2),
('process', 'Objections & Disputes', 'Lodge an objection or electoral complaint', 'https://www.elections.org.za/pw/About-Us/Electoral-Court', 'Scale', ARRAY['objections','disputes','complaints','court'], 3),
('process', 'Observers & Party Agents', 'Become an accredited election observer', 'https://www.elections.org.za/pw/Elections-And-Results/Observers-Status', 'Eye', ARRAY['observer','agent','accreditation','monitor'], 4);