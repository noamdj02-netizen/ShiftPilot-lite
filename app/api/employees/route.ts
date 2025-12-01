import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's profile to find their organization_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ employees: [] });
    }

    const organizationId = (profile as { organization_id: string | null }).organization_id;
    if (!organizationId) {
      return NextResponse.json({ employees: [] });
    }

    // Fetch employees for this organization
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("role", "employee")
      .order("first_name", { ascending: true });

    if (error) {
      console.error("Error fetching employees:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Get user's organization_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "No organization found for this user" },
        { status: 400 }
      );
    }

    const organizationId = (profile as { organization_id: string | null }).organization_id;
    if (!organizationId) {
      return NextResponse.json(
        { error: "No organization found for this user" },
        { status: 400 }
      );
    }

    // Note: Creating a profile requires an auth user first
    // This endpoint should use Supabase Admin API or invitation flow
    // For now, return an error indicating this needs admin privileges
    return NextResponse.json(
      { error: "Employee creation requires admin privileges. Use invitation flow." },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
