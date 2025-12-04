import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization, requireRole } from "@/lib/api/auth-helper";

/**
 * PATCH /api/timeoff/[id]
 * Met à jour une demande de congé (approbation/refus par manager)
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = params;
    const { status, notes } = body;

    // Validation
    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return createErrorResponse(
        "Invalid status. Must be PENDING, APPROVED, or REJECTED",
        400,
        "INVALID_STATUS"
      );
    }

    const supabase = await createClient();

    // Récupérer la demande
    const { data: requestData, error: fetchError } = await supabase
      .from('time_off_requests')
      .select('*, employee:employees(organization_id)')
      .eq('id', id)
      .single();

    if (fetchError || !requestData) {
      return createErrorResponse(
        "Time off request not found",
        404,
        "NOT_FOUND"
      );
    }

    const requestOrgId = (requestData.employee as any)?.organization_id;

    // Vérifier les permissions
    if (status !== 'PENDING') {
      // Approbation/refus nécessite permissions manager
      const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
      if (!allowed) {
        return roleError || createErrorResponse(
          "Insufficient permissions. Only managers can approve/reject requests.",
          403,
          "INSUFFICIENT_PERMISSIONS"
        );
      }

      const { organization_id } = await requireOrganization(user);
      if (organization_id !== requestOrgId) {
        return createErrorResponse(
          "Access denied to this time off request",
          403,
          "ACCESS_DENIED"
        );
      }
    } else {
      // Modification d'une demande en PENDING peut être faite par l'employé lui-même
      const { data: employee } = await supabase
        .from('employees')
        .select('id')
        .eq('profile_id', user.id)
        .single();

      if (!employee || employee.id !== requestData.employee_id) {
        return createErrorResponse(
          "You can only modify your own pending requests",
          403,
          "ACCESS_DENIED"
        );
      }
    }

    // Mettre à jour la demande
    const updateData: any = {
      status,
      reviewed_at: status !== 'PENDING' ? new Date().toISOString() : null,
      reviewed_by: status !== 'PENDING' ? user.id : null,
    };

    if (notes) {
      updateData.notes = notes;
    }

    const { data: updatedRequest, error: updateError } = await supabase
      .from("time_off_requests")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        employee:employees(first_name, last_name, position, profile_id)
      `)
      .single();

    if (updateError || !updatedRequest) {
      console.error("[PATCH /api/timeoff/[id]] Error:", updateError);
      return createErrorResponse(
        `Failed to update time off request: ${updateError?.message || 'Unknown error'}`,
        500,
        "UPDATE_ERROR"
      );
    }

    // Créer une notification pour l'employé si approuvé/refusé
    if (status !== 'PENDING' && updatedRequest.employee) {
      const employeeProfileId = (updatedRequest.employee as any)?.profile_id;
      if (employeeProfileId) {
        await supabase
          .from('notifications')
          .insert({
            user_id: employeeProfileId,
            type: status === 'APPROVED' ? 'TIME_OFF_APPROVED' : 'TIME_OFF_REJECTED',
            meta: {
              request_id: id,
              start_date: updatedRequest.start_date,
              end_date: updatedRequest.end_date,
            }
          } as any);
      }
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: requestOrgId,
        actor_id: user.id,
        action: `TIME_OFF_${status}`,
        payload: { request_id: id, status, notes }
      } as any);

    return NextResponse.json(updatedRequest);

  } catch (error) {
    console.error("[PATCH /api/timeoff/[id]] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * DELETE /api/timeoff/[id]
 * Supprime une demande de congé (uniquement si PENDING et par l'employé)
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const supabase = await createClient();

    // Récupérer la demande
    const { data: requestData, error: fetchError } = await supabase
      .from('time_off_requests')
      .select('*, employee:employees(profile_id, organization_id)')
      .eq('id', id)
      .single();

    if (fetchError || !requestData) {
      return createErrorResponse(
        "Time off request not found",
        404,
        "NOT_FOUND"
      );
    }

    // Vérifier que c'est l'employé qui supprime sa propre demande
    const employeeProfileId = (requestData.employee as any)?.profile_id;
    if (employeeProfileId !== user.id) {
      return createErrorResponse(
        "You can only delete your own time off requests",
        403,
        "ACCESS_DENIED"
      );
    }

    // Vérifier que la demande est en PENDING
    if (requestData.status !== 'PENDING') {
      return createErrorResponse(
        "Cannot delete a request that has been reviewed",
        400,
        "CANNOT_DELETE"
      );
    }

    // Supprimer la demande
    const { error: deleteError } = await supabase
      .from('time_off_requests')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error("[DELETE /api/timeoff/[id]] Error:", deleteError);
      return createErrorResponse(
        `Failed to delete time off request: ${deleteError.message}`,
        500,
        "DELETE_ERROR"
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("[DELETE /api/timeoff/[id]] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

