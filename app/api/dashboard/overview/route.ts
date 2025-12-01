import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization, successResponse, errorResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/overview
 * Retourne les KPIs pour l'employeur
 */
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return authError || errorResponse("Unauthorized", 401);

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError) return orgError;

    const supabase = await createClient();

    // Calculer la semaine courante
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Lundi
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // 1. Nombre d'employés actifs
    const { count: employeeCount } = await supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organization_id)
      .eq('is_active', true);

    // 2. Heures planifiées semaine courante
    const { data: currentSchedule } = await supabase
      .from('schedules')
      .select('total_hours, total_cost, compliance_score')
      .eq('organization_id', organization_id)
      .eq('week_start_date', weekStart.toISOString().split('T')[0])
      .single();

    // 3. Coût estimé (total_cost du planning)
    const totalCost = (currentSchedule as any)?.total_cost || 0;

    // 4. Score de conformité
    const complianceScore = (currentSchedule as any)?.compliance_score || null;

    // 5. Demandes de congés en attente
    const { count: pendingTimeOff } = await supabase
      .from('time_off_requests')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organization_id)
      .eq('status', 'PENDING');

    // 6. Shifts aujourd'hui
    const todayStr = today.toISOString().split('T')[0];
    const { count: todayShifts } = await supabase
      .from('shifts')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organization_id)
      .gte('start_time', `${todayStr}T00:00:00`)
      .lte('start_time', `${todayStr}T23:59:59`);

    return successResponse({
      kpis: {
        activeEmployees: employeeCount || 0,
        hoursThisWeek: currentSchedule?.total_hours || 0,
        estimatedCost: totalCost,
        complianceScore: complianceScore,
        pendingTimeOffRequests: pendingTimeOff || 0,
        shiftsToday: todayShifts || 0
      },
      week: {
        start: weekStart.toISOString(),
        end: weekEnd.toISOString()
      }
    });

  } catch (error) {
    console.error("Dashboard overview error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

