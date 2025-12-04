import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization, successResponse, errorResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

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

    // 7. Graphique des heures par jour de la semaine
    const { data: weekShifts } = await supabase
      .from('shifts')
      .select('start_time, end_time')
      .eq('organization_id', organization_id)
      .gte('start_time', weekStart.toISOString())
      .lte('start_time', weekEnd.toISOString());

    // Calculer les heures par jour
    const hoursByDay: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      hoursByDay[date.toISOString().split('T')[0]] = 0;
    }

    if (weekShifts) {
      weekShifts.forEach((shift: any) => {
        const shiftDate = new Date(shift.start_time).toISOString().split('T')[0];
        const start = new Date(shift.start_time);
        const end = new Date(shift.end_time);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        if (hoursByDay[shiftDate] !== undefined) {
          hoursByDay[shiftDate] += hours;
        }
      });
    }

    // 8. Mini planning du jour (shifts d'aujourd'hui avec détails)
    const { data: todayShiftsDetails } = await supabase
      .from('shifts')
      .select(`
        id,
        start_time,
        end_time,
        role,
        profiles:profile_id(first_name, last_name),
        employees:employee_id(first_name, last_name, position)
      `)
      .eq('organization_id', organization_id)
      .gte('start_time', `${todayStr}T00:00:00`)
      .lte('start_time', `${todayStr}T23:59:59`)
      .order('start_time', { ascending: true })
      .limit(10);

    // 9. Alertes RH (repos insuffisant, heures excessives)
    const alerts: any[] = [];
    
    // Vérifier les employés avec heures excessives
    const { data: employees } = await supabase
      .from('employees')
      .select('id, first_name, last_name, max_hours_week')
      .eq('organization_id', organization_id)
      .eq('is_active', true);

    if (employees && weekShifts) {
      employees.forEach((emp: any) => {
        const empShifts = weekShifts.filter((s: any) => 
          s.profile_id === emp.id || s.employee_id === emp.id
        );
        const totalHours = empShifts.reduce((acc: number, shift: any) => {
          const start = new Date(shift.start_time);
          const end = new Date(shift.end_time);
          return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }, 0);
        
        if (emp.max_hours_week && totalHours > emp.max_hours_week) {
          alerts.push({
            type: 'warning',
            severity: 'high',
            message: `${emp.first_name} ${emp.last_name} : ${totalHours.toFixed(1)}h prévues cette semaine (max: ${emp.max_hours_week}h)`,
            employee_id: emp.id
          });
        }
      });
    }

    // 10. Dernières demandes de congés (top 5)
    const { data: recentTimeOff } = await supabase
      .from('time_off_requests')
      .select(`
        id,
        start_date,
        end_date,
        status,
        reason,
        employee:employees(first_name, last_name)
      `)
      .eq('organization_id', organization_id)
      .order('created_at', { ascending: false })
      .limit(5);

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
      },
      charts: {
        hoursByDay: Object.entries(hoursByDay).map(([date, hours]) => ({
          date,
          hours: Math.round(hours * 10) / 10,
          day: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })
        }))
      },
      todayPlanning: (todayShiftsDetails || []).map((shift: any) => ({
        id: shift.id,
        start_time: shift.start_time,
        end_time: shift.end_time,
        role: shift.role,
        employee: shift.profiles || shift.employees
      })),
      alerts: alerts.slice(0, 5), // Top 5 alertes
      recentTimeOffRequests: recentTimeOff || []
    });

  } catch (error) {
    console.error("Dashboard overview error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

