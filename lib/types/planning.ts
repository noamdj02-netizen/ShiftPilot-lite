export type TrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type WeatherCode = 
  | 'CLEAR' // 800
  | 'CLOUDS' // 80x
  | 'RAIN' // 5xx
  | 'DRIZZLE' // 3xx
  | 'THUNDERSTORM' // 2xx
  | 'SNOW' // 6xx
  | 'MIST' // 7xx
  | 'UNKNOWN';

export type ConstraintType = 
  | 'NO_NIGHT' 
  | 'NO_MORNING' 
  | 'NO_DOUBLE_SHIFT' 
  | 'MAX_DAYS_ROW' 
  | 'SPECIFIC_OFF';

export type ContractType = 
  | 'CDI' 
  | 'CDD' 
  | 'EXTRA' 
  | 'TEMPS_PARTIEL' 
  | 'STAGIAIRE' 
  | 'APPRENTI';

export interface EmployeeConstraint {
  id: string;
  profile_id: string;
  type: ConstraintType;
  value?: any;
  is_active: boolean;
}

export interface ShiftTemplate {
  id: string;
  organization_id: string;
  establishment_id?: string;
  label: string;
  day_of_week: number; // 0-6
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  min_staff: number;
  max_staff: number;
  required_roles: Record<string, number>; // e.g. { "Serveur": 2 }
  is_active: boolean;
}

export interface WeatherForecast {
  id: string;
  establishment_id: string;
  date: string; // YYYY-MM-DD
  weather_code: number;
  temperature_min: number;
  temperature_max: number;
  rain_probability: number;
  wind_speed: number;
  is_terrasse_friendly: boolean;
  traffic_level_estimate: TrafficLevel;
}

export interface TimeOffRequest {
  id: string;
  profile_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ScheduleGenerationParams {
  organizationId: string;
  establishmentId?: string;
  startDate: string; // YYYY-MM-DD (Monday)
  useWeather?: boolean;
}

export interface GeneratedShift {
  id?: string; // Optional if draft
  profile_id: string;
  date: string;
  start_time: string;
  end_time: string;
  role: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CONFIRMED';
  source: 'AUTO_GENERATED' | 'MANUAL';
  weather_adjusted?: boolean;
}

export interface EmployeeSummary {
  employeeId: string;
  name: string;
  totalHours: number;
  contractHours?: number;
  deviation: number;
  shiftCount: number;
}

export interface GeneratedScheduleResult {
  weekStart: string;
  weekEnd: string;
  shifts: GeneratedShift[];
  summary: {
    employeesHours: EmployeeSummary[];
    alerts: string[];
    weatherAdjustments: string[];
  };
}

export interface WeatherForecastInput {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  pop: number; // Probability of precipitation
  wind_speed: number;
}

