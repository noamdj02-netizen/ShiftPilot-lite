import { useState } from 'react';
import { toast } from 'sonner';

export function useWeather() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncWeather = async (establishmentId: string) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/weather/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ establishmentId }),
      });

      if (!response.ok) throw new Error('Failed to sync weather');
      
      const data = await response.json();
      toast.success('Météo synchronisée !');
      return data.forecasts;
    } catch (error) {
      console.error(error);
      toast.error('Erreur de synchronisation météo');
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isSyncing,
    syncWeather
  };
}

