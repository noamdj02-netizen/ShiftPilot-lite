"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function HeroSection() {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-8"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
            Fini les tableurs Excel pour vos plannings
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted max-w-2xl mx-auto">
            Générez vos plannings resto en 2 clics. Simple. Rapide.{" "}
            <span className="font-semibold text-foreground">19€/mois.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="primary"
              size="lg"
              href="https://buy.stripe.com/XXXXX"
              className="w-full sm:w-auto"
            >
              Essayer gratuitement
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto"
            >
              Voir la démo
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-12"
          >
            <div className="bg-card rounded-xl border border-border shadow-sm p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-12 h-12 text-accent" />
              </div>
              <div className="grid grid-cols-7 gap-2 text-sm">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-medium text-muted py-2"
                    >
                      {day}
                    </div>
                  )
                )}
                {Array.from({ length: 21 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 border border-border rounded-lg flex items-center justify-center text-xs text-muted bg-background"
                  >
                    {i < 7 ? "09:00" : i < 14 ? "14:00" : "18:00"}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted mt-4">
                Planning généré automatiquement
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

