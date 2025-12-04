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
    // Redirect authenticated users away from auth pages to portal for smart routing
    if (isLoginRoute) {
      return NextResponse.redirect(new URL('/portal', request.url));
    }
    
    // Portal route is allowed for authenticated users (it handles routing internally)
    if (isPortalRoute) {
      return response;
    }
    
    // Redirect authenticated users away from onboarding if they already completed it
    // Note: We don't check DB here for performance - let the page handle the check
    // This avoids DB queries on every request in middleware
    if (isOnboardingRoute && pathname === '/onboarding/employer') {
      // Let the onboarding page check if org exists and redirect if needed
      // This is more performant than checking DB in middleware
      return response;
    }
  } else {
    // User is NOT authenticated - protect routes
    if (isDashboardRoute || isOnboardingRoute) {
      const redirectUrl = new URL('/login/employer', request.url);
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
