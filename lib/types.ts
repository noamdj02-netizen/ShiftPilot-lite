export enum AppRoute {
  LANDING = '/',
  DASHBOARD = '/dashboard',
  PLANNING = '/dashboard/planning',
  EMPLOYEES = '/dashboard/employees',
  COMPLIANCE = '/dashboard/compliance',
  AVAILABILITIES = '/dashboard/availabilities',
}

export interface Employee {
  id: string
  restaurant_id?: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  role: string
  department?: string
  avatar?: string
  color?: string
  initials?: string
  contract_type?: string
  weekly_hours?: number
  status: 'active' | 'inactive' | 'vacation' | string
  joined_at?: string
  
  // Legacy/UI helpers
  name?: string
  hours?: number
  statusColor?: string
}

export interface Shift {
  id?: string
  employee_id?: string
  start_time?: string
  end_time?: string
  role?: string
  notes?: string
  
  // UI types
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
  role: 'admin' | 'manager' | 'employee' | 'employer'
  restaurant_id?: string
  organization_id?: string // Deprecated?
  preferences?: {
    theme?: 'light' | 'dark' | 'system'
    notifications?: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
}

export interface Restaurant {
  id: string
  name: string
  address?: string
  phone?: string
  settings?: any
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
