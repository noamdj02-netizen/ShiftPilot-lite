// Script de test pour vérifier la connexion Supabase
import { createClient } from "../lib/supabase/server";

async function testSupabase() {
  try {
    console.log("🔄 Test de connexion à Supabase...");
    
    const supabase = await createClient();
    
    // Test simple : récupérer les tables
    const { data: tables, error } = await supabase
      .from("organizations")
      .select("count")
      .limit(1);
    
    if (error) {
      console.error("❌ Erreur Supabase:", error.message);
      return false;
    }
    
    console.log("✅ Connexion Supabase réussie !");
    console.log("📊 Tables accessibles");
    return true;
  } catch (error) {
    console.error("❌ Erreur:", error);
    return false;
  }
}

testSupabase();

