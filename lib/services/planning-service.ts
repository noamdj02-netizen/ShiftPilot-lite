import { 
  GeneratedShift, 
  GeneratedScheduleResult, 
  ScheduleGenerationParams, 
  EmployeeConstraint 
} from "@/lib/types/planning";
import { adjustStaffingForWeather, calculateShiftDuration, checkHCRCompliance, calculateEmployeeScore } from "./planning-helpers";
import { createClient } from "@/lib/supabase/server";

export class PlanningService {
  
  async generateScheduleForWeek(params: ScheduleGenerationParams): Promise<GeneratedScheduleResult> {
    const supabase = await createClient();
    const { organizationId, establishmentId, startDate } = params;

    // 1. Fetch Data
    // ---------------------------------------------------------
    
    // Fetch Employees
    const { data: employees, error: empError } = await supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true);

    if (empError || !employees) throw new Error("Failed to fetch employees");

    // Fetch Constraints
    const { data: constraints } = await supabase
      .from('employee_constraints')
      .select('*')
      .in('profile_id', employees.map(e => e.id))
      .eq('is_active', true);

    // Fetch Shift Templates
    // If no dedicated table, we might use a hardcoded fallback or existing structure.
    // We created `shift_templates` in migration.
    let { data: templates } = await supabase
      .from('shift_templates')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_active', true);

