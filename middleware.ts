import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // 1. Update session (handle auth token refresh)
  const response = await updateSession(request);

  // 2. Custom Logic for Employer Redirection
  // We need to create a lightweight client just to read the user/profile role & org
  // Note: updateSession already handles the response cookie setup, but we might need to check DB.
  // Doing DB checks in middleware can be slow, but it's requested for the "systematic redirect".
  // Best practice: Check auth cookie, if present, check routes.
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response.cookies.set(
            cookiesToSet[0].name,
            cookiesToSet[0].value,
            cookiesToSet[0].options,
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Define protected routes
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');
  const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding');

  if (user) {
    // If user is logged in and tries to access login page, redirect to dashboard
    if (isLoginRoute) {
      return NextResponse.redirect(new URL('/dashboard/employer', request.url));
    }

    // Check profile for role and organization
    // NOTE: Fetching profile on every request might be heavy. 
    // Optimization: Store this in a cookie or metadata? 
    // For now, we strictly follow requirements.
    if (isDashboardRoute || isOnboardingRoute) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, organization_id')
            .eq('id', user.id)
            .single();

        if (profile) {
            const isEmployer = profile.role === 'owner' || profile.role === 'manager' || profile.role === 'employer'; // 'employer' from prompt vs 'owner' from schema
            const hasOrg = !!profile.organization_id;

            // Employer Logic
            if (isEmployer) {
                // If has org and tries to go to onboarding -> Redirect to Dashboard
                if (hasOrg && request.nextUrl.pathname.startsWith('/onboarding/employer')) {
                     return NextResponse.redirect(new URL('/dashboard/employer', request.url));
                }
                // Note: If no org, allow access to dashboard (form will show there)
            }
            
            // Basic Protection: Don't let randoms into /dashboard/employer if they are not employers?
            // Implemented in Page/Layout usually, but added here for safety if needed.
        }
    }
  } else {
    // Not logged in
    if (isDashboardRoute || isOnboardingRoute) {
       return NextResponse.redirect(new URL('/login/employer', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
