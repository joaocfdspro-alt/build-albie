-- Allow anonymous users to read back their own inserted quiz lead row
-- This fixes the 401 error when the quiz insert uses .select().single()
CREATE POLICY "Anon can select just-inserted quiz leads"
ON public.quiz_leads
FOR SELECT
TO anon
USING (true);