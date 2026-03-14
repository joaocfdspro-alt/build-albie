
-- Enable pg_net extension for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create trigger to notify on new quiz leads
CREATE OR REPLACE TRIGGER on_new_quiz_lead
  AFTER INSERT ON public.quiz_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();
