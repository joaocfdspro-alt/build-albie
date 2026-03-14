
ALTER TABLE public.quiz_leads
ADD COLUMN IF NOT EXISTS open_response text DEFAULT '',
ADD COLUMN IF NOT EXISTS ai_diagnostic jsonb DEFAULT null;

CREATE TABLE IF NOT EXISTS public.codigo_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country_code text NOT NULL DEFAULT '+55',
  source text DEFAULT 'codigo-da-negociacao'
);

ALTER TABLE public.codigo_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert codigo_leads" ON public.codigo_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can read codigo_leads" ON public.codigo_leads
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
