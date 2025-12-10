import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

// Validation des variables d'environnement (runtime seulement, pas au build)
function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Support des nouvelles clés publishable et des anciennes clés anon
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Ne pas throw au build time (durant la génération statique)
  // Vérifier seulement au runtime (côté client)
  if (typeof window === "undefined") {
    // Côté serveur/build - retourner des valeurs par défaut si manquantes
    return {
      supabaseUrl: supabaseUrl || "https://placeholder.supabase.co",
      supabaseAnonKey: supabaseAnonKey || "placeholder-key",
    };
  }

  // Côté client - logger l'erreur en mode développement seulement, ne pas throw pour permettre le rendu
  if (process.env.NODE_ENV === 'development') {
    if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co" || supabaseUrl === "https://placeholder.supabase.co") {
      console.warn("[Supabase Client] NEXT_PUBLIC_SUPABASE_URL is not configured. This is OK for landing page, but required for authentication features.");
    }

    // Vérifier si la clé est valide (publishable commence par sb_, anon par eyJ)
    const isValidKey = supabaseAnonKey && 
                       supabaseAnonKey !== "your-anon-key-here" && 
                       supabaseAnonKey !== "placeholder-key" &&
                       (supabaseAnonKey.startsWith('sb_') || supabaseAnonKey.startsWith('eyJ'));
    
    if (!isValidKey) {
      console.warn("[Supabase Client] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured. This is OK for landing page, but required for authentication features.");
    }
  }

  return { 
    supabaseUrl: supabaseUrl || "https://placeholder.supabase.co", 
    supabaseAnonKey: supabaseAnonKey || "placeholder-key" 
  };
}

export const createClient = () => {
  try {
    const { supabaseUrl, supabaseAnonKey } = getEnvVars();
    
    // Validation au runtime seulement - ne pas throw pour permettre le rendu de la page
    if (typeof window !== "undefined") {
      // Si on est sur la landing page, retourner un client placeholder silencieusement
      if (window.location.pathname === '/' || window.location.pathname === '') {
        return createBrowserClient<Database>(
          supabaseUrl || "https://placeholder.supabase.co",
          supabaseAnonKey || "placeholder-key"
        );
      }
      
      if (!supabaseUrl || supabaseUrl === "https://placeholder.supabase.co" || supabaseUrl === "https://your-project.supabase.co") {
        if (process.env.NODE_ENV === 'development') {
          console.warn("[Supabase] NEXT_PUBLIC_SUPABASE_URL is not configured. Using placeholder.");
        }
        // Retourner un client avec valeurs placeholder pour éviter de casser le rendu
        return createBrowserClient<Database>(
          "https://placeholder.supabase.co",
          "placeholder-key"
        );
      }
      // Vérifier si la clé est valide (publishable commence par sb_, anon par eyJ)
      const isValidKey = supabaseAnonKey && 
                         supabaseAnonKey !== "placeholder-key" && 
                         supabaseAnonKey !== "your-anon-key-here" &&
                         (supabaseAnonKey.startsWith('sb_') || supabaseAnonKey.startsWith('eyJ'));
      
      if (!isValidKey) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("[Supabase] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured. Using placeholder.");
        }
        // Retourner un client avec valeurs placeholder pour éviter de casser le rendu
        return createBrowserClient<Database>(
          supabaseUrl || "https://placeholder.supabase.co",
          "placeholder-key"
        );
      }
    }
    
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("[Supabase] Error creating client:", error);
    // Retourner un client placeholder pour éviter de casser le rendu
    return createBrowserClient<Database>(
      "https://placeholder.supabase.co",
      "placeholder-key"
    );
  }
};

// Lazy initialization pour éviter les erreurs au build
let _client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const supabaseClient = (() => {
  if (typeof window === "undefined") {
    // Côté serveur - créer un client placeholder qui ne sera pas utilisé
    const { supabaseUrl, supabaseAnonKey } = getEnvVars();
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  if (!_client) {
    _client = createClient();
  }
  return _client;
})();
