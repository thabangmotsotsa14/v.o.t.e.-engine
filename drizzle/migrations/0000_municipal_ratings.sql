CREATE TABLE IF NOT EXISTS public.municipal_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  municipality_id TEXT NOT NULL CHECK (char_length(municipality_id) BETWEEN 1 AND 50),
  municipality_name TEXT NOT NULL CHECK (char_length(municipality_name) BETWEEN 1 AND 120),
  water_rating INT CHECK (water_rating BETWEEN 1 AND 5),
  electricity_rating INT CHECK (electricity_rating BETWEEN 1 AND 5),
  refuse_rating INT CHECK (refuse_rating BETWEEN 1 AND 5),
  roads_rating INT CHECK (roads_rating BETWEEN 1 AND 5),
  comment TEXT CHECK (comment IS NULL OR char_length(comment) <= 1000),
  upvotes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.municipal_ratings TO anon, authenticated;
GRANT ALL ON public.municipal_ratings TO service_role;
ALTER TABLE public.municipal_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read ratings" ON public.municipal_ratings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can submit ratings" ON public.municipal_ratings FOR INSERT TO anon, authenticated
  WITH CHECK (upvotes = 0 AND coalesce(water_rating, electricity_rating, refuse_rating, roads_rating) IS NOT NULL);

CREATE OR REPLACE FUNCTION public.upvote_municipal_rating(_id uuid)
RETURNS integer LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.municipal_ratings SET upvotes = upvotes + 1 WHERE id = _id RETURNING upvotes;
$$;
GRANT EXECUTE ON FUNCTION public.upvote_municipal_rating(uuid) TO anon, authenticated;