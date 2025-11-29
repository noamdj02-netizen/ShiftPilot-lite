"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  const features = [
    "14 jours d'essai gratuit",
    "Sans carte bancaire",
    "Annulation en 1 clic",
  ];

  return (
    <section className="py-20 bg-yellow-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-landing-card"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Commencez gratuitement !
            </h2>
            <div className="mb-6">
              <span className="text-5xl font-bold text-foreground">À partir de 19€</span>
              <span className="text-foreground-muted ml-2">/mois</span>
            </div>
            <p className="text-foreground-muted mb-8">14 jours d'essai gratuit • Sans engagement</p>
            <Link
              href="/pricing"
              className="block w-full bg-navy text-white px-8 py-4 rounded-full font-medium text-center hover:bg-opacity-90 transition-all hover:scale-105 mb-8"
            >
              Voir les tarifs
            </Link>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="p-1 bg-success/20 rounded-full">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-foreground-muted mb-2">ESSAYEZ GRATUITEMENT</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
              Tout ce dont vous avez besoin pour démarrer
            </h3>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-success/20 rounded-full">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

