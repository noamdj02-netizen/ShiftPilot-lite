import { WeatherForecast, TrafficLevel } from "@/lib/types/planning";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

interface Coordinates {
  lat: number;
  lon: number;
}

export class WeatherService {
  constructor() {}

  /**
   * Fetch 7-day forecast for given coordinates using Open-Meteo (free)
   */
  async getForecast(coords: Coordinates): Promise<Partial<WeatherForecast>[]> {
    try {
      // Open-Meteo API parameters:
      // - latitude, longitude
      // - daily: weathercode, temperature_2m_max, temperature_2m_min, precipitation_probability_max, windspeed_10m_max
      // - timezone: auto
      const url = `${BASE_URL}?latitude=${coords.lat}&longitude=${coords.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.normalizeForecastData(data.daily);
    } catch (error) {
      console.error("Failed to fetch weather data from Open-Meteo:", error);
      // Fallback to mock if API fails
      return this.getMockForecast();
    }
  }

  private normalizeForecastData(dailyData: any): Partial<WeatherForecast>[] {
    // Open-Meteo returns arrays for each property
    // { time: [...], weathercode: [...], ... }
    
    if (!dailyData || !dailyData.time) return [];

    return dailyData.time.slice(0, 8).map((dateStr: string, index: number) => {
      const weatherCode = dailyData.weathercode[index];
      const tempMax = dailyData.temperature_2m_max[index];
      const tempMin = dailyData.temperature_2m_min[index];
      const rainProb = dailyData.precipitation_probability_max[index];
      const windSpeed = dailyData.windspeed_10m_max[index];

      // Convert WMO code to internal logic if needed, or use directly
      // WMO codes are similar enough for basic classification
      
      const isTerrasseFriendly = this.calculateTerrasseFriendly(
        weatherCode,
        tempMax,
        windSpeed,
        rainProb
      );

      const trafficLevel = this.estimateTrafficLevel(
        dateStr,
        weatherCode,
        tempMax,
        isTerrasseFriendly
      );

      return {
        date: dateStr,
        weather_code: weatherCode,
        temperature_max: tempMax,
        temperature_min: tempMin,
        rain_probability: rainProb,
        wind_speed: windSpeed,
        is_terrasse_friendly: isTerrasseFriendly,
        traffic_level_estimate: trafficLevel
      };
    });
  }

  private calculateTerrasseFriendly(
    code: number,
    tempMax: number,
    windSpeed: number,
    rainProb: number
  ): boolean {
    // WMO Weather Codes (Open-Meteo)
    // 0: Clear sky
    // 1, 2, 3: Mainly clear, partly cloudy, overcast
    // 45, 48: Fog
    // 51, 53, 55: Drizzle
    // 61, 63, 65: Rain
    // 80, 81, 82: Rain showers
    // ...
    
    const isRaining = code >= 50; // Codes 50+ generally imply precipitation or worse
    const isWarmEnough = tempMax >= 15;
    const isNotWindy = windSpeed < 30; // km/h
    const isDry = rainProb < 30;

    return !isRaining && isWarmEnough && isNotWindy && isDry;
  }

  private estimateTrafficLevel(
    dateStr: string,
    code: number,
    tempMax: number,
    isTerrasse: boolean
  ): TrafficLevel {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0 = Sunday
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Fri/Sat

    let score = 0;

    // Weekend boost
    if (isWeekend) score += 2;
    
    // Terrasse boost
    if (isTerrasse) score += 2;

    // Good weather boost (0-3: Clear to Overcast, still dry usually)
    if (code <= 3) score += 1;

    // Bad weather penalty (Rain/Snow/Thunderstorm)
    if (code >= 50) score -= 2; 
    if (tempMax < 10) score -= 1; // Cold

    if (score >= 3) return 'HIGH';
    if (score >= 1) return 'MEDIUM';
    return 'LOW';
  }

  private getMockForecast(): Partial<WeatherForecast>[] {
    const today = new Date();
    return Array.from({ length: 8 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      return {
        date: date.toISOString().split('T')[0],
        weather_code: 0, // Clear sky WMO
        temperature_max: 22,
        temperature_min: 15,
        rain_probability: 0,
        wind_speed: 10,
        is_terrasse_friendly: true,
        traffic_level_estimate: 'HIGH'
      };
    });
  }
}

export const weatherService = new WeatherService();
