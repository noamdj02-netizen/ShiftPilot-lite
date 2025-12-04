import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { weatherService } from "@/lib/services/weather-service";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { establishmentId } = body;

    if (!establishmentId) {
      return NextResponse.json(
        { error: "Missing establishmentId" },
        { status: 400 }
      );
    }

    // 1. Get establishment coordinates
    const { data: establishment, error: estError } = await supabase
      .from("establishments")
      .select("latitude, longitude, city, country")
      .eq("id", establishmentId)
      .single();

    if (estError || !establishment) {
      return NextResponse.json(
        { error: "Establishment not found" },
        { status: 404 }
      );
    }

    // Default coords (Paris) if not set
    const coords = {
      lat: establishment.latitude || 48.8566,
      lon: establishment.longitude || 2.3522,
    };

    // 2. Call Weather Service
    const forecasts = await weatherService.getForecast(coords);

    // 3. Persist to DB
    const upsertData = forecasts.map((f) => ({
      establishment_id: establishmentId,
      date: f.date,
      weather_code: f.weather_code,
      temperature_min: f.temperature_min,
      temperature_max: f.temperature_max,
      rain_probability: f.rain_probability,
      wind_speed: f.wind_speed,
      is_terrasse_friendly: f.is_terrasse_friendly,
      traffic_level_estimate: f.traffic_level_estimate,
      updated_at: new Date().toISOString(),
    }));

    const { error: upsertError } = await supabase
      .from("weather_forecasts")
      .upsert(upsertData, { onConflict: "establishment_id,date" });

    if (upsertError) {
      console.error("Error saving weather data:", upsertError);
      return NextResponse.json(
        { error: "Failed to save weather data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, forecasts: upsertData });
  } catch (error) {
    console.error("Weather sync error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

