CREATE TABLE public.immersion_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.immersion_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert into immersion_waitlist"
ON public.immersion_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read immersion_waitlist"
ON public.immersion_waitlist
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));