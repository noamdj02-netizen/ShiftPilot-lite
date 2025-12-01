import { useState, useCallback } from 'react';
import { GeneratedScheduleResult, ScheduleGenerationParams } from '@/lib/types/planning';
import { toast } from 'sonner';

export function useSchedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<GeneratedScheduleResult | null>(null);
  const [currentSchedule, setCurrentSchedule] = useState<any[]>([]);

  const generateSchedule = useCallback(async (params: ScheduleGenerationParams) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate schedule');
      }

      const result = await response.json();
      setGeneratedSchedule(result);
      toast.success('Planning généré avec succès !');
      return result;
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la génération');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const commitSchedule = useCallback(async (
    organizationId: string, 
    establishmentId: string | undefined,
    shifts: any[], 
    status: 'DRAFT' | 'PUBLISHED' = 'DRAFT'
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          establishmentId,
          shifts,
          status
        }),
      });

      if (!response.ok) throw new Error('Failed to save schedule');
      
      toast.success('Planning sauvegardé !');
      // Optionally refresh current schedule here
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchWeekSchedule = useCallback(async (organizationId: string, startDate: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/schedule/week?organizationId=${organizationId}&startDate=${startDate}`);
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      setCurrentSchedule(data.shifts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    generatedSchedule,
    currentSchedule,
    generateSchedule,
    commitSchedule,
    fetchWeekSchedule,
    setGeneratedSchedule // to clear or modify manually
  };
}