    // Fetch Weather
    const dates = Array.from({length: 7}, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    let weatherData: any[] = [];
    if (establishmentId && params.useWeather) {
      const { data: weather } = await supabase
        .from('weather_forecasts')
        .select('*')
        .eq('establishment_id', establishmentId)
        .in('date', dates);
      weatherData = weather || [];
    }

    // Fetch Time Off
    const { data: timeOffs } = await supabase
      .from('time_off_requests')
      .select('*')
      .in('profile_id', employees.map(e => e.id))
      .eq('status', 'APPROVED')
      .or(`start_date.lte.${dates[6]},end_date.gte.${dates[0]}`); // Overlap check

    // 2. Initialization
    // ---------------------------------------------------------
    const generatedShifts: GeneratedShift[] = [];
    const employeeSummaries = employees.map(e => ({
      employeeId: e.id,
      name: `${e.first_name} ${e.last_name}`,
      totalHours: 0,
      contractHours: Number(e.contract_hours_per_week) || 35,
      deviation: 0,
      shiftCount: 0
    }));
    const alerts: string[] = [];
    const weatherAdjustments: string[] = [];

    // Fallback templates if none exist
    if (!templates || templates.length === 0) {
      // Default generic templates for demo
      templates = [
        { day_of_week: 1, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 2, max_staff: 4, required_roles: {} }, // Mon
        { day_of_week: 1, label: 'Soir', start_time: '18:00', end_time: '23:00', min_staff: 3, max_staff: 5, required_roles: {} },
        { day_of_week: 2, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 2, max_staff: 4, required_roles: {} },
        { day_of_week: 2, label: 'Soir', start_time: '18:00', end_time: '23:00', min_staff: 3, max_staff: 5, required_roles: {} },
        { day_of_week: 3, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 2, max_staff: 4, required_roles: {} },
        { day_of_week: 3, label: 'Soir', start_time: '18:00', end_time: '23:00', min_staff: 3, max_staff: 5, required_roles: {} },
        { day_of_week: 4, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 2, max_staff: 4, required_roles: {} },
        { day_of_week: 4, label: 'Soir', start_time: '18:00', end_time: '23:00', min_staff: 3, max_staff: 5, required_roles: {} }, // Thu
        { day_of_week: 5, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 3, max_staff: 6, required_roles: {} }, // Fri
        { day_of_week: 5, label: 'Soir', start_time: '18:00', end_time: '00:00', min_staff: 4, max_staff: 8, required_roles: {} },
        { day_of_week: 6, label: 'Midi', start_time: '11:00', end_time: '15:00', min_staff: 3, max_staff: 6, required_roles: {} }, // Sat
        { day_of_week: 6, label: 'Soir', start_time: '18:00', end_time: '00:00', min_staff: 4, max_staff: 8, required_roles: {} },
        // Sunday off or minimal
        { day_of_week: 0, label: 'Brunch', start_time: '11:00', end_time: '16:00', min_staff: 3, max_staff: 5, required_roles: {} },
      ] as any[];
    }

    // 3. Processing Day by Day
    // ---------------------------------------------------------
    for (let i = 0; i < 7; i++) {
      const currentDate = dates[i];
      const dateObj = new Date(currentDate);
      const dayOfWeek = dateObj.getDay(); // 0-6
      
      // Find templates for this day
      const dayTemplates = templates?.filter(t => t.day_of_week === dayOfWeek) || [];
      
      // Weather info
      const dailyWeather = weatherData.find(w => w.date === currentDate);
      
      for (const tmpl of dayTemplates) {
        // Adjust staffing based on weather
        let targetStaff = tmpl.min_staff;
        let adjusted = false;

        if (dailyWeather && dailyWeather.traffic_level_estimate) {
          const adjustments = adjustStaffingForWeather(
            tmpl.min_staff, 
            tmpl.max_staff, 
            dailyWeather.traffic_level_estimate,
            dailyWeather.is_terrasse_friendly
          );
          if (adjustments.min !== tmpl.min_staff) {
            targetStaff = adjustments.min;
            adjusted = true;
            weatherAdjustments.push(`[${currentDate}] ${tmpl.label}: Staffing adjusted to ${targetStaff} due to ${dailyWeather.traffic_level_estimate} traffic.`);
          }
        }

        // Assign employees
        let assignedCount = 0;
        
        // Sort employees by score (greedy approach)
        // Re-sort for each shift to balance hours dynamically
        const candidates = employees
          .filter(emp => {
            // Filter 1: Time Off
            const onLeave = timeOffs?.some(to => 
              to.profile_id === emp.id && 
              currentDate >= to.start_date && 
              currentDate <= to.end_date
            );
            if (onLeave) return false;

            // Filter 2: Constraints (e.g. NO_NIGHT)
            const empConstraints = constraints?.filter(c => c.profile_id === emp.id) || [];
            // Example check
            if (empConstraints.some((c: EmployeeConstraint) => c.type === 'NO_NIGHT' && tmpl.end_time > '21:00')) return false;

            // Filter 3: HCR Compliance (simplified)
            const { compliant } = checkHCRCompliance(emp, currentDate, { start: tmpl.start_time, end: tmpl.end_time }, generatedShifts);
            if (!compliant) return false;

            return true;
          })
          .sort((a, b) => {
            const summaryA = employeeSummaries.find(s => s.employeeId === a.id)!;
            const summaryB = employeeSummaries.find(s => s.employeeId === b.id)!;
            
            const scoreA = calculateEmployeeScore(a, summaryA.totalHours, summaryA.contractHours!, 50);
            const scoreB = calculateEmployeeScore(b, summaryB.totalHours, summaryB.contractHours!, 50);
            
            return scoreB - scoreA; // Descending score
          });

        // Assign up to targetStaff
        for (const candidate of candidates) {
          if (assignedCount >= targetStaff) break;

          const summary = employeeSummaries.find(s => s.employeeId === candidate.id)!;
          
          // Assign shift
          generatedShifts.push({
            profile_id: candidate.id,
            date: currentDate,
            start_time: tmpl.start_time,
            end_time: tmpl.end_time,
            role: candidate.role || 'employee',
            status: 'DRAFT',
            source: 'AUTO_GENERATED',
            weather_adjusted: adjusted
          });

          // Update summary
          const duration = calculateShiftDuration(tmpl.start_time, tmpl.end_time);
          summary.totalHours += duration;
          summary.shiftCount++;
          assignedCount++;
        }

        if (assignedCount < targetStaff) {
          alerts.push(`[${currentDate}] ${tmpl.label}: Understaffed (${assignedCount}/${targetStaff}).`);
        }
      }
    }

    // 4. Finalize Summaries
    // ---------------------------------------------------------
    employeeSummaries.forEach(s => {
      s.deviation = s.totalHours - (s.contractHours || 0);
    });

    return {
      weekStart: dates[0],
      weekEnd: dates[6],
      shifts: generatedShifts,
      summary: {
        employeesHours: employeeSummaries,
        alerts,
        weatherAdjustments
      }
    };
  }
}

export const planningService = new PlanningService();

