"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground dark:text-dark-foreground mb-2">
            Email envoyé
          </h2>
          <p className="text-sm text-muted dark:text-dark-foreground-muted">
            Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.
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
          Mot de passe oublié
        </h1>
        <p className="text-sm text-muted dark:text-dark-foreground-muted">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

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

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Envoi..." : "Envoyer le lien"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-accent hover:text-accent-hover font-medium"
        >
          ← Retour à la connexion
        </Link>
      </div>
    </Card>
  );
}

