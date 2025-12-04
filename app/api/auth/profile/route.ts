import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user profile using server-side client (bypasses RLS recursion)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, organization_id, id, email, first_name, last_name')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      
      // If profile doesn't exist, return null
      if (profileError.code === 'PGRST116' || profileError.message?.includes('No rows')) {
        return NextResponse.json({ profile: null });
      }
      
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Unexpected error in profile route:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

