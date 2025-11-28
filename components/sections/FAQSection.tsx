"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const faqs = [
  {
    question: "Est-ce que c'est vraiment plus rapide qu'Excel ?",
    answer:
      "Absolument. ShiftPilot génère votre planning en quelques secondes, alors qu'Excel peut prendre des heures. Plus besoin de calculer manuellement les heures, vérifier les contraintes ou gérer les conflits.",
  },
  {
    question: "Comment mes employés reçoivent leur planning ?",
    answer:
      "Vos employés reçoivent leur planning automatiquement par SMS ou WhatsApp. Ils peuvent aussi le consulter en ligne à tout moment. Plus besoin d'envoyer des captures d'écran ou des PDF par email.",
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer:
      "Oui, sans engagement. Vous pouvez annuler votre abonnement en 1 clic depuis votre compte. Aucun frais caché, aucune période de préavis.",
  },
  {
    question: "Est-ce conforme au droit du travail français ?",
    answer:
      "Oui, ShiftPilot respecte automatiquement le code du travail français : temps de repos obligatoires, heures supplémentaires, durées maximales de travail. Vous êtes toujours en conformité.",
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer:
      "Oui, vous pouvez essayer ShiftPilot gratuitement pendant 14 jours. Aucune carte bancaire requise pour commencer. Testez toutes les fonctionnalités avant de vous engager.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Questions fréquentes
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Tout ce que vous devez savoir sur ShiftPilot
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading font-bold text-lg text-foreground flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-muted leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

