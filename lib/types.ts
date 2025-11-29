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
  first_name?: string
  last_name?: string
  role: string
  department?: string
  avatar: string
  color?: string
  initials?: string
  hours: number
  status: 'Actif' | 'Inactif' | 'En congés' | string
  type?: 'CDI' | 'CDD' | 'Extra' | string
  joined?: string
  statusColor: string
}

export interface Shift {
  id?: string
  start: string
  end: string
  type: 'work' | 'off' | 'admin' | 'kitchen'
  label?: string
}

export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  role: 'admin' | 'manager' | 'employee'
  preferences?: {
    theme?: 'light' | 'dark' | 'system'
    notifications?: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
}

export interface Organization {
  id: string
  name: string
  slug: string
  siret?: string
  address?: string
  settings?: {
    timezone: string
    currency: string
  }
}

export interface Subscription {
  id: string
  plan: 'starter' | 'professional' | 'business' | 'enterprise'
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
  current_period_end: string
  cancel_at_period_end: boolean
}

export interface Invoice {
  id: string
  number: string
  amount_due: number
  amount_paid: number
  status: 'paid' | 'open' | 'void' | 'uncollectible'
  created: number
  invoice_pdf: string
}

export interface PaymentMethod {
  id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
}
