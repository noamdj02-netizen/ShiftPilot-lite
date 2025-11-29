"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Organization } from "@/lib/types";

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        return;
      }

      // Récupérer le profil pour avoir l'organization_id
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

      // Récupérer l'organisation
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", profileData.organization_id)
        .single();

      if (error) {
        console.error("Error fetching organization:", error);
        setIsLoading(false);
        return;
      }

      setOrganization(data as Organization);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (name: string, slug: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const { data, error } = await (supabase
      .from("organizations") as any)
      .insert({
        name,
        slug,
      })
      .select()
      .single();

    if (error) throw error;

    // Mettre à jour le profil avec l'organization_id
    const { error: profileError } = await (supabase
      .from("profiles") as any)
      .update({ organization_id: data.id })
      .eq("id", user.id);

    if (profileError) throw profileError;

    setOrganization(data as Organization);
    return data;
  };

  return {
    organization,
    isLoading,
    refetch: fetchOrganization,
    createOrganization,
  };
}
