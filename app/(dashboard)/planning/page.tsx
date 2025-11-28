"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Plus, Download, Share2 } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";

export default function PlanningPage() {
  const { employees, isLoading } = useEmployees();
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const weekStart = new Date(selectedWeek);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    weekDays.push(date);
  }

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  const handleToday = () => {
    setSelectedWeek(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground">
            Planning
          </h1>
          <p className="text-foreground-muted dark:text-dark-foreground-muted mt-1">
            Gérez vos plannings hebdomadaires
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreviousWeek}>
            ← Semaine précédente
          </Button>
          <Button variant="outline" onClick={handleToday}>
            Aujourd'hui
          </Button>
          <Button variant="outline" onClick={handleNextWeek}>
            Semaine suivante →
          </Button>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau shift
          </Button>
        </div>
      </div>

      {/* Week selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-accent" />
            <span className="font-medium text-foreground dark:text-dark-foreground">
              Semaine du {weekStart.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </Card>

      {/* Planning grid */}
      {isLoading ? (
        <Card className="p-12 text-center">
          <p className="text-foreground-muted dark:text-dark-foreground-muted">
            Chargement...
          </p>
        </Card>
      ) : employees.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-foreground-muted dark:text-dark-foreground-muted mb-4">
            Aucun employé pour créer un planning
          </p>
          <Button variant="primary" href="/dashboard/employees">
            Ajouter des employés
          </Button>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-dark-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground dark:text-dark-foreground">
                    Employé
                  </th>
                  {weekDays.map((day, i) => (
                    <th
                      key={i}
                      className="text-center py-3 px-4 font-medium text-foreground dark:text-dark-foreground min-w-[120px]"
                    >
                      <div>{days[i]}</div>
                      <div className="text-xs text-foreground-muted dark:text-dark-foreground-muted font-normal">
                        {day.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((emp) => emp.is_active !== false)
                  .map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-border dark:border-dark-border hover:bg-background-secondary dark:hover:bg-dark-background-secondary"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground dark:text-dark-foreground">
                          {employee.first_name && employee.last_name
                            ? `${employee.first_name} ${employee.last_name}`
                            : employee.email}
                        </div>
                      </td>
                      {weekDays.map((day, i) => (
                        <td key={i} className="py-3 px-4 text-center">
                          <div className="min-h-[40px] flex items-center justify-center">
                            <button
                              className="w-full h-8 rounded border border-dashed border-border dark:border-dark-border hover:border-accent hover:bg-accent/5 transition-colors text-xs text-foreground-muted dark:text-dark-foreground-muted hover:text-accent"
                              onClick={() => {
                                // TODO: Ouvrir dialog pour créer un shift
                                alert(`Créer un shift pour ${employee.first_name || employee.email} le ${day.toLocaleDateString("fr-FR")}`);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
