"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CaseStudiesSection() {
  const caseStudies = [
    {
      name: "Le Comptoir Parisien",
      title: "Marc Dubois",
      role: "Gérant - 12 employés",
      description:
        "Avant ShiftPilot, je passais 4 heures chaque dimanche à faire les plannings. Maintenant, c'est automatique et mes employés reçoivent tout par SMS. J'ai récupéré 16 heures par mois.",
      bgColor: "bg-lilac",
      avatar: "👨",
    },
    {
      name: "Brasserie du Port",
      title: "Sophie Martin",
      role: "Manager - 18 employés",
      description:
        "L'outil le plus simple que j'ai utilisé. Mes employés peuvent échanger leurs shifts entre eux, ça me fait gagner un temps fou. Et surtout, je suis sûre que tout est conforme au code du travail.",
      bgColor: "bg-peach",
      avatar: "👩",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-foreground-muted mb-2">TÉMOIGNAGES</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
            Des restaurateurs qui ont transformé leur gestion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${study.bgColor} rounded-3xl p-8 relative overflow-hidden`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {study.avatar}
                </div>
              </div>

              {/* Badge */}
              <div className="flex justify-center mb-4">
                <span className="bg-white/80 text-navy px-4 py-1.5 rounded-full text-sm font-medium">
                  {study.name}
                </span>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="font-semibold text-foreground mb-1">{study.title}</h3>
                <p className="text-sm text-foreground-muted mb-4">{study.role}</p>
                <p className="text-foreground leading-relaxed">{study.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

