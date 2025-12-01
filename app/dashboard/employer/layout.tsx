import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EmployerDashboardClient } from './EmployerDashboardClient';

export default async function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login/employer');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, organizations(name, slug)')
    .eq('id', user.id)
    .single();

  // Ne pas rediriger - laisser la page afficher le formulaire d'onboarding si nécessaire
  // Le formulaire sera affiché directement dans /dashboard/employer si organization_id est null

  return (
    <EmployerDashboardClient profile={profile}>
      {children}
    </EmployerDashboardClient>
  );
}
