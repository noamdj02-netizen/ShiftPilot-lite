"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

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

const plans = [
  {
    name: "LITE",
    price: "19",
    description: "Parfait pour les petits restaurants",
    features: [
      "Jusqu'à 10 employés",
      "Planning hebdomadaire",
      "Export PDF",
      "Support email",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "PRO",
    price: "29",
    description: "Pour les restaurants en croissance",
    features: [
      "Jusqu'à 25 employés",
      "Tout LITE +",
      "Notifications SMS",
      "Échanges de shifts",
      "Dashboard analytics",
    ],
    cta: "Commencer",
    popular: true,
  },
  {
    name: "BUSINESS",
    price: "49",
    description: "Pour les groupes et chaînes",
    features: [
      "Employés illimités",
      "Tout PRO +",
      "Multi-établissements",
      "API access",
      "Support prioritaire",
    ],
    cta: "Commencer",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
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
            Tarifs simples et transparents
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Choisissez le plan qui correspond à votre restaurant
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`relative h-full flex flex-col ${
                  plan.popular
                    ? "border-2 border-accent shadow-lg scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">POPULAIRE</Badge>
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-heading font-bold text-foreground">
                      {plan.price}€
                    </span>
                    <span className="text-muted">/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  href="https://buy.stripe.com/XXXXX"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

