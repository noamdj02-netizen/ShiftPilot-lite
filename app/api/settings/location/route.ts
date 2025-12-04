import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization, requireRole } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/settings/location?location_id=...
 * Récupère les informations d'un établissement
 */
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return createErrorResponse(
        "Organization required",
        400,
        "NO_ORGANIZATION"
      );
    }

    const { searchParams } = new URL(request.url);
    const location_id = searchParams.get('location_id');

    if (!location_id) {
      return createErrorResponse(
        "Missing required parameter: location_id",
        400,
        "MISSING_PARAMETER"
      );
    }

    const supabase = await createClient();

    // Récupérer l'établissement
    const { data: location, error: locationError } = await supabase
      .from('locations')
      .select('*')
      .eq('id', location_id)
      .eq('organization_id', organization_id)
      .single();

    if (locationError || !location) {
      return createErrorResponse(
        "Location not found or access denied",
        404,
        "NOT_FOUND"
      );
    }

    return NextResponse.json({ location });

  } catch (error) {
    console.error("[GET /api/settings/location] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * PATCH /api/settings/location?location_id=...
 * Met à jour les informations d'un établissement (managers uniquement)
 */
export async function PATCH(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifier les permissions
    const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
    if (!allowed) {
      return roleError || createErrorResponse(
        "Insufficient permissions",
        403,
        "INSUFFICIENT_PERMISSIONS"
      );
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return createErrorResponse(
        "Organization required",
        400,
        "NO_ORGANIZATION"
      );
    }

    const { searchParams } = new URL(request.url);
    const location_id = searchParams.get('location_id');

    if (!location_id) {
      return createErrorResponse(
        "Missing required parameter: location_id",
        400,
        "MISSING_PARAMETER"
      );
    }

    const body = await request.json();
    const { name, address, city, phone, capacity, opening_hours, is_active } = body;

    const supabase = await createClient();

    // Vérifier que l'établissement appartient à l'organisation
    const { data: existing } = await supabase
      .from('locations')
      .select('id')
      .eq('id', location_id)
      .eq('organization_id', organization_id)
      .single();

    if (!existing) {
      return createErrorResponse(
        "Location not found or access denied",
        404,
        "NOT_FOUND"
      );
    }

    // Préparer les données à mettre à jour
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (phone !== undefined) updateData.phone = phone;
    if (capacity !== undefined) updateData.capacity = capacity;
    if (opening_hours !== undefined) updateData.opening_hours = opening_hours;
    if (is_active !== undefined) updateData.is_active = is_active;

    if (Object.keys(updateData).length === 0) {
      return createErrorResponse(
        "No fields to update",
        400,
        "NO_FIELDS"
      );
    }

    // Mettre à jour l'établissement
    const { data: updatedLocation, error: updateError } = await supabase
      .from('locations')
      .update(updateData)
      .eq('id', location_id)
      .select()
      .single();

    if (updateError || !updatedLocation) {
      console.error("[PATCH /api/settings/location] Error:", updateError);
      return createErrorResponse(
        `Failed to update location: ${updateError?.message || 'Unknown error'}`,
        500,
        "UPDATE_ERROR"
      );
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id,
        actor_id: user.id,
        action: 'LOCATION_UPDATED',
        payload: { location_id, ...updateData }
      } as any);

    return NextResponse.json({ location: updatedLocation });

  } catch (error) {
    console.error("[PATCH /api/settings/location] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * POST /api/settings/location
 * Crée un nouvel établissement (managers uniquement)
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifier les permissions
    const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
    if (!allowed) {
      return roleError || createErrorResponse(
        "Insufficient permissions",
        403,
        "INSUFFICIENT_PERMISSIONS"
      );
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return createErrorResponse(
        "Organization required",
        400,
        "NO_ORGANIZATION"
      );
    }

    const body = await request.json();
    const { name, address, city, phone, capacity, opening_hours } = body;

    // Validation
    if (!name || !address || !city) {
      return createErrorResponse(
        "Missing required fields: name, address, city",
        400,
        "MISSING_FIELDS"
      );
    }

    const supabase = await createClient();

    // Créer l'établissement
    const { data: location, error: createError } = await supabase
      .from('locations')
      .insert({
        organization_id,
        name,
        address,
        city,
        phone: phone || null,
        capacity: capacity || null,
        opening_hours: opening_hours || null,
        is_active: true,
      } as any)
      .select()
      .single();

    if (createError || !location) {
      console.error("[POST /api/settings/location] Error:", createError);
      return createErrorResponse(
        `Failed to create location: ${createError?.message || 'Unknown error'}`,
        500,
        "CREATE_ERROR"
      );
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id,
        actor_id: user.id,
        action: 'LOCATION_CREATED',
        payload: { location_id: location.id, name, city }
      } as any);

    return NextResponse.json({ location }, { status: 201 });

  } catch (error) {
    console.error("[POST /api/settings/location] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

