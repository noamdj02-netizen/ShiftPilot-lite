import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

// Validation stricte des variables d'environnement
function validateEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co") {
    const error = "NEXT_PUBLIC_SUPABASE_URL is missing or not configured. Please set it in your .env.local file.";
    if (typeof window !== "undefined") {
      console.error("[Supabase Client Error]", error);
    } else {
      throw new Error(error);
    }
  }

  if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key-here") {
    const error = "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or not configured. Please set it in your .env.local file.";
    if (typeof window !== "undefined") {
      console.error("[Supabase Client Error]", error);
    } else {
      throw new Error(error);
    }
  }

  return { supabaseUrl, supabaseAnonKey };
}

const { supabaseUrl, supabaseAnonKey } = validateEnvVars();

export const createClient = () => {
  // Double vérification au moment de la création
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not properly configured.");
  }
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};

export const supabaseClient = createClient();
