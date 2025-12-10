import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const userType = requestUrl.searchParams.get("user_type") || "employer";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      // Redirect to login with error
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
      );
    }

    // Get the user after successful authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if user has a profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // If no profile exists, redirect to dashboard
      if (!profile) {
        return NextResponse.redirect(
          new URL("/dashboard/employer", request.url)
        );
      }

      // Redirect based on user type or profile role
      if (userType === "employee" || profile.role === "employee") {
        return NextResponse.redirect(new URL("/dashboard/employee", request.url));
      }

      // Default redirect to employer dashboard
      return NextResponse.redirect(new URL("/dashboard/employer", request.url));
    }
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

