"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";

interface GoogleLoginButtonProps {
  userType?: 'employer' | 'employee'
}

export function GoogleLoginButton({ userType = 'employer' }: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // Optionnel : passer le type d'utilisateur dans l'URL
            ...(userType && { user_type: userType }),
          },
        },
      });

      if (error) {
        console.error("Google login error:", error);
        setIsLoading(false);
      }
      // Note: L'utilisateur sera redirigé vers Google, donc on ne reset pas isLoading ici
    } catch (err) {
      console.error("Unexpected error during Google login:", err);
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={loginWithGoogle}
      disabled={isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 py-3 px-4 hover:bg-slate-50 dark:hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-900 dark:text-white"
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 48 48" className="flex-shrink-0">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.4 15.3 18.8 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.3 29.6 4 24 4 16.1 4 9.3 8.5 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10.2-2 13.9-5.7l-6.4-5.6C29.5 34.9 26.9 36 24 36c-5.3 0-9.7-3.7-11.3-8.7L6.2 32.2C9.1 38.4 16 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.9 2.6-2.7 4.8-5.1 6.3l-.1.1 6.4 5.6C39.7 36.9 44 31.1 44 24c0-1.3-.1-2.5-.4-3.5z"
            />
          </svg>
          Continuer avec Google
        </>
      )}
    </motion.button>
  );
}

