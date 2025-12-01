import { createClient } from "@/lib/supabase/server";

export interface HCRViolation {
  type: 'rest_period' | 'max_daily_hours' | 'max_weekly_hours' | 'consecutive_days' | 'break_duration';
  severity: 'warning' | 'error';
  message: string;
  employeeId?: string;
  date?: string;
  details?: any;
}

export interface ComplianceResult {
  score: number; // 0-100
  violations: HCRViolation[];
  warnings: HCRViolation[];
  isCompliant: boolean;
}

export class ComplianceService {
  /**
   * Check HCR compliance for a schedule
   */
  static async checkScheduleCompliance(
    scheduleId: string,
    organizationId: string
  ): Promise<ComplianceResult> {
    const supabase = await createClient();
    
    // Fetch all shifts for this schedule
    const { data: shifts } = await supabase
      .from('shifts')
      .select('*, profile:profiles(id, first_name, last_name)')
      .eq('organization_id', organizationId)
      .eq('status', 'published'); // Or whatever status indicates active schedule

    if (!shifts || shifts.length === 0) {
      return {
        score: 100,
        violations: [],
        warnings: [],
        isCompliant: true
      };
    }

    const violations: HCRViolation[] = [];
    const warnings: HCRViolation[] = [];

    // Group shifts by employee and date
    const employeeShifts = new Map<string, Map<string, any[]>>();

    shifts.forEach(shift => {
      const empId = shift.profile_id;
      const date = shift.date || shift.start_time?.split('T')[0];
      
      if (!employeeShifts.has(empId)) {
        employeeShifts.set(empId, new Map());
      }
      
      const dateMap = employeeShifts.get(empId)!;
      if (!dateMap.has(date)) {
        dateMap.set(date, []);
      }
      
      dateMap.get(date)!.push(shift);
    });

    // Check each employee
    for (const [empId, dateShifts] of employeeShifts) {
      const weeklyHours = new Map<string, number>(); // week -> total hours
      const dailyHours = new Map<string, number>(); // date -> total hours
      const consecutiveDays = new Map<string, number>(); // week -> max consecutive

      for (const [date, dayShifts] of dateShifts) {
        const dayTotal = dayShifts.reduce((sum, s) => {
          const start = new Date(s.start_time);
          const end = new Date(s.end_time);
          return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }, 0);

        dailyHours.set(date, dayTotal);

        // Check max daily hours (10h)
        if (dayTotal > 10) {
          violations.push({
            type: 'max_daily_hours',
            severity: 'error',
            message: `Dépassement des 10h/jour: ${dayTotal.toFixed(1)}h le ${date}`,
            employeeId: empId,
            date,
            details: { hours: dayTotal }
          });
        } else if (dayTotal > 9) {
          warnings.push({
            type: 'max_daily_hours',
            severity: 'warning',
            message: `Proche de la limite: ${dayTotal.toFixed(1)}h le ${date}`,
            employeeId: empId,
            date,
            details: { hours: dayTotal }
          });
        }

        // Calculate week
        const weekKey = this.getWeekKey(date);
        weeklyHours.set(weekKey, (weeklyHours.get(weekKey) || 0) + dayTotal);
      }

      // Check max weekly hours (48h)
      for (const [week, hours] of weeklyHours) {
        if (hours > 48) {
          violations.push({
            type: 'max_weekly_hours',
            severity: 'error',
            message: `Dépassement des 48h/semaine: ${hours.toFixed(1)}h`,
            employeeId: empId,
            details: { week, hours }
          });
        } else if (hours > 44) {
          warnings.push({
            type: 'max_weekly_hours',
            severity: 'warning',
            message: `Proche de la limite: ${hours.toFixed(1)}h/semaine`,
            employeeId: empId,
            details: { week, hours }
          });
        }
      }

      // Check rest periods (11h minimum between shifts)
      for (const [date, dayShifts] of dateShifts) {
        const sortedShifts = dayShifts.sort((a, b) => 
          new Date(a.end_time).getTime() - new Date(b.end_time).getTime()
        );

        for (let i = 0; i < sortedShifts.length - 1; i++) {
          const currentEnd = new Date(sortedShifts[i].end_time);
          const nextStart = new Date(sortedShifts[i + 1].start_time);
          const restHours = (nextStart.getTime() - currentEnd.getTime()) / (1000 * 60 * 60);

          if (restHours < 11) {
            violations.push({
              type: 'rest_period',
              severity: 'error',
              message: `Repos insuffisant: ${restHours.toFixed(1)}h (minimum 11h requis)`,
              employeeId: empId,
              date,
              details: { restHours, required: 11 }
            });
          }
        }

        // Check rest between consecutive days
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayKey = nextDay.toISOString().split('T')[0];
        
        if (dateShifts.has(nextDayKey)) {
          const lastShiftToday = dayShifts.sort((a, b) => 
            new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
          )[0];
          const firstShiftTomorrow = dateShifts.get(nextDayKey)!.sort((a, b) => 
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
          )[0];

          const restHours = (new Date(firstShiftTomorrow.start_time).getTime() - 
                           new Date(lastShiftToday.end_time).getTime()) / (1000 * 60 * 60);

          if (restHours < 11) {
            violations.push({
              type: 'rest_period',
              severity: 'error',
              message: `Repos inter-jours insuffisant: ${restHours.toFixed(1)}h`,
              employeeId: empId,
              date,
              details: { restHours, required: 11 }
            });
          }
        }
      }

      // Check consecutive days (max 6)
      const sortedDates = Array.from(dateShifts.keys()).sort();
      let maxConsecutive = 1;
      let currentConsecutive = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1]);
        const curr = new Date(sortedDates[i]);
        const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          currentConsecutive++;
          maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        } else {
          currentConsecutive = 1;
        }
      }

      if (maxConsecutive > 6) {
        violations.push({
          type: 'consecutive_days',
          severity: 'error',
          message: `Plus de 6 jours consécutifs: ${maxConsecutive} jours`,
          employeeId: empId,
          details: { consecutiveDays: maxConsecutive }
        });
      }
    }

    // Calculate compliance score
    const totalChecks = violations.length + warnings.length;
    const errorCount = violations.length;
    const warningCount = warnings.length;
    
    let score = 100;
    score -= errorCount * 10; // -10 points per error
    score -= warningCount * 2; // -2 points per warning
    score = Math.max(0, score);

    return {
      score,
      violations,
      warnings,
      isCompliant: violations.length === 0
    };
  }

  /**
   * Get week key from date (YYYY-WW format)
   */
  private static getWeekKey(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const week = this.getWeekNumber(d);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  /**
   * Get ISO week number
   */
  private static getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}

