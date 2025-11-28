"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/api";

export function useEmployees() {
  const [employees, setEmployees] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const fetchEmployees = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        return;
      }

      // Récupérer l'organization_id du profil
      const { data: profile } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .single();

      const profileData = profile as { organization_id: string | null } | null;

      if (!profileData?.organization_id) {
        setIsLoading(false);
        return;
      }

      // Récupérer tous les employés de l'organisation
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("organization_id", profileData.organization_id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
        return;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async (employeeData: {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    role?: "owner" | "manager" | "employee";
    hourly_rate?: number;
  }) => {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create employee");
    }

    const { employee } = await response.json();
    await fetchEmployees();
    return employee;
  };

  const updateEmployee = async (
    employeeId: string,
    updates: Partial<Profile>
  ) => {
    const { data, error } = await (supabase
      .from("profiles") as any)
      .update(updates)
      .eq("id", employeeId)
      .select()
      .single();

    if (error) throw error;

    await fetchEmployees();
    return data;
  };

  const deleteEmployee = async (employeeId: string) => {
    const { error } = await (supabase
      .from("profiles") as any)
      .update({ is_active: false })
      .eq("id", employeeId);

    if (error) throw error;

    await fetchEmployees();
  };

  return {
    employees,
    isLoading,
    refetch: fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

