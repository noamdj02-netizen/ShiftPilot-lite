"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CoverageCTA() {
  const [activeSegment, setActiveSegment] = useState("Consultants");

  const segments = ["Restaurants", "Brasseries", "Fast-food", "Bars"];

  const features = [
    "Génération automatique des plannings",
    "Respect du code du travail",
    "Notifications SMS et WhatsApp",
    "Échanges de shifts entre employés",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-foreground-muted mb-2">POUR TOUS LES TYPES D'ÉTABLISSEMENTS</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Adapté à tous vos besoins
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Que vous dirigiez un restaurant, une brasserie, un fast-food ou un bar, ShiftPilot s'adapte à votre organisation et vos contraintes.
          </p>
        </div>

        {/* Segment Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {segments.map((segment) => (
            <button
              key={segment}
              onClick={() => setActiveSegment(segment)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeSegment === segment
                  ? "bg-navy text-white"
                  : "bg-gray-50 text-foreground hover:bg-border"
              }`}
            >
              {segment}
            </button>
          ))}
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Mockup */}
          <div className="bg-gradient-to-br from-purple/10 to-peach/20 rounded-3xl p-12 aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 bg-white/50 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-6xl">📱</span>
              </div>
              <p className="text-foreground font-medium">Notifications SMS & WhatsApp</p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-sm text-foreground-muted mb-2">COMMUNICATION SIMPLIFIÉE</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Communiquez avec votre équipe en un clic
            </h3>
            <p className="text-foreground-muted mb-8 leading-relaxed">
              Plus besoin d'afficher le planning dans le local ou d'envoyer des photos floues. ShiftPilot envoie automatiquement le planning à chaque employé par SMS ou WhatsApp.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-success/20 rounded-full">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
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

