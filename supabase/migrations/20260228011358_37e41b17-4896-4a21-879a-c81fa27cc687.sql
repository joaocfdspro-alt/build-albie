ALTER TABLE public.quiz_leads ADD COLUMN archived_at TIMESTAMPTZ DEFAULT NULL;

-- Allow admins to update quiz_leads (for archiving)
CREATE POLICY "Admins can update quiz_leads" ON public.quiz_leads FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete quiz_leads
CREATE POLICY "Admins can delete quiz_leads" ON public.quiz_leads FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));