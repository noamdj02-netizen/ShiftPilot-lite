'use client'

import { useState, useEffect } from 'react';
import { ScheduleGenerator } from './ScheduleGenerator';
import { WeatherForecastDisplay } from './WeatherForecast';
import { useWeather } from '@/hooks/useWeather';
import { GeneratedScheduleResult } from '@/lib/types/planning';

export default function ScheduleWeekView() {
  // Demo state
  const startDate = new Date(); // Today, should be start of week
  const [forecasts, setForecasts] = useState<any[]>([]);
  const { syncWeather } = useWeather();

  useEffect(() => {
    // Load weather on mount
    // Need real establishment ID
    const loadWeather = async () => {
      const data = await syncWeather('est-id-placeholder');
      if (data) setForecasts(data);
    };
    loadWeather();
  }, []);

  const handleGenerated = (result: GeneratedScheduleResult) => {
    console.log("Generated", result);
    // Here you would update the local calendar view state
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Planning Intelligent</h2>
          <p className="text-slate-400">Génération assistée par IA et Météo</p>
        </div>
      </div>

      <WeatherForecastDisplay forecasts={forecasts} />
      
      <ScheduleGenerator 
        startDate={startDate} 
        onGenerated={handleGenerated} 
      />

      {/* 
        Below would be the existing PlanningGrid component 
        fed with either currentSchedule or generatedSchedule.shifts 
      */}
      <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl text-slate-500">
        [Grille de planning existante à intégrer ici]
      </div>
    </div>
  );
}

