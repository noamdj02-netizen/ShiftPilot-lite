// Types pour les services IA (PilotBot, PilotReview, PilotSMS)
// Ces types complètent les types générés depuis Supabase

export interface ChatbotFAQ {
  id: string;
  organization_id: string;
  question: string;
  answer: string;
  category?: 'horaires' | 'menu' | 'reservation' | 'general';
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatbotConversation {
  id: string;
  organization_id: string;
  channel: 'instagram' | 'facebook' | 'website' | 'whatsapp';
  customer_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  status: 'active' | 'resolved' | 'escalated';
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChatbotMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ReviewRequest {
  id: string;
  organization_id: string;
  establishment_id?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  visit_date?: string;
  channel: 'sms' | 'email';
  message_template?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sent_at?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface Review {
  id: string;
  organization_id: string;
  establishment_id?: string;
  google_review_id?: string;
  customer_name?: string;
  rating: number;
  comment?: string;
  review_date?: string;
  response_text?: string;
  response_date?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SMSMessage {
  id: string;
  organization_id: string;
  profile_id?: string;
  phone_number: string;
  message: string;
  type: 'planning_published' | 'shift_reminder' | 'absence_alert' | 'custom';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  twilio_sid?: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  created_at: string;
}

export interface SMSTemplate {
  id: string;
  organization_id: string;
  name: string;
  type: 'planning_published' | 'shift_reminder' | 'absence_alert' | 'custom';
  template: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Types pour les réponses API
export interface PlanningGenerationRequest {
  week_start: string; // YYYY-MM-DD
  mode: 'balanced' | 'economic' | 'staff_priority';
  constraints?: {
    max_hours_per_employee?: number;
    min_hours_per_employee?: number;
    preferred_shifts?: string[];
    unavailable_employees?: string[];
  };
}

export interface PlanningGenerationResponse {
  shifts: Array<{
    profile_id: string;
    date: string;
    start_time: string;
    end_time: string;
    position_id?: string;
  }>;
  explanation: string;
  total_hours: number;
  employee_hours: Record<string, number>;
}

export interface ChatbotMessageRequest {
  conversation_id?: string;
  channel: 'instagram' | 'facebook' | 'website' | 'whatsapp';
  customer_id?: string;
  customer_name?: string;
  message: string;
}

export interface ChatbotMessageResponse {
  conversation_id: string;
  message: string;
  confidence: number;
  suggested_actions?: Array<{
    type: 'reservation' | 'info' | 'escalate';
    data?: Record<string, any>;
  }>;
}

export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  rating_distribution: Record<number, number>;
  reviews_this_month: number;
  reviews_last_month: number;
  growth_percentage: number;
  response_rate: number;
}

export interface SMSStatus {
  message_id: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  twilio_sid?: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
}

