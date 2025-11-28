import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
          Paiement réussi !
        </h1>
        <p className="text-lg text-muted mb-8">
          Merci pour votre confiance. Votre compte ShiftPilot est maintenant actif.
        </p>
        <p className="text-sm text-muted mb-8">
          Vous allez recevoir un email de confirmation avec vos identifiants de connexion dans les prochaines minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" href="/">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </main>
  );
}

