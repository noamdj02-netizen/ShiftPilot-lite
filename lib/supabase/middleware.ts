import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Validation stricte des variables d'environnement pour middleware
function getMiddlewareEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // En middleware, on permet des valeurs par défaut pour éviter de casser le build,
  // mais on log un warning
  if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co" || supabaseUrl === "https://example.com") {
    console.error(
      "[Middleware Error] NEXT_PUBLIC_SUPABASE_URL is missing or not configured. " +
      "Middleware will not function correctly. Please configure environment variables."
    );
  }

  if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key-here" || supabaseAnonKey === "placeholder") {
    console.error(
      "[Middleware Error] NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or not configured. " +
      "Middleware will not function correctly. Please configure environment variables."
    );
  }

  // Utiliser des valeurs par défaut pour éviter de casser complètement le middleware
  // mais cela empêchera l'authentification de fonctionner
  return {
    supabaseUrl: supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey: supabaseAnonKey || "placeholder-key",
  };
}

export async function updateSession(request: NextRequest): Promise<{
  response: NextResponse;
  user: any | null;
}> {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const { supabaseUrl, supabaseAnonKey } = getMiddlewareEnvVars();

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get user (with error handling to avoid breaking middleware)
  let user = null;
  try {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser();
    
    if (error) {
      // Silently fail - user is not authenticated
      user = null;
    } else {
      user = supabaseUser;
    }
  } catch (error) {
    // Silently fail - user is not authenticated
    // This prevents middleware from crashing on auth errors
    user = null;
  }

  return { response: supabaseResponse, user };
}
