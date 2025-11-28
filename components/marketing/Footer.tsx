import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-navy font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-lg">ShiftPilot</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Simplifiez vos plannings. Libérez votre temps.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Produit</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-white/70 hover:text-white transition-colors text-sm">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="#integrations"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Intégrations
                </Link>
              </li>
              <li>
                <Link href="#changelog" className="text-white/70 hover:text-white transition-colors text-sm">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-white/70 hover:text-white transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-white/70 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#careers" className="text-white/70 hover:text-white transition-colors text-sm">
                  Recrutement
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#docs" className="text-white/70 hover:text-white transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#help" className="text-white/70 hover:text-white transition-colors text-sm">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#api" className="text-white/70 hover:text-white transition-colors text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="#status" className="text-white/70 hover:text-white transition-colors text-sm">
                  Statut
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-white/70 hover:text-white transition-colors text-sm">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="#cookies" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-white/50 text-xs">
                © {new Date().getFullYear()} ShiftPilot. Tous droits réservés.
              </p>
              <p className="text-white/70 text-sm mt-2">Simplifiez vos plannings. Libérez votre temps.</p>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-sm mr-2">Suivez-nous</h3>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

