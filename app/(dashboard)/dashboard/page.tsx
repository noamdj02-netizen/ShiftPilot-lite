import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { Users, Calendar, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

async function getStats() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Récupérer le profil et l'organisation
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profileData) {
    return {
      activeEmployees: 0,
      weeklyShifts: 0,
      plannedHours: 0,
      coverageRate: 0,
      alerts: ["Vous devez créer une organisation pour commencer."],
    };
  }

  const organizationId: string | null = (profileData as { organization_id: string | null }).organization_id;

  if (!organizationId) {
    return {
      activeEmployees: 0,
      weeklyShifts: 0,
      plannedHours: 0,
      coverageRate: 0,
      alerts: ["Vous devez créer une organisation pour commencer."],
    };
  }

  // Compter les employés actifs
  const { count: activeEmployees } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .eq("is_active", true);

  // Compter les shifts de la semaine
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const { count: weeklyShifts } = await supabase
    .from("shifts")
    .select("*", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .gte("date", weekStart.toISOString().split("T")[0])
    .lte("date", weekEnd.toISOString().split("T")[0]);

  return {
    activeEmployees: activeEmployees || 0,
    weeklyShifts: weeklyShifts || 0,
    plannedHours: 0, // TODO: Calculer les heures planifiées
    coverageRate: 0, // TODO: Calculer le taux de couverture
    alerts: [] as string[],
  };
}

function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-muted dark:text-dark-foreground-muted">
            {title}
          </p>
          <p className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground mt-1">
            {value}
          </p>
          {trend !== undefined && (
            <p
              className={`text-xs mt-1 ${
                trend > 0
                  ? "text-success"
                  : trend < 0
                  ? "text-error"
                  : "text-foreground-muted dark:text-dark-foreground-muted"
              }`}
            >
              {trend > 0 ? "+" : ""}
              {trend}% vs semaine dernière
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-accent/10">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </Card>
  );
}

export default async function DashboardPage() {
  const stats = await getStats();

  if (!stats) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground">
          Tableau de bord
        </h1>
        <p className="text-foreground-muted dark:text-dark-foreground-muted mt-1">
          Bienvenue ! Voici un aperçu de votre semaine.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Employés actifs"
          value={stats.activeEmployees}
          icon={Users}
        />
        <StatsCard
          title="Shifts cette semaine"
          value={stats.weeklyShifts}
          icon={Calendar}
        />
        <StatsCard
          title="Heures planifiées"
          value={`${stats.plannedHours}h`}
          icon={Clock}
        />
        <StatsCard
          title="Taux de couverture"
          value={`${stats.coverageRate}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Alerts */}
      {stats.alerts.length > 0 && (
        <Card className="p-4 border-warning/20 bg-warning/10">
          <div className="flex items-center gap-2 text-warning mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Attention requise</span>
          </div>
          <ul className="space-y-1 text-sm text-foreground dark:text-dark-foreground">
            {stats.alerts.map((alert, i) => (
              <li key={i}>{alert}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-foreground dark:text-dark-foreground mb-2">
            Actions rapides
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              href="/dashboard/employees/add"
              className="w-full justify-start"
            >
              Ajouter un employé
            </Button>
            <Button
              variant="outline"
              size="sm"
              href="/dashboard/planning"
              className="w-full justify-start"
            >
              Créer un planning
            </Button>
            <Button
              variant="outline"
              size="sm"
              href="/dashboard/shifts"
              className="w-full justify-start"
            >
              Voir les shifts
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-heading font-semibold text-foreground dark:text-dark-foreground mb-2">
            Prochaines étapes
          </h3>
          <div className="space-y-2 text-sm text-foreground-muted dark:text-dark-foreground-muted">
            <p>1. Ajoutez vos employés</p>
            <p>2. Créez vos postes de travail</p>
            <p>3. Générez votre premier planning</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

