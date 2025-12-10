import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Update session (handle auth token refresh) - this also gets the user
  const { response, user } = await updateSession(request);

  // 2. Route protection logic (simplified for performance)
  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname.startsWith('/login');
  const isOnboardingRoute = pathname.startsWith('/onboarding');
  const isPortalRoute = pathname === '/portal';
  const isAuthRoute = pathname.startsWith('/register') || 
                      pathname.startsWith('/forgot-password') || 
                      pathname.startsWith('/reset-password');

  // User is authenticated
  if (user) {
    // Redirect authenticated users away from login page to dashboard
    if (isLoginRoute) {
      return NextResponse.redirect(new URL('/dashboard/employer', request.url));
    }
    
    // Portal route is allowed for authenticated users (it handles routing internally)
    if (isPortalRoute) {
      return response;
    }
    
    // Onboarding routes are no longer used - redirect to dashboard
    if (isOnboardingRoute) {
      return NextResponse.redirect(new URL('/dashboard/employer', request.url));
    }
  } else {
    // User is NOT authenticated - protect routes
    if (isDashboardRoute || isOnboardingRoute) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
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
