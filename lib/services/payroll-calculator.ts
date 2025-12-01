import { createClient } from "@/lib/supabase/server";

export interface PayrollCalculation {
  totalHours: number;
  baseCost: number;
  overtimeHours: number;
  overtimeCost: number;
  eveningPremium: number;
  sundayPremium: number;
  holidayPremium: number;
  totalCost: number;
  estimatedCharges: number;
}

export interface EmployeePayrollDetail {
  profileId: string;
  hoursWorked: number;
  baseRate: number;
  baseCost: number;
  overtimeHours: number;
  overtimeCost: number;
  premiums: number;
  totalCost: number;
}

export class PayrollCalculator {
  /**
   * Calculate payroll for a period
   */
  static async calculatePayroll(
    organizationId: string,
    establishmentId: string,
    periodStart: string,
    periodEnd: string
  ): Promise<{ success: boolean; calculation?: PayrollCalculation; details?: EmployeePayrollDetail[]; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    // Fetch all shifts in period
    const { data: shifts } = await supabase
      .from('shifts')
      .select('*, profile:profiles(id, first_name, last_name, hourly_rate)')
      .eq('organization_id', organizationId)
      .eq('establishment_id', establishmentId)
      .gte('date', periodStart)
      .lte('date', periodEnd)
      .eq('status', 'published');

    if (!shifts || shifts.length === 0) {
      return { success: false, error: 'No shifts found' };
    }

    // Group by employee
    const employeeHours = new Map<string, {
      profile: any;
      shifts: any[];
      totalHours: number;
      eveningHours: number;
      sundayHours: number;
      holidayHours: number;
    }>();

    shifts.forEach(shift => {
      const empId = shift.profile_id;
      if (!employeeHours.has(empId)) {
        employeeHours.set(empId, {
          profile: shift.profile,
          shifts: [],
          totalHours: 0,
          eveningHours: 0,
          sundayHours: 0,
          holidayHours: 0
        });
      }

      const emp = employeeHours.get(empId)!;
      emp.shifts.push(shift);

      const start = new Date(shift.start_time);
      const end = new Date(shift.end_time);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      emp.totalHours += hours;

      // Check for premiums
      const hour = start.getHours();
      if (hour >= 20 || hour < 6) {
        emp.eveningHours += hours;
      }

      const dayOfWeek = start.getDay();
      if (dayOfWeek === 0) { // Sunday
        emp.sundayHours += hours;
      }

      // TODO: Check for holidays (would need a holidays table)
    });

    // Calculate costs
    let totalHours = 0;
    let baseCost = 0;
    let overtimeHours = 0;
    let overtimeCost = 0;
    let eveningPremium = 0;
    let sundayPremium = 0;
    let holidayPremium = 0;

    const details: EmployeePayrollDetail[] = [];

    for (const [empId, emp] of employeeHours) {
      const hourlyRate = emp.profile?.hourly_rate || 12; // Default rate
      const weeklyHours = emp.totalHours;
      const contractHours = emp.profile?.contract_hours_per_week || 35;

      // Base cost
      const baseHours = Math.min(weeklyHours, contractHours);
      const baseEmpCost = baseHours * hourlyRate;
      baseCost += baseEmpCost;

      // Overtime (hours beyond contract)
      if (weeklyHours > contractHours) {
        const otHours = weeklyHours - contractHours;
        const otCost = otHours * hourlyRate * 1.25; // 25% premium
        overtimeHours += otHours;
        overtimeCost += otCost;
      }

      // Premiums
      const eveningCost = emp.eveningHours * hourlyRate * 0.1; // 10% premium
      const sundayCost = emp.sundayHours * hourlyRate * 0.2; // 20% premium
      eveningPremium += eveningCost;
      sundayPremium += sundayCost;

      totalHours += weeklyHours;

      details.push({
        profileId: empId,
        hoursWorked: weeklyHours,
        baseRate: hourlyRate,
        baseCost: baseEmpCost,
        overtimeHours: Math.max(0, weeklyHours - contractHours),
        overtimeCost: Math.max(0, (weeklyHours - contractHours) * hourlyRate * 1.25),
        premiums: eveningCost + sundayCost,
        totalCost: baseEmpCost + (weeklyHours > contractHours ? (weeklyHours - contractHours) * hourlyRate * 1.25 : 0) + eveningCost + sundayCost
      });
    }

    const totalCost = baseCost + overtimeCost + eveningPremium + sundayPremium + holidayPremium;
    const estimatedCharges = totalCost * 0.45; // Approx 45% charges patronales

    const calculation: PayrollCalculation = {
      totalHours,
      baseCost,
      overtimeHours,
      overtimeCost,
      eveningPremium,
      sundayPremium,
      holidayPremium,
      totalCost,
      estimatedCharges
    };

    // Save to database
    const { data: payrollCalc, error: calcError } = await supabase
      .from('payroll_calculations')
      .insert({
        organization_id: organizationId,
        establishment_id: establishmentId,
        period_start: periodStart,
        period_end: periodEnd,
        ...calculation,
        calculated_by: user.id
      })
      .select('id')
      .single();

    if (calcError || !payrollCalc) {
      return { success: false, error: calcError?.message || 'Failed to save calculation' };
    }

    // Save details
    if (details.length > 0) {
      await supabase
        .from('employee_payroll_details')
        .insert(
          details.map(d => ({
            payroll_calculation_id: payrollCalc.id,
            profile_id: d.profileId,
            hours_worked: d.hoursWorked,
            base_rate: d.baseRate,
            base_cost: d.baseCost,
            overtime_hours: d.overtimeHours,
            overtime_cost: d.overtimeCost,
            premiums: d.premiums,
            total_cost: d.totalCost
          }))
        );
    }

    return { success: true, calculation, details };
  }

  /**
   * Get payroll history
   */
  static async getPayrollHistory(
    organizationId: string,
    establishmentId?: string,
    limit: number = 10
  ) {
    const supabase = await createClient();
    
    let query = supabase
      .from('payroll_calculations')
      .select('*')
      .eq('organization_id', organizationId)
      .order('calculated_at', { ascending: false })
      .limit(limit);

    if (establishmentId) {
      query = query.eq('establishment_id', establishmentId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching payroll history:', error);
      return [];
    }

    return data || [];
  }
}

