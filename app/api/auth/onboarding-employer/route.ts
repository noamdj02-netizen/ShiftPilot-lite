import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization, requireRole, successResponse, errorResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/onboarding-employer
 * Crée l'organisation, le premier établissement, et lie l'utilisateur comme OWNER
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return authError || errorResponse("Unauthorized", 401);

    // Vérifier que l'utilisateur n'a pas déjà une organisation
    if (user.organization_id) {
      return errorResponse("User already has an organization", 400);
    }

    const body = await request.json();
    const {
      businessName,
      brandName,
      address,
      city,
      country = 'FR',
      timezone = 'Europe/Paris',
      locationName,
      locationAddress,
      employeeCount,
      businessType
    } = body;

    // Validation
    if (!businessName || !address || !city) {
      return errorResponse("Missing required fields: businessName, address, city", 400);
    }

    const supabase = await createClient();

    // 1. Créer l'organisation
    // Note: Type assertion nécessaire car les types générés ne correspondent pas encore au nouveau schéma
    // Après avoir appliqué la migration 001_complete_schema.sql, régénérer les types avec: npm run db:generate
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: businessName,
        brand_name: brandName,
        address,
        city,
        country,
        timezone,
        slug: businessName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7)
      } as any)
      .select()
      .single();

    if (orgError || !org) {
      console.error("Error creating organization:", orgError);
      return errorResponse("Failed to create organization", 500);
    }

    // 2. Créer le premier établissement (location)
    const { data: location, error: locationError } = await supabase
      .from('locations')
      .insert({
        organization_id: org.id,
        name: locationName || `${businessName} (Principal)`,
        address: locationAddress || address,
        city,
        is_active: true
      } as any)
      .select()
      .single();

    if (locationError) {
      console.error("Error creating location:", locationError);
      // On continue quand même, l'établissement peut être créé plus tard
    }

    // 3. Mettre à jour le profil utilisateur (OWNER)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        organization_id: org.id,
        role: 'OWNER',
        default_location_id: location?.id || null
      } as any)
      .eq('id', user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return errorResponse("Failed to update profile", 500);
    }

    // 4. Créer les règles RH par défaut (France)
    await supabase
      .from('labor_rules')
      .insert({
        organization_id: org.id,
        country_code: country,
        max_hours_per_week: 48.0,
        min_rest_hours_between_shifts: 11.0,
        max_consecutive_days: 6,
        sunday_premium_rate: 1.2,
        night_premium_rate: 1.1
      } as any);

    // 5. Créer un canal de messagerie général
    if (location) {
      await supabase
        .from('message_channels')
        .insert({
          organization_id: org.id,
          name: 'Général',
          type: 'TEAM'
        } as any);
    }

    // 6. Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: org.id,
        actor_id: user.id,
        action: 'ORGANIZATION_CREATED',
        payload: { businessName, city, country }
      } as any);

    return successResponse({
      success: true,
      organization: org,
      location: location || null
    }, 201);

  } catch (error) {
    console.error("Onboarding error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

