import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, errorResponse, successResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";
import { createErrorResponse } from "@/lib/api/error-handler";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/onboarding-employee
 * Invite un employé à rejoindre l'organisation
 * Cette route est appelée par un manager/owner pour inviter un employé
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || errorResponse("Unauthorized", 401);
    }

    // Vérifier que l'utilisateur est manager/owner/hr
    if (user.role !== 'OWNER' && user.role !== 'MANAGER' && user.role !== 'HR') {
      return errorResponse("Insufficient permissions. Only managers can invite employees.", 403);
    }

    // Vérifier que l'utilisateur a un restaurant
    if (!user.restaurant_id) {
      return errorResponse("Restaurant required. Please complete onboarding first.", 400);
    }

    const body = await request.json();
    const { email, first_name, last_name, position, location_id, hourly_rate } = body;

    // Validation
    if (!email || !first_name || !last_name) {
      return errorResponse("Missing required fields: email, first_name, last_name", 400);
    }

    const supabase = await createClient();

    // Vérifier si un profil existe déjà avec cet email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    let profileId: string;
    
    if (existingProfile?.id) {
      // Le profil existe déjà, mettre à jour son profil
      profileId = existingProfile.id;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          restaurant_id: user.restaurant_id,
          role: 'EMPLOYEE',
          first_name,
          last_name,
          default_location_id: location_id || null,
        } as any)
        .eq('id', profileId);

      if (updateError) {
        console.error("Error updating existing profile:", updateError);
        return createErrorResponse(
          "Failed to update employee profile",
          500,
          "UPDATE_ERROR"
        );
      }
    } else {
      // L'utilisateur n'existe pas, on doit créer un invité
      // Pour l'instant, on crée juste le profil et l'employé
      // L'utilisateur devra s'inscrire avec cet email plus tard
      
      // Note: Sans auth.user, on ne peut pas créer de profil directement
      // Solution: Créer un employé sans profile_id, qui sera lié lors de l'inscription
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .insert({
          restaurant_id: user.restaurant_id,
          location_id: location_id || null,
          first_name,
          last_name,
          position: position || null,
          hourly_rate: hourly_rate || null,
          is_active: true,
        } as any)
        .select()
        .single();

      if (employeeError || !employee) {
        console.error("Error creating employee:", employeeError);
        return createErrorResponse(
          "Failed to create employee record",
          500,
          "CREATE_ERROR"
        );
      }

      // TODO: Envoyer un email d'invitation avec un lien d'inscription
      // Pour l'instant, retourner l'employé créé

      return successResponse({
        success: true,
        employee,
        message: "Employee created. Invitation email should be sent.",
        note: "User must register with this email to activate their account"
      }, 201);
    }

    // Créer l'enregistrement employee
    const { data: employee, error: employeeError } = await supabase
      .from('employees')
      .insert({
        organization_id: user.organization_id,
        location_id: location_id || null,
        profile_id: profileId,
        first_name,
        last_name,
        position: position || null,
        hourly_rate: hourly_rate || null,
        is_active: true,
      } as any)
      .select()
      .single();

    if (employeeError) {
      console.error("Error creating employee:", employeeError);
      return createErrorResponse(
        "Failed to create employee record",
        500,
        "CREATE_ERROR"
      );
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: user.organization_id,
        actor_id: user.id,
        action: 'EMPLOYEE_INVITED',
        payload: { email, first_name, last_name, position }
      } as any);

      return successResponse({
        success: true,
        employee,
        message: existingProfile?.id 
          ? "Employee added to organization successfully"
          : "Employee invitation created. User must register to activate."
      }, 201);

  } catch (error) {
    console.error("Onboarding employee error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500,
      "INTERNAL_ERROR"
    );
  }
}

