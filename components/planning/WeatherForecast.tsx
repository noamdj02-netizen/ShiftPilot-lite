import { WeatherForecast } from "@/lib/types/planning";

interface WeatherForecastProps {
  forecasts: Partial<WeatherForecast>[];
}

export function WeatherForecastDisplay({ forecasts }: WeatherForecastProps) {
  if (!forecasts || forecasts.length === 0) return null;

  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {forecasts.map((day, idx) => (
        <div 
          key={idx}
          className={`p-2 rounded-xl border text-center flex flex-col items-center justify-between min-h-[80px] ${
            day.traffic_level_estimate === 'HIGH' 
              ? 'bg-gradient-to-b from-orange-50 to-white dark:from-orange-900/20 dark:to-[#1C1C1E] border-orange-200 dark:border-orange-800' 
              : 'bg-white dark:bg-[#1C1C1E] border-slate-200 dark:border-white/5'
          }`}
        >
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(day.date!).toLocaleDateString('fr-FR', { weekday: 'short' })}
          </span>
          
          <div className="flex flex-col items-center">
            {/* Weather Icon Placeholder - could use real icons based on code */}
            <span className="material-symbols-outlined text-slate-700 dark:text-white">
              {day.weather_code === 800 ? 'sunny' : day.weather_code! > 800 ? 'cloud' : 'rainy'}
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {Math.round(day.temperature_max!)}°
            </span>
          </div>

          <div className="flex gap-1 mt-1">
            {day.is_terrasse_friendly && (
              <span className="w-2 h-2 rounded-full bg-green-500" title="Terrasse Friendly"></span>
            )}
            {day.traffic_level_estimate === 'HIGH' && (
              <span className="w-2 h-2 rounded-full bg-orange-500" title="High Traffic"></span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

