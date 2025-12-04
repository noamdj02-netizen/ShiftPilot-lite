import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export async function GET() {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifier que l'utilisateur a une organisation
    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError) {
      // Si pas d'organisation, retourner une liste vide (pas une erreur)
      return NextResponse.json({ employees: [] });
    }

    if (!organization_id) {
      return NextResponse.json({ employees: [] });
    }

    // Récupérer les employés de l'organisation
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("organization_id", organization_id)
      .eq("role", "employee")
      .order("first_name", { ascending: true });

    if (error) {
      console.error("[GET /api/employees] Error fetching employees:", error);
      return createErrorResponse(
        "Failed to fetch employees",
        500,
        "FETCH_ERROR",
        { details: error.message }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[GET /api/employees] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
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
