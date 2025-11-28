"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Clock, MessageSquare, RefreshCw, Shield } from "lucide-react";

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

const benefits = [
  {
    icon: Clock,
    title: "Gagnez 3h/semaine",
    description: "Plus de tableaux Excel interminables",
  },
  {
    icon: MessageSquare,
    title: "Partagez en 1 clic",
    description: "SMS ou WhatsApp à toute l'équipe",
  },
  {
    icon: RefreshCw,
    title: "Échanges simplifiés",
    description: "Les employés gèrent leurs swaps",
  },
  {
    icon: Shield,
    title: "Conformité légale",
    description: "Respect automatique du code du travail",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
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
            Pourquoi ShiftPilot ?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Les avantages qui font la différence
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="flex items-start gap-4 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted">{benefit.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

