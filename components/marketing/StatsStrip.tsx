"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function StatsStrip() {
  return (
    <section className="py-20 bg-bg-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Main Stats */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-5xl font-bold text-text-main mb-2">500+</p>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-soft text-yellow-soft" />
                  ))}
                </div>
                <p className="text-sm text-text-muted">restaurants équipés</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-text-main mb-2">4.9</p>
                <p className="text-sm text-text-muted">/5 satisfaction client</p>
              </div>
            </div>
          </div>

          {/* Right: Community Text */}
          <div>
            <h3 className="text-2xl font-semibold text-text-main mb-4">
              Rejoignez les restaurateurs qui ont dit adieu aux plannings Excel.
            </h3>
            <p className="text-text-muted leading-relaxed">
              Plus de 500 établissements en France utilisent ShiftPilot pour gagner du temps et simplifier leur gestion d'équipe. Résultat : moins de stress, plus de sérénité.
            </p>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-muted text-center mb-6">Ils nous font confiance</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Le Comptoir Parisien", "Brasserie du Port", "La Table d'Antoine", "Bistrot des Halles", "Casa Nostra"].map((name, i) => (
              <div
                key={i}
                className="text-text-muted text-sm font-medium hover:opacity-100 transition-opacity"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

