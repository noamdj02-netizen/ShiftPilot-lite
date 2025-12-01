import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { DashboardOverview } from "@/components/dashboard/employer/DashboardOverview";

export default async function EmployerDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  // Si pas d'organisation, afficher le formulaire d'onboarding
  if (!profile?.organization_id) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <OnboardingForm />
      </div>
    );
  }

  // Sinon, afficher le dashboard normal
  return <DashboardOverview organizationId={profile.organization_id} />;
}
