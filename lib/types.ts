export enum AppRoute {
  LANDING = '/',
  DASHBOARD = '/dashboard',
  PLANNING = '/planning',
  EMPLOYEES = '/employees',
  COMPLIANCE = '/compliance',
  AVAILABILITIES = '/availabilities',
}

export interface Employee {
  id: string
  name: string
  role: string
  department?: string
  avatar: string
  hours: number
  status: 'Actif' | 'Inactif' | 'En congés'
  type?: 'CDI' | 'CDD' | 'Extra'
  joined?: string
  statusColor: string
}

export interface Shift {
  id: string
  start: string
  end: string
  type: 'work' | 'off' | 'admin' | 'kitchen'
}

