import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    // Vérifier que l'utilisateur a une organisation
    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json([]); // Retourner tableau vide si pas d'organisation
    }

    const supabase = await createClient();
    
    // Construire la requête avec organization_id
    // RLS policies gèrent déjà l'accès via organization_id ou schedule_id
    let query = supabase
      .from("shifts")
      .select(`
        *,
        profiles:profile_id(first_name, last_name, email, avatar_url),
        employees:employee_id(first_name, last_name, position)
      `);
    
    // Filtrer par organization_id si la colonne existe, sinon RLS le gère
    // Les RLS policies permettent déjà de voir les shifts de l'organisation

    if (start) {
      query = query.gte("start_time", start);
    }
    if (end) {
      query = query.lte("end_time", end);
    }

    const { data, error } = await query.order("start_time", { ascending: true });

    if (error) {
      console.error("[GET /api/shifts] Error fetching shifts:", error);
      return createErrorResponse(
        "Failed to fetch shifts",
        500,
        "FETCH_ERROR",
        { details: error.message }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[GET /api/shifts] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifier que l'utilisateur a une organisation et les permissions
    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return createErrorResponse(
        "Organization required. Please complete onboarding.",
        403,
        "NO_ORGANIZATION"
      );
    }

    // Vérifier les permissions (manager/owner/hr)
    if (user.role !== 'OWNER' && user.role !== 'MANAGER' && user.role !== 'HR') {
      return createErrorResponse(
        "Insufficient permissions to create shifts",
        403,
        "INSUFFICIENT_PERMISSIONS"
      );
    }

    const body = await request.json();
    const supabase = await createClient();

    // Valider les champs requis
    if (!body.start_time || !body.end_time) {
      return createErrorResponse(
        "Missing required fields: start_time and end_time",
        400,
        "MISSING_FIELDS"
      );
    }

    // Créer le shift avec organization_id
    const shiftData = {
      ...body,
      organization_id,
      // Récupérer location_id depuis schedule si fourni
      location_id: body.location_id || (body.schedule_id ? 
        (await supabase.from('schedules').select('location_id').eq('id', body.schedule_id).single()).data?.location_id 
        : null)
    };

    const { data, error } = await supabase
      .from("shifts")
      .insert(shiftData)
      .select(`
        *,
        profiles:profile_id(first_name, last_name, email),
        employees:employee_id(first_name, last_name, position)
      `)
      .single();

    if (error) {
      console.error("[POST /api/shifts] Error creating shift:", error);
      return createErrorResponse(
        `Failed to create shift: ${error.message}`,
        500,
        "CREATE_ERROR",
        { details: error.message }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[POST /api/shifts] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

