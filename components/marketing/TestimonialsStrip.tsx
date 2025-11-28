"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialsStrip() {
  const testimonials = [
    {
      name: "Marc Dubois",
      role: "Gérant, Le Comptoir Parisien",
      quote:
        "J'ai gagné 4 heures par semaine. Avant, je passais mon dimanche à faire les plannings. Maintenant, c'est fait en 2 minutes et mes employés reçoivent tout par SMS.",
      bgColor: "bg-lilac",
      avatar: "👨",
    },
    {
      name: "Sophie Martin",
      role: "Manager, Brasserie du Port",
      quote:
        "Enfin un outil qui respecte vraiment le code du travail. Plus de stress, plus d'erreurs. Mes employés adorent pouvoir échanger leurs shifts directement.",
      bgColor: "bg-peach",
      avatar: "👩",
    },
    {
      name: "Thomas Leroy",
      role: "Directeur, Casa Nostra",
      quote:
        "On a 3 restaurants et 45 employés. ShiftPilot gère tout automatiquement. Le ROI est immédiat : moins d'admin, plus de temps pour nos clients.",
      bgColor: "bg-yellow-soft",
      avatar: "👨",
    },
  ];

  return (
    <section className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-text-muted mb-2">CE QUE DISENT NOS CLIENTS</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text-main">Ils nous font confiance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${testimonial.bgColor} rounded-3xl p-8 relative`}
            >
              {/* Avatar */}
              <div className="flex justify-center -mt-12 mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white">
                  {testimonial.avatar}
                </div>
              </div>

              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <Quote className="h-8 w-8 text-navy/20" />
              </div>

              {/* Quote */}
              <p className="text-text-main mb-6 leading-relaxed text-center">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-text-main">{testimonial.name}</p>
                <p className="text-sm text-text-muted">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

