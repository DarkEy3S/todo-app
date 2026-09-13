import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const AuthCtx = createContext<{ session: Session | null; ready: boolean }>({ session: null, ready: false });

export const useSession = () => useContext(AuthCtx).session;
export const useAuthReady = () => useContext(AuthCtx).ready;

export const initials = (user: User | undefined) => {
  const name = user?.user_metadata?.full_name?.trim() as string | undefined;
  if (name) return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return user?.email?.slice(0, 2).toUpperCase() ?? "NA";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, next) => {
      setSession(next);
      setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthCtx.Provider value={{ session, ready }}>{children}</AuthCtx.Provider>;
};
