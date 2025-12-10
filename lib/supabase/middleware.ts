import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware helper pour gérer la session Supabase dans Edge Runtime
 * Cette fonction est optimisée pour fonctionner dans l'environnement Edge de Next.js
 */
export async function updateSession(request: NextRequest): Promise<{
  response: NextResponse;
  user: any | null;
}> {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Si les variables d'environnement ne sont pas configurées, on retourne une réponse sans authentification
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === "https://your-project.supabase.co" || 
      supabaseAnonKey === "your-anon-key-here") {
    return { response, user: null };
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Tenter de récupérer l'utilisateur
    // On catch les erreurs pour éviter de casser le middleware
    let user = null;
    try {
      const {
        data: { user: supabaseUser },
        error,
      } = await supabase.auth.getUser();
      
      if (!error && supabaseUser) {
        user = supabaseUser;
      }
    } catch (error) {
      // Silently fail - l'utilisateur n'est pas authentifié
      // C'est normal si les cookies sont invalides ou expirés
      user = null;
    }

    return { response, user };
  } catch (error) {
    // En cas d'erreur critique, on retourne une réponse sans authentification
    // Cela permet au site de continuer à fonctionner même si Supabase a un problème
    console.error('[Middleware] Error updating session:', error);
    return { response, user: null };
  }
}
