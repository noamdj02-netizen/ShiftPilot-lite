"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-foreground dark:text-dark-foreground mb-2">
          Connexion
        </h1>
        <p className="text-sm text-muted dark:text-dark-foreground-muted">
          Connectez-vous à votre compte ShiftPilot
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-accent hover:text-accent-hover"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted dark:text-dark-foreground-muted">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-accent hover:text-accent-hover font-medium">
          Créer un compte
        </Link>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Card className="p-8">
        <div className="mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground dark:text-dark-foreground mb-2">
            Connexion
          </h1>
          <p className="text-sm text-muted dark:text-dark-foreground-muted">
            Chargement...
          </p>
        </div>
      </Card>
    }>
      <LoginForm />
    </Suspense>
  );
}

