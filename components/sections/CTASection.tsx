"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function CTASection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Prêt à simplifier vos plannings ?
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Rejoignez les 50+ restaurants qui gagnent du temps chaque semaine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="primary"
              size="lg"
              href="https://buy.stripe.com/XXXXX"
              className="w-full sm:w-auto"
            >
              Commencer maintenant - 19€/mois
            </Button>
          </div>
          <p className="text-sm text-muted">
            Sans engagement • Annulation en 1 clic
          </p>
        </motion.div>
      </div>
    </section>
  );
}

