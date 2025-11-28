"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const router = useRouter();
  const { user, profile, isLoading, setUser, setProfile, setLoading, signOut } =
    useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    setProfile(data);
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("SignIn error:", error);
      throw error;
    }
    
    if (data.user) {
      setUser(data.user);
      // Attendre un peu pour que la session soit synchronisée
      await new Promise((resolve) => setTimeout(resolve, 300));
      await fetchProfile(data.user.id);
    }
    
    return data;
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      console.error("SignUp error:", error);
      throw error;
    }

    // Vérifier que le profil a été créé
    if (data.user) {
      // Attendre un peu pour que le trigger s'exécute
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        // PGRST116 = no rows returned, ce qui est normal si le trigger n'a pas encore tourné
        console.error("Profile fetch error:", profileError);
        // Ne pas throw ici car l'utilisateur a été créé, juste le profil manque
      } else if (profile) {
        setProfile(profile);
      }
    }

    return data;
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return data;
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return data;
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    signOut();
    router.push("/login");
  };

  return {
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut: handleSignOut,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user,
    isOwner: profile?.role === "owner",
    isManager: profile?.role === "manager" || profile?.role === "owner",
  };
}

