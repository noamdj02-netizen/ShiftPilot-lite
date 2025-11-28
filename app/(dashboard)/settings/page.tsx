"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useOrganization } from "@/hooks/useOrganization";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { createClient } from "@/lib/supabase/client";
import { Building2, Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { profile } = useAuth();
  const { organization, isLoading: orgLoading, createOrganization } = useOrganization();
  const [isSaving, setIsSaving] = useState(false);
  const [orgFormData, setOrgFormData] = useState({
    name: "",
    slug: "",
  });
  const [profileFormData, setProfileFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
  });

  useEffect(() => {
    if (organization) {
      setOrgFormData({
        name: organization.name || "",
        slug: organization.slug || "",
      });
    }
  }, [organization]);

  useEffect(() => {
    if (profile) {
      setProfileFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await createOrganization(orgFormData.name, orgFormData.slug);
      alert("Organisation créée avec succès !");
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Erreur lors de la création de l'organisation");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error } = await (supabase
        .from("profiles") as any)
        .update(profileFormData)
        .eq("id", profile?.id);

      if (error) throw error;
      alert("Profil mis à jour avec succès !");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Erreur lors de la mise à jour du profil");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground">
          Paramètres
        </h1>
        <p className="text-foreground-muted dark:text-dark-foreground-muted mt-1">
          Gérez les paramètres de votre compte et organisation
        </p>
      </div>

      {/* Organisation Section */}
      {!organization && !orgLoading && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground dark:text-dark-foreground">
              Créer votre organisation
            </h2>
          </div>
          <p className="text-sm text-foreground-muted dark:text-dark-foreground-muted mb-4">
            Vous devez créer une organisation pour commencer à utiliser ShiftPilot.
          </p>
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org_name">Nom de l'organisation *</Label>
              <Input
                id="org_name"
                value={orgFormData.name}
                onChange={(e) => setOrgFormData({ ...orgFormData, name: e.target.value })}
                placeholder="Mon Restaurant"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org_slug">Identifiant (slug) *</Label>
              <Input
                id="org_slug"
                value={orgFormData.slug}
                onChange={(e) =>
                  setOrgFormData({
                    ...orgFormData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="mon-restaurant"
                required
              />
              <p className="text-xs text-foreground-muted dark:text-dark-foreground-muted">
                Utilisé pour l'URL de votre organisation (minuscules, tirets uniquement)
              </p>
            </div>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Créer l'organisation
                </>
              )}
            </Button>
          </form>
        </Card>
      )}

      {organization && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground dark:text-dark-foreground">
              Organisation
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground-muted dark:text-dark-foreground-muted">
              Nom: <span className="text-foreground dark:text-dark-foreground font-medium">{organization.name}</span>
            </p>
            <p className="text-sm text-foreground-muted dark:text-dark-foreground-muted">
              Slug: <span className="text-foreground dark:text-dark-foreground font-medium">{organization.slug}</span>
            </p>
          </div>
        </Card>
      )}

      {/* Profile Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground dark:text-dark-foreground mb-4">
          Mon profil
        </h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={profileFormData.first_name}
                onChange={(e) =>
                  setProfileFormData({ ...profileFormData, first_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={profileFormData.last_name}
                onChange={(e) =>
                  setProfileFormData({ ...profileFormData, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={profileFormData.phone}
              onChange={(e) =>
                setProfileFormData({ ...profileFormData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email || ""} disabled className="bg-background-secondary dark:bg-dark-background-secondary" />
            <p className="text-xs text-foreground-muted dark:text-dark-foreground-muted">
              L'email ne peut pas être modifié
            </p>
          </div>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
