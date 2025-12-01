import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

async function DashboardOverview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  const orgId = profile?.organization_id;

  // Fetch stats
  const { count: employeeCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', orgId)
    .eq('is_active', true);

  const today = new Date().toISOString().split('T')[0];
  const { count: shiftsCount } = await supabase
    .from('shifts')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', orgId)
    .eq('date', today);

  const { count: pendingTimeOff } = await supabase
    .from('time_off_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Vue d'ensemble</h1>
        <p className="text-slate-400">Bienvenue sur votre espace de gestion.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Employés actifs" 
          value={employeeCount || 0} 
          icon="group" 
          trend="+2 ce mois"
        />
        <StatCard 
          title="Shifts aujourd'hui" 
          value={shiftsCount || 0} 
          icon="event" 
          color="text-[#6C63FF]"
        />
        <StatCard 
          title="Heures planifiées" 
          value="142h" 
          icon="schedule" 
          subtitle="Cette semaine"
        />
        <StatCard 
          title="Demandes congés" 
          value={pendingTimeOff || 0} 
          icon="beach_access" 
          alert={pendingTimeOff ? true : false}
        />
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 gap-4">
                <QuickAction label="Ajouter un employé" icon="person_add" href="/dashboard/employer/employees" />
                <QuickAction label="Créer un planning" icon="calendar_add_on" href="/dashboard/employer/planning" />
                <QuickAction label="Envoyer un message" icon="send" href="/dashboard/employer/messages" />
                <QuickAction label="Valider les congés" icon="check_circle" href="/dashboard/employer/timeoff" />
            </div>
        </div>
        
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
            <h3 className="text-lg font-semibold mb-4">Aperçu Planning (Aujourd'hui)</h3>
            {/* Placeholder for a mini shift list */}
            <div className="flex flex-col items-center justify-center h-40 text-slate-500 border border-dashed border-white/10 rounded-xl">
                <span className="material-symbols-outlined mb-2">calendar_view_day</span>
                Aucun shift prévu ou chargement...
            </div>
        </div>
      </div>
    </div>
  );
}

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
  return <DashboardOverview />;
}

function StatCard({ title, value, icon, trend, subtitle, color, alert }: any) {
    return (
        <div className="bg-[#1C1C1E] p-4 sm:p-5 lg:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                    <span className={`material-symbols-outlined ${color || ''}`}>{icon}</span>
                </div>
                {trend && <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{trend}</span>}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-sm text-slate-400">{title}</p>
            {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
        </div>
    )
}

function QuickAction({ label, icon, href }: any) {
    return (
        <a href={href} className="flex flex-col items-center justify-center p-4 bg-black/20 rounded-xl hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] transition-all cursor-pointer border border-transparent hover:border-[#6C63FF]/20">
            <span className="material-symbols-outlined mb-2 text-2xl">{icon}</span>
            <span className="text-sm font-medium text-center">{label}</span>
        </a>
    )
}
