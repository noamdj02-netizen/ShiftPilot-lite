export interface Restaurant {
  id: string
  name: string
  type: string
  address: string
  siret: string
  convention: string
  phone: string
  email: string
}

export interface Collaborateur {
  id: string
  name: string
  role: string
  phone: string
  email: string
  contrat: 'CDI' | 'CDD' | 'Extra' | 'Apprenti' | 'Stage'
  heures: number
  color: string
  disponible: boolean
}

export interface Shift {
  id: string
  employeeId: string
  service: 'midi' | 'soir'
  start: string
  end: string
}

export interface Notification {
  id: number
  type: 'warning' | 'success' | 'info' | 'error'
  message: string
  time: string
  read: boolean
}

