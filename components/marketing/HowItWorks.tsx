"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      icon: "⏱️",
      title: "Gagnez 3h par semaine",
      description: "Plus de tableaux Excel interminables. Générez vos plannings en quelques clics.",
    },
    {
      icon: "📱",
      title: "Communication instantanée",
      description: "Envoyez le planning à toute l'équipe par SMS ou WhatsApp en un clic.",
    },
    {
      icon: "🔄",
      title: "Échanges simplifiés",
      description: "Vos employés gèrent leurs demandes d'échange directement dans l'app.",
    },
    {
      icon: "⚖️",
      title: "100% légal",
      description: "Respect automatique du code du travail : repos, heures max, temps de pause.",
    },
  ];

  const features = [
    "✓ Génération automatique des plannings",
    "✓ Respect automatique du code du travail",
    "✓ Notifications SMS et WhatsApp",
    "✓ Échanges de shifts entre employés",
    "✓ Dashboard analytics en temps réel",
  ];

  return (
    <section className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-1 lg:space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-bg-soft rounded-2xl"
              >
                <div className="text-3xl">{step.icon}</div>
                <div>
                  <h3 className="font-semibold text-text-main mb-1">{step.title}</h3>
                  <p className="text-text-muted text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-sm text-text-muted mb-2">POURQUOI SHIFTPILOT</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-text-main mb-6">
              Tout ce dont vous avez besoin pour gérer vos équipes
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              ShiftPilot centralise la planification, la communication et le suivi de vos équipes. Moins d'admin, plus de temps pour votre restaurant.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-success/20 rounded-full">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-text-main">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/pricing"
              className="inline-block bg-navy text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all hover:scale-105"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

