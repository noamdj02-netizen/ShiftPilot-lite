import { Shift, Employee } from "@/lib/types";

interface PlanningRules {
  maxHoursPerDay: number;
  maxHoursPerWeek: number;
  minRestHours: number;
  openingHour: number;
  closingHour: number;
  // Besoins en personnel par service
  staffingNeeds: {
    midi: { min: number; ideal: number }; // Nombre de personnes nécessaires pour le service midi
    soir: { min: number; ideal: number };
  };
}

const DEFAULT_RULES: PlanningRules = {
  maxHoursPerDay: 10,
  maxHoursPerWeek: 35,
  minRestHours: 11,
  openingHour: 9,
  closingHour: 23,
  staffingNeeds: {
    midi: { min: 2, ideal: 3 },
    soir: { min: 3, ideal: 4 },
  },
};

interface EmployeeAvailability {
  employee: Employee;
  weeklyHours: number;
  dailyHours: Record<number, number>; // Jour de la semaine (0-6) -> heures
  canWork: (dayIndex: number, service: 'midi' | 'soir') => boolean;
}

// Horaires types par service
const SHIFT_TEMPLATES = {
  midi: { start: "11:00", end: "15:00" }, // 4h
  soir: { start: "18:00", end: "23:00" }, // 5h
  complet: { start: "11:00", end: "23:00" }, // 12h avec pause
  preparation: { start: "08:00", end: "14:00" }, // 6h pour cuisine
};

// Rôles et leurs services préférés
const ROLE_PREFERENCES: Record<string, { services: ('midi' | 'soir')[], shiftType: string }> = {
  'Serveur': { services: ['midi', 'soir'], shiftType: 'work' },
  'Serveuse': { services: ['midi', 'soir'], shiftType: 'work' },
  'Barman': { services: ['soir'], shiftType: 'work' },
  'Barmaid': { services: ['soir'], shiftType: 'work' },
  'Chef cuisinier': { services: ['midi', 'soir'], shiftType: 'kitchen' },
  'Commis': { services: ['midi', 'soir'], shiftType: 'kitchen' },
  'Chef de rang': { services: ['midi', 'soir'], shiftType: 'work' },
  'Manager': { services: ['midi', 'soir'], shiftType: 'admin' },
};

