import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

// Validation des variables d'environnement côté serveur
function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Support des nouvelles clés publishable et des anciennes clés anon
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si les variables sont des placeholders, retourner des valeurs par défaut
  // Cela permettra au code de fonctionner mais les requêtes échoueront avec des erreurs claires
  if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co" || supabaseUrl === "https://example.com" || supabaseUrl === "https://placeholder.supabase.co") {
    console.warn("[Supabase Server] NEXT_PUBLIC_SUPABASE_URL is not configured. Using placeholder. API calls will fail.");
    return {
      supabaseUrl: "https://placeholder.supabase.co",
      supabaseAnonKey: "placeholder-key"
    };
  }

  // Vérifier si la clé est valide (publishable commence par sb_, anon par eyJ)
  const isValidKey = supabaseAnonKey && 
                     supabaseAnonKey !== "your-anon-key-here" && 
                     supabaseAnonKey !== "placeholder" && 
                     supabaseAnonKey !== "placeholder-key" &&
                     (supabaseAnonKey.startsWith('sb_') || supabaseAnonKey.startsWith('eyJ'));
  
  if (!isValidKey) {
    console.warn("[Supabase Server] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured. Using placeholder. API calls will fail.");
    return {
      supabaseUrl: supabaseUrl || "https://placeholder.supabase.co",
      supabaseAnonKey: "placeholder-key"
    };
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

