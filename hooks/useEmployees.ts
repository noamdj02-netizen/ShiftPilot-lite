"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Employee } from "@/lib/types"; // Assuming types are here

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data.employees || data); // Handle both {employees: []} and [] formats
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const createEmployee = async (employeeData: any) => {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create employee");
    }

    const newEmployee = await response.json();
    setEmployees((prev) => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = async (id: string, updates: any) => {
    const response = await fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update employee");
    }

    const updatedEmployee = await response.json();
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
    );
    return updatedEmployee;
  };

  const deleteEmployee = async (id: string) => {
    const response = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete employee");
    }

    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return {
    employees,
    isLoading,
    error,
    refetch: fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
