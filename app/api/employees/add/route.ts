import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get Employer Org ID
    const { data: profile, error: profileError } = await supabase.from('profiles').select('organization_id').eq('id', user.id).single();
    if (profileError || !profile) return NextResponse.json({ error: "No organization found" }, { status: 403 });
    
    const organizationId = (profile as { organization_id: string | null }).organization_id;
    if (!organizationId) return NextResponse.json({ error: "No organization found" }, { status: 403 });

    const body = await request.json();

    // Create auth user for employee (optional: usually sent via invitation, but here we might create placeholder)
    // For this demo, we just create the profile directly if we can (needs auth user first usually), 
    // or we assume we are creating a 'placeholder' profile without login initially.
    // Supabase profiles references auth.users. So we MUST create an auth user or separate 'employees' table from profiles.
    // Since 'profiles' references auth.users, we cannot insert into profiles without an auth user ID.
    // WORKAROUND: Use a separate 'employees' table OR create a dummy auth user via Admin API (not available here easily without service role key).
    // ALTERNATIVE: Just return "Invited" status.
    
    // Let's assume we are using Supabase Invite logic usually.
    // For this specific request "add employee", we will assume we are creating an invite.
    
    // However, to make the dashboard functional visually without email flow:
    // We might need to use Service Role to create a user.
    // But I don't have service role key in context.
    
    // Let's check if there is an 'employees' table separate? No.
    
    // Valid Approach: Create an invitation link (standard Supabase).
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(body.email, {
        data: {
            first_name: body.firstName,
            last_name: body.lastName,
            role: 'employee',
            organization_id: organizationId
        }
    });
    
    // NOTE: admin.inviteUserByEmail requires SERVICE_ROLE_KEY. standard client can't do it.
    // If we are just using the standard client, we can't create users directly.
    
    return NextResponse.json({ 
        error: "API de création d'employé nécessite les droits d'admin (Service Role). En démo, utilisez l'insertion manuelle en base ou simulez." 
    }, { status: 501 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

