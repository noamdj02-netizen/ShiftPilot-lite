"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Est-ce vraiment plus rapide qu'Excel ?",
      answer:
        "Oui, radicalement. Là où vous passiez 3-5 heures par semaine sur vos plannings, ShiftPilot génère un planning optimisé en moins de 10 secondes. Et en bonus, il respecte automatiquement le code du travail.",
    },
    {
      question: "Comment mes employés reçoivent le planning ?",
      answer:
        "Par SMS, WhatsApp ou email - vous choisissez. Dès que vous publiez le planning, chaque employé reçoit ses shifts personnalisés. Plus besoin de l'afficher dans le local ou d'envoyer des photos floues.",
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer:
        "Absolument. Pas d'engagement, pas de préavis. Vous pouvez annuler en un clic depuis votre espace client. On vous rembourse même au prorata si vous partez en cours de mois.",
    },
    {
      question: "Est-ce conforme au droit du travail français ?",
      answer:
        "C'est même notre spécialité. ShiftPilot intègre les règles de la convention HCR : 11h de repos minimum, 48h max/semaine, 1 jour de repos obligatoire, temps de pause... Tout est vérifié automatiquement.",
    },
    {
      question: "Combien de temps pour démarrer ?",
      answer:
        "10 minutes chrono. Vous créez votre compte, ajoutez vos employés (import CSV possible), et vous pouvez générer votre premier planning immédiatement. Pas de formation, pas de consultant.",
    },
    {
      question: "Y a-t-il une période d'essai ?",
      answer:
        "Oui, 14 jours gratuits sans carte bancaire. Vous testez toutes les fonctionnalités PRO, et vous décidez ensuite. Zéro risque.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: FAQ */}
          <div>
            <p className="text-sm text-foreground-muted mb-2">QUESTIONS FRÉQUENTES</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-8">
              Tout ce que vous devez savoir
            </h2>
            <p className="text-foreground-muted mb-8 leading-relaxed">
              Vous avez des questions ? Nous avons les réponses. Et si vous ne trouvez pas, notre équipe est là pour vous aider.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-foreground-muted transition-transform ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-4">
                      <p className="text-foreground-muted text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image Placeholder */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-peach to-lilac rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/50 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                <p className="text-foreground font-medium">Dashboard ShiftPilot</p>
                <p className="text-foreground-muted text-sm mt-2">Planning hebdomadaire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