export async function generateSmartPlanning(
  employees: Employee[],
  existingShifts: Record<string, (Shift | null)[] | Shift[]>,
  startDate: Date
): Promise<Record<string, (Shift | null)[]>> {
  try {
    // Vérifier que employees est défini et non vide
    if (!employees || !Array.isArray(employees) || employees.length === 0) {
      throw new Error('Aucun employé disponible pour générer le planning');
    }

    // Filtrer uniquement les employés actifs
    const activeEmployees = employees.filter(emp => emp && emp.status === 'active');
    
    if (activeEmployees.length === 0) {
      throw new Error('Aucun employé actif disponible pour générer le planning');
    }

    // Simuler un temps de calcul pour l'effet "IA" (progression)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Initialiser le planning avec les shifts existants
    const newShifts: Record<string, (Shift | null)[]> = {};
    const daysOfWeek = 7;

    // Initialiser pour chaque employé actif
    activeEmployees.forEach((employee) => {
      if (!employee || !employee.id) return;
      
      const existing = existingShifts[employee.id];
      if (existing && Array.isArray(existing)) {
        // Nettoyer les valeurs null et s'assurer qu'on a 7 jours
        const cleaned = existing.map(s => s || null).slice(0, daysOfWeek);
        while (cleaned.length < daysOfWeek) {
          cleaned.push(null);
        }
        newShifts[employee.id] = cleaned;
      } else {
        newShifts[employee.id] = new Array(daysOfWeek).fill(null);
      }
    });

    // Créer les profils de disponibilité pour chaque employé
    const availability: EmployeeAvailability[] = activeEmployees
      .filter(emp => emp && emp.id && newShifts[emp.id])
      .map(emp => {
        const shifts = newShifts[emp.id] || [];
        const weeklyHours = calculateWeeklyHours(shifts);
        const dailyHours: Record<number, number> = {};
        
        // Calculer les heures par jour
        for (let i = 0; i < daysOfWeek; i++) {
          const shift = shifts[i];
          dailyHours[i] = shift ? calculateShiftDuration(shift) : 0;
        }

    return {
      employee: emp,
      weeklyHours,
      dailyHours,
      canWork: (dayIndex: number, service: 'midi' | 'soir') => {
        // Vérifier si l'employé est actif
        if (emp.status !== 'active') return false;

        // Vérifier les heures max par jour
        const currentDayHours = dailyHours[dayIndex] || 0;
        if (currentDayHours >= DEFAULT_RULES.maxHoursPerDay) return false;

        // Vérifier les heures max par semaine
        const maxHours = emp.weekly_hours || emp.hours || DEFAULT_RULES.maxHoursPerWeek;
        if (weeklyHours >= maxHours) return false;

        // Vérifier le repos entre shifts (si shift la veille)
        if (dayIndex > 0) {
          const prevShift = newShifts[emp.id]?.[dayIndex - 1];
          if (prevShift && service === 'midi') {
            const prevEnd = parseTime(prevShift.end);
            const midiStart = parseTime(SHIFT_TEMPLATES.midi.start);
            // Si le shift précédent finit après 22h, on ne peut pas faire midi le lendemain
            if (prevEnd >= 22) return false;
          }
        }

        // Vérifier si l'employé a déjà un shift ce jour
        const existingShift = newShifts[emp.id]?.[dayIndex];
        if (existingShift) {
          // Peut faire un double shift (midi + soir) si pas trop d'heures
          if (service === 'soir' && currentDayHours < 6) return true;
          return false;
        }

        // Vérifier les préférences de rôle
        const rolePrefs = ROLE_PREFERENCES[emp.role] || { services: ['midi', 'soir'], shiftType: 'work' };
        if (!rolePrefs.services.includes(service)) return false;

        return true;
      },
    };
      });

  // Générer le planning jour par jour
  for (let dayIndex = 0; dayIndex < daysOfWeek; dayIndex++) {
    const dayName = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][dayIndex];
    const isWeekend = dayIndex >= 5;
    
    // Optionnel : Lundi fermé (peut être configuré)
    // if (dayIndex === 0) continue;

    // Générer les shifts pour le service midi
    await assignShiftsForService(dayIndex, 'midi', availability, newShifts, isWeekend);

    // Générer les shifts pour le service soir
    await assignShiftsForService(dayIndex, 'soir', availability, newShifts, isWeekend);
  }

    // S'assurer que tous les employés ont un array de 7 jours
    activeEmployees.forEach((employee) => {
      if (!employee || !employee.id) return;
      if (!newShifts[employee.id] || newShifts[employee.id].length !== daysOfWeek) {
        newShifts[employee.id] = new Array(daysOfWeek).fill(null);
      }
    });

    return newShifts;
  } catch (error) {
    console.error('Error in generateSmartPlanning:', error);
    throw error instanceof Error ? error : new Error('Erreur inconnue lors de la génération du planning');
  }
}

