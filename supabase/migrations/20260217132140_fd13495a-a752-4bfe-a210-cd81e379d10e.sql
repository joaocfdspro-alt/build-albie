
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT '+55',
  total_score INTEGER NOT NULL,
  diagnostic_title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public quiz, no auth required)
CREATE POLICY "Anyone can submit quiz leads"
  ON public.quiz_leads
  FOR INSERT
  WITH CHECK (true);

-- No select/update/delete for anon users
CREATE POLICY "No public read access"
  ON public.quiz_leads
  FOR SELECT
  USING (false);
