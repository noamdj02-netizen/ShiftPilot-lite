"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { UserPlus, Settings, Zap } from "lucide-react";

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

const steps = [
  {
    icon: UserPlus,
    title: "Ajoutez vos employés",
    description: "Importez votre équipe en 30 secondes",
  },
  {
    icon: Settings,
    title: "Définissez vos besoins",
    description: "Indiquez vos créneaux et contraintes",
  },
  {
    icon: Zap,
    title: "Générez le planning",
    description: "Un clic, c'est prêt. Partagez par SMS.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
    >
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
            Comment ça marche ?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Trois étapes simples pour générer vos plannings
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-accent">
                      Étape {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted">{step.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

