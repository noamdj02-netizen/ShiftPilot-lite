"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase/client";
import { Clock, Calendar, User, MapPin, Filter, Plus } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function ShiftsPage() {
  const { employees } = useEmployees();
  const [shifts, setShifts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    employee: "all",
    status: "all",
  });

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .single();

      const profile = profileData as { organization_id: string | null } | null;

      if (!profile?.organization_id) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("shifts")
        .select("*")
        .eq("organization_id", profile.organization_id)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) {
        console.error("Error fetching shifts:", error);
      } else {
        setShifts(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredShifts = shifts.filter((shift) => {
    if (filter.employee !== "all" && shift.employee_id !== filter.employee) {
      return false;
    }
    return true;
  });

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}h${minutes}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground">
            Shifts
          </h1>
          <p className="text-foreground-muted dark:text-dark-foreground-muted mt-1">
            Gérez tous vos shifts
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau shift
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-foreground-muted dark:text-dark-foreground-muted" />
          <div className="flex gap-4 flex-1">
            <div className="flex-1 max-w-xs">
              <Label htmlFor="filter_employee" className="text-xs mb-1 block">
                Employé
              </Label>
              <Select
                value={filter.employee}
                onValueChange={(value) => setFilter({ ...filter, employee: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les employés</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.first_name && emp.last_name
                        ? `${emp.first_name} ${emp.last_name}`
                        : emp.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Shifts List */}
      {isLoading ? (
        <Card className="p-12 text-center">
          <p className="text-foreground-muted dark:text-dark-foreground-muted">
            Chargement...
          </p>
        </Card>
      ) : filteredShifts.length === 0 ? (
        <Card className="p-12 text-center">
          <Clock className="h-12 w-12 text-foreground-muted dark:text-dark-foreground-muted mx-auto mb-4" />
          <p className="text-foreground-muted dark:text-dark-foreground-muted mb-4">
            Aucun shift pour le moment
          </p>
          <Button variant="primary" href="/dashboard/planning">
            Créer un planning
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShifts.map((shift) => {
            const employee = employees.find((emp) => emp.id === shift.employee_id);
            return (
              <Card key={shift.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="font-medium text-foreground dark:text-dark-foreground">
                        {formatDate(shift.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground-muted dark:text-dark-foreground-muted">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                      </span>
                    </div>
                  </div>
                </div>
                {employee && (
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-foreground-muted dark:text-dark-foreground-muted" />
                    <span className="text-sm text-foreground dark:text-dark-foreground">
                      {employee.first_name && employee.last_name
                        ? `${employee.first_name} ${employee.last_name}`
                        : employee.email}
                    </span>
                  </div>
                )}
                {shift.position && (
                  <div className="flex items-center gap-2 text-sm text-foreground-muted dark:text-dark-foreground-muted">
                    <MapPin className="h-4 w-4" />
                    <span>{shift.position}</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
