import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthSession = {
  user?: {
    id: string;
    email?: string;
  } | null;
} | null;

type AuthUser = NonNullable<AuthSession> extends { user?: infer U } ? U : null;

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = supabase.auth as any;

    const { data: { subscription } } = auth.onAuthStateChange(
      async (_event: unknown, nextSession: AuthSession) => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);

        if (nextSession?.user?.id) {
          setTimeout(async () => {
            const { data } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", nextSession.user.id)
              .eq("role", "admin")
              .maybeSingle();
            setIsAdmin(!!data);
            setLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      },
    );

    auth.getSession().then(({ data }: { data: { session: AuthSession } }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (!data.session?.user) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const auth = supabase.auth as any;
    const { error } = await auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    const auth = supabase.auth as any;
    await auth.signOut();
  };

  return { user, session, loading, isAdmin, signIn, signOut };
}
