import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

// Validation stricte des variables d'environnement côté serveur
function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co" || supabaseUrl === "https://example.com") {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing or not configured. " +
      "Please set it in your environment variables (Vercel: Settings > Environment Variables, Local: .env.local)"
    );
  }

  if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key-here" || supabaseAnonKey === "placeholder") {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or not configured. " +
      "Please set it in your environment variables (Vercel: Settings > Environment Variables, Local: .env.local)"
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export async function createClient() {
  const cookieStore = await cookies();
  const { supabaseUrl, supabaseAnonKey } = getEnvVars();

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

