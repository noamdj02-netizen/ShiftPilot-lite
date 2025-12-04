import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization, requireRole, successResponse, errorResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

/**
 * PATCH /api/schedules/:id/status
 * Change le statut d'un planning (DRAFT → VALIDATED → PUBLISHED)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return authError || errorResponse("Unauthorized", 401);

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError) return orgError;

    const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
    if (!allowed) return roleError || errorResponse("Insufficient permissions", 403);

    const body = await request.json();
    const { status } = body;

    if (!status || !['DRAFT', 'REVIEW', 'VALIDATED', 'PUBLISHED'].includes(status)) {
      return errorResponse("Invalid status", 400);
    }

    const supabase = await createClient();

    // Vérifier que le planning existe et appartient à l'organisation
    const { data: schedule, error: fetchError } = await supabase
      .from('schedules')
      .select('*')
      .eq('id', params.id)
      .eq('organization_id', organization_id)
      .single();

    if (fetchError || !schedule) {
      return errorResponse("Schedule not found", 404);
    }

    // Mettre à jour le statut
    const updateData: any = { status };
    if (status === 'VALIDATED' || status === 'PUBLISHED') {
      updateData.validated_by = user.id;
    }

    const { data: updatedSchedule, error: updateError } = await supabase
      .from('schedules')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (updateError || !updatedSchedule) {
      console.error("Error updating schedule:", updateError);
      return errorResponse("Failed to update schedule", 500);
    }

    // Si publié, mettre à jour les shifts et créer des notifications
    if (status === 'PUBLISHED') {
      // Marquer tous les shifts comme publiés
      await supabase
        .from('shifts')
        .update({ is_published: true })
        .eq('schedule_id', params.id);

      // Créer des notifications pour tous les employés concernés
      const { data: shifts } = await supabase
        .from('shifts')
        .select('profile_id')
        .eq('schedule_id', params.id)
        .not('profile_id', 'is', null);

      if (shifts) {
        const uniqueProfileIds = [...new Set(shifts.map(s => s.profile_id).filter(Boolean))];
        const notifications = uniqueProfileIds.map(profileId => ({
          user_id: profileId,
          type: 'PLANNING_PUBLISHED',
          meta: {
            schedule_id: params.id,
            week_start_date: schedule.week_start_date
          }
        }));

        await supabase.from('notifications').insert(notifications as any);
      }
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id,
        actor_id: user.id,
        action: 'SCHEDULE_STATUS_CHANGED',
        payload: {
          schedule_id: params.id,
          old_status: schedule.status,
          new_status: status
        }
      } as any);

    return successResponse({ schedule: updatedSchedule });

  } catch (error) {
    console.error("Update schedule status error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