async function assignShiftsForService(
  dayIndex: number,
  service: 'midi' | 'soir',
  availability: EmployeeAvailability[],
  shifts: Record<string, (Shift | null)[]>,
  isWeekend: boolean
) {
  try {
    const needs = service === 'midi' 
      ? DEFAULT_RULES.staffingNeeds.midi 
      : DEFAULT_RULES.staffingNeeds.soir;

    // Ajuster les besoins pour le weekend
    const targetCount = isWeekend ? needs.ideal + 1 : needs.ideal;
    let assignedCount = 0;

    // Compter les shifts déjà assignés pour ce service
    availability.forEach(avail => {
      if (!avail || !avail.employee || !avail.employee.id) return;
      const shift = shifts[avail.employee.id]?.[dayIndex];
      if (shift) {
        const shiftService = getShiftService(shift);
        if (shiftService === service) assignedCount++;
      }
    });

    // Trier les employés par priorité
    const candidates = availability
      .filter(avail => avail && avail.employee && avail.employee.id && avail.canWork(dayIndex, service))
      .sort((a, b) => {
        // Prioriser ceux qui ont moins d'heures cette semaine
        if (a.weeklyHours !== b.weeklyHours) {
          return a.weeklyHours - b.weeklyHours;
        }
        // Prioriser ceux qui ont moins d'heures aujourd'hui
        const aDayHours = a.dailyHours[dayIndex] || 0;
        const bDayHours = b.dailyHours[dayIndex] || 0;
        return aDayHours - bDayHours;
      });

    // Assigner les shifts jusqu'à atteindre le nombre cible
    for (const candidate of candidates) {
      if (assignedCount >= targetCount) break;
      if (!candidate || !candidate.employee || !candidate.employee.id) continue;
      if (!candidate.canWork(dayIndex, service)) continue;

      const shift = createShiftForService(service, candidate.employee.role || 'Serveur');
      if (shift) {
        if (!shifts[candidate.employee.id]) {
          shifts[candidate.employee.id] = new Array(7).fill(null);
        }
        shifts[candidate.employee.id][dayIndex] = shift;
        assignedCount++;
        
        // Mettre à jour les heures
        candidate.weeklyHours += calculateShiftDuration(shift);
        candidate.dailyHours[dayIndex] = (candidate.dailyHours[dayIndex] || 0) + calculateShiftDuration(shift);
      }
    }
  } catch (error) {
    console.error(`Error assigning shifts for ${service} on day ${dayIndex}:`, error);
    // Ne pas throw pour ne pas bloquer tout le processus
  }
}

function createShiftForService(service: 'midi' | 'soir', role: string): Shift | null {
  const template = SHIFT_TEMPLATES[service];
  const rolePrefs = ROLE_PREFERENCES[role] || { services: ['midi', 'soir'], shiftType: 'work' };

  // Ajuster les horaires selon le rôle
  let start = template.start;
  let end = template.end;

  // Cuisine commence plus tôt
  if (rolePrefs.shiftType === 'kitchen') {
    if (service === 'midi') {
      start = "08:00";
      end = "14:00";
    } else {
      start = "16:00";
      end = "23:00";
    }
  }

  return {
    id: `auto-${Date.now()}-${Math.random()}`,
    start,
    end,
    type: rolePrefs.shiftType as 'work' | 'kitchen' | 'admin',
    label: `Service ${service === 'midi' ? 'midi' : 'soir'}`,
  };
}

function getShiftService(shift: Shift): 'midi' | 'soir' | null {
  if (!shift) return null;
  const startHour = parseTime(shift.start);
  if (startHour >= 8 && startHour < 15) return 'midi';
  if (startHour >= 15 && startHour < 20) return 'soir';
  return null;
}

function parseTime(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  try {
    const [hours] = timeStr.split(':').map(Number);
    return isNaN(hours) ? 0 : hours;
  } catch (error) {
    console.error('Error parsing time:', error, timeStr);
    return 0;
  }
}

function calculateShiftDuration(shift: Shift | null): number {
  if (!shift || !shift.start || !shift.end) return 0;
  try {
    const start = parseTime(shift.start);
    const end = parseTime(shift.end);
    
    if (isNaN(start) || isNaN(end)) return 0;
    
    if (end < start) {
      return (24 - start) + end;
    }
    return end - start;
  } catch (error) {
    console.error('Error calculating shift duration:', error, shift);
    return 0;
  }
}

function calculateWeeklyHours(shifts: (Shift | null)[]): number {
  if (!shifts || !Array.isArray(shifts)) return 0;
  return shifts.reduce((total, shift) => {
    if (!shift) return total;
    return total + calculateShiftDuration(shift);
  }, 0);
}
