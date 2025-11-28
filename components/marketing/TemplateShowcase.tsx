"use client";

import { motion } from "framer-motion";

export function TemplateShowcase() {
  const templates = [
    {
      number: "1",
      title: "Ajoutez votre équipe\nImportez vos employés en 30 secondes. Définissez leurs compétences et disponibilités.",
      bgColor: "bg-lilac",
    },
    {
      number: "2",
      title: "Configurez vos besoins\nIndiquez vos créneaux, postes requis et contraintes. ShiftPilot s'occupe du reste.",
      bgColor: "bg-peach",
    },
    {
      number: "3",
      title: "Générez et partagez\nUn clic = planning optimisé. Envoyez-le par SMS à toute l'équipe instantanément.",
      bgColor: "bg-yellow-soft",
    },
  ];

  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm text-white/70 mb-2">COMMENT ÇA MARCHE</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">3 étapes pour en finir avec les plannings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${template.bgColor} rounded-3xl p-8 text-navy`}
            >
              <div className="text-4xl font-bold mb-4">{template.number}</div>
              <p className="text-lg leading-relaxed whitespace-pre-line">{template.title}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

