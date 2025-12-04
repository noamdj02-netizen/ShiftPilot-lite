import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization, requireRole } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/settings/organization
 * Récupère les informations de l'organisation
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

    const supabase = await createClient();

    // Récupérer l'organisation avec les règles RH
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .select(`
        *,
        labor_rules:labor_rules(*),
        locations:locations(*)
      `)
      .eq('id', organization_id)
      .single();

    if (orgError || !organization) {
      console.error("[GET /api/settings/organization] Error:", orgError);
      return createErrorResponse(
        "Failed to fetch organization",
        500,
        "FETCH_ERROR"
      );
    }

    return NextResponse.json({ organization });

  } catch (error) {
    console.error("[GET /api/settings/organization] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * PATCH /api/settings/organization
 * Met à jour les informations de l'organisation (owners uniquement)
 */
export async function PATCH(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Seuls les owners peuvent modifier l'organisation
    const { allowed, error: roleError } = requireRole(user, ['OWNER']);
    if (!allowed) {
      return roleError || createErrorResponse(
        "Only organization owners can update organization settings",
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
    const { name, brand_name, address, city, country, timezone, logo_url } = body;

    const supabase = await createClient();

    // Préparer les données à mettre à jour
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (brand_name !== undefined) updateData.brand_name = brand_name;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (country !== undefined) updateData.country = country;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (logo_url !== undefined) updateData.logo_url = logo_url;

    if (Object.keys(updateData).length === 0) {
      return createErrorResponse(
        "No fields to update",
        400,
        "NO_FIELDS"
      );
    }

    // Mettre à jour l'organisation
    const { data: updatedOrg, error: updateError } = await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', organization_id)
      .select()
      .single();

    if (updateError || !updatedOrg) {
      console.error("[PATCH /api/settings/organization] Error:", updateError);
      return createErrorResponse(
        `Failed to update organization: ${updateError?.message || 'Unknown error'}`,
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
        action: 'ORGANIZATION_UPDATED',
        payload: updateData
      } as any);

    return NextResponse.json({ organization: updatedOrg });

  } catch (error) {
    console.error("[PATCH /api/settings/organization] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

