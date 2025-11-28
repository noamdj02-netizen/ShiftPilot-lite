"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
      });
      
      if (result?.user) {
        setSuccess(true);
      } else {
        setError("L'inscription a échoué. Veuillez réessayer.");
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      
      // Messages d'erreur plus explicites
      if (errorMessage.includes("Database error") || errorMessage.includes("profile")) {
        setError(
          "Erreur lors de la création du profil. Le compte a peut-être été créé. Essayez de vous connecter."
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground dark:text-dark-foreground mb-2">
            Vérifiez votre email
          </h2>
          <p className="text-sm text-muted dark:text-dark-foreground-muted">
            Nous avons envoyé un lien de confirmation à {email}
          </p>
        </div>
        <Button variant="outline" href="/login" className="w-full">
          Retour à la connexion
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-foreground dark:text-dark-foreground mb-2">
          Créer un compte
        </h1>
        <p className="text-sm text-muted dark:text-dark-foreground-muted">
          Commencez votre essai gratuit de 14 jours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Jean"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Dupont"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={8}
          />
          <p className="text-xs text-muted dark:text-dark-foreground-muted">
            Minimum 8 caractères
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Création..." : "Créer mon compte"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted dark:text-dark-foreground-muted">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
          Se connecter
        </Link>
      </div>
    </Card>
  );
}

