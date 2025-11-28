import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-4">
              ShiftPilot
            </h3>
            <p className="text-sm text-muted">
              Plannings restaurant simplifiés. Gagnez du temps, chaque semaine.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#how-it-works" className="hover:text-foreground">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@shiftpilot.fr" className="hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/legal" className="hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted">
          <p>© {new Date().getFullYear()} ShiftPilot. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

