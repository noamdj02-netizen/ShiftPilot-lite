import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function EmployerOnboardingPage() {
  // Rediriger vers le dashboard où le formulaire sera affiché
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login/employer')
  }
  
  redirect('/dashboard/employer')
}
