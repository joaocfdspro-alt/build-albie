
-- Enable realtime for quiz_leads
ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_leads;

-- Create webhook trigger to call edge function on new lead
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  edge_url TEXT;
BEGIN
  edge_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/notify-new-lead';

  -- Use pg_net to call edge function async
  PERFORM net.http_post(
    url := edge_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't block inserts if notification fails
    RAISE WARNING 'notify_new_lead failed: %', SQLERRM;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_quiz_lead
  AFTER INSERT ON public.quiz_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead();
