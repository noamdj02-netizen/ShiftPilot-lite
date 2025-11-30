"use client";

import { useState, useEffect, useCallback } from "react";
import { Shift } from "@/lib/types";

export function useShifts(startDate?: Date, endDate?: Date) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShifts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url = "/api/shifts";
      const params = new URLSearchParams();
      if (startDate) params.append("start", startDate.toISOString());
      if (endDate) params.append("end", endDate.toISOString());
      
      if (startDate || endDate) {
          url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch shifts");
      }
      const data = await response.json();
      // Ensure data is an array
      setShifts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const createShift = async (shiftData: any) => {
    const response = await fetch("/api/shifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shiftData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create shift");
    }

    const newShift = await response.json();
    setShifts((prev) => [...prev, newShift]);
    return newShift;
  };

  const updateShift = async (id: string, updates: any) => {
    const response = await fetch(`/api/shifts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update shift");
    }

    const updatedShift = await response.json();
    setShifts((prev) =>
      prev.map((shift) => (shift.id === id ? updatedShift : shift))
    );
    return updatedShift;
  };

  const deleteShift = async (id: string) => {
    const response = await fetch(`/api/shifts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete shift");
    }

    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  };

  return {
    shifts,
    isLoading,
    error,
    refetch: fetchShifts,
    createShift,
    updateShift,
    deleteShift,
  };
}

