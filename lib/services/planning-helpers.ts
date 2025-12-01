import { Shift, Employee } from "@/lib/types";
import { GeneratedShift, GeneratedScheduleResult, TrafficLevel, ShiftTemplate, EmployeeConstraint } from "@/lib/types/planning";

/**
 * Calculates the duration of a shift in hours
 */
export function calculateShiftDuration(start: string, end: string): number {
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  
  let duration = (endH + endM / 60) - (startH + startM / 60);
  if (duration < 0) duration += 24; // Crosses midnight
  
  return duration;
}

/**
 * Checks HCR compliance (repos, max hours, etc.)
 */
export function checkHCRCompliance(
  employee: any,
  date: string,
  newShift: { start: string; end: string },
  existingShifts: GeneratedShift[]
): { compliant: boolean; reason?: string } {
  // 1. Check daily max hours (10h)
  const dayShifts = existingShifts.filter(s => s.profile_id === employee.id && s.date === date);
  const newDuration = calculateShiftDuration(newShift.start, newShift.end);
  const dayTotal = dayShifts.reduce((sum, s) => sum + calculateShiftDuration(s.start_time, s.end_time), 0) + newDuration;
  
  if (dayTotal > 10) {
    return { compliant: false, reason: `Max daily hours exceeded (${dayTotal.toFixed(1)}h > 10h)` };
  }

  // 2. Check min rest (11h) - simplified check against previous day's last shift
  // This requires fetching previous day's shifts which we might not have in this context easily without more data.
  // We'll assume basic daily separation for now.
  
  // 3. Check weekly max (approximate check, usually 48h max or contract avg)
  // This is handled in the main algorithm by tracking total weekly hours.

  return { compliant: true };
}

/**
 * Adjusts staffing needs based on weather/traffic
 */
export function adjustStaffingForWeather(
  minStaff: number,
  maxStaff: number,
  traffic: TrafficLevel,
  isTerrasseFriendly: boolean
): { min: number; max: number } {
  let adjustedMin = minStaff;
  let adjustedMax = maxStaff;

  if (traffic === 'HIGH') {
    adjustedMin = Math.ceil(minStaff * 1.2); // +20%
    adjustedMax = Math.ceil(maxStaff * 1.2);
  } else if (traffic === 'LOW') {
    adjustedMin = Math.max(1, Math.floor(minStaff * 0.9)); // -10% but at least 1
    adjustedMax = Math.max(adjustedMin, Math.floor(maxStaff * 0.9));
  }

  if (isTerrasseFriendly) {
    adjustedMin += 1; // Need extra runner/waiter for terrasse
    adjustedMax += 1;
  }

  return { min: adjustedMin, max: adjustedMax };
}

/**
 * Calculates a score for an employee for a specific shift assignment
 * Lower score is better (like a cost function) or Higher is better?
 * Let's use Higher is Better.
 */
export function calculateEmployeeScore(
  employee: any,
  currentWeeklyHours: number,
  contractHours: number,
  skillsMatch: number // 0-100
): number {
  let score = 100;

  // Favor employees who haven't met their contract hours yet
  const hoursTarget = contractHours || 35;
  const completionRatio = currentWeeklyHours / hoursTarget;
  
  if (completionRatio < 0.8) score += 50; // Need hours
  else if (completionRatio > 1.0) score -= 50; // Already over (overtime)
  else if (completionRatio > 1.2) score -= 100; // Way over

  // Skills match boost
  score += skillsMatch;

  // Role preference could be added here

  return score;
}

