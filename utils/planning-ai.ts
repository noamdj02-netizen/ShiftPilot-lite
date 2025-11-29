import { Shift, Employee } from "@/lib/types";

interface PlanningRules {
  maxHoursPerDay: number;
  maxHoursPerWeek: number;
  minRestHours: number;
  openingHour: number;
  closingHour: number;
}

const DEFAULT_RULES: PlanningRules = {
  maxHoursPerDay: 10,
  maxHoursPerWeek: 35,
  minRestHours: 11,
  openingHour: 9, // 09:00
  closingHour: 23, // 23:00
};

// Simulation d'une "intelligence" simple pour le remplissage
export async function generateSmartPlanning(
  employees: Employee[],
  existingShifts: Record<string, Shift[]>, // Keyed by employee ID
  startDate: Date
): Promise<Record<string, Shift[]>> {
  // Simuler un temps de calcul pour l'effet "IA"
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const newShifts: Record<string, Shift[]> = JSON.parse(
    JSON.stringify(existingShifts)
  );

  const daysOfWeek = 7;

  employees.forEach((employee) => {
    if (!newShifts[employee.id]) {
      newShifts[employee.id] = new Array(daysOfWeek).fill(null);
    }

    // Logique simple : remplir les trous pour atteindre ~35h
    // On suppose que le tableau 'newShifts[employee.id]' a 7 entrées (0=Lundi, 6=Dimanche)
    
    let currentWeeklyHours = calculateWeeklyHours(newShifts[employee.id]);

    for (let dayIndex = 0; dayIndex < daysOfWeek; dayIndex++) {
      // Si pas de shift ce jour-là et qu'on n'a pas atteint le quota
      if (!newShifts[employee.id][dayIndex] && currentWeeklyHours < DEFAULT_RULES.maxHoursPerWeek) {
        
        // Règle métier basique selon le rôle
        const shift = createShiftForRole(employee.role, dayIndex);
        
        if (shift) {
          // Vérification basique (pas de conflit - ici c'est vide donc ok)
          newShifts[employee.id][dayIndex] = shift;
          currentWeeklyHours += calculateShiftDuration(shift);
        }
      }
    }
  });

  return newShifts;
}

function createShiftForRole(role: string, dayIndex: number): Shift | null {
  const isWeekend = dayIndex >= 5; // Samedi/Dimanche

  // Horaires types
  const morningShift = { start: "09:00", end: "15:00", type: "work" as const }; // 6h
  const eveningShift = { start: "17:00", end: "23:00", type: "work" as const }; // 6h
  const fullDay = { start: "10:00", end: "18:00", type: "work" as const }; // 8h
  const kitchenPrep = { start: "08:00", end: "14:00", type: "kitchen" as const };
  const adminDay = { start: "09:00", end: "17:00", type: "admin" as const };

  // Randomisation légère
  const rand = Math.random();

  switch (role.toLowerCase()) {
    case "serveur":
    case "serveuse":
      if (isWeekend) return rand > 0.5 ? fullDay : eveningShift;
      return rand > 0.5 ? morningShift : eveningShift;
    
    case "cuisinier":
    case "chef":
      return rand > 0.3 ? kitchenPrep : eveningShift;

    case "manager":
      // Managers often work weekdays admin/supervision
      if (!isWeekend) return rand > 0.2 ? adminDay : fullDay;
      return null; // Often off on weekends or one day

    case "barista":
    case "barman":
      return eveningShift;

    default:
      return morningShift;
  }
}

function calculateShiftDuration(shift: Shift | null): number {
  if (!shift) return 0;
  const start = parseInt(shift.start.split(":")[0]);
  const end = parseInt(shift.end.split(":")[0]);
  
  // Gestion basique minuit (si fin < début, c'est le lendemain)
  if (end < start) {
    return (24 - start) + end;
  }
  return end - start;
}

function calculateWeeklyHours(shifts: (Shift | null)[]): number {
  return shifts.reduce((total, shift) => total + calculateShiftDuration(shift), 0);
}

