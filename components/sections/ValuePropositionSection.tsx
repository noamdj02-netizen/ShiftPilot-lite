'use client'

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Star, Bell, BrainCircuit } from "lucide-react";

export function ValuePropositionSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-violet-400" />,
      title: "Planning IA ultra-optimisé",
      desc: "Génération automatique de vos plannings, équilibrés, conformes aux lois, et adaptés à vos besoins.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-violet-400" />,
      title: "PilotBot — Chatbot client 24/7",
      desc: "Votre restaurant répond automatiquement aux questions, prend des réservations et assiste vos clients.",
    },
    {
      icon: <Star className="w-6 h-6 text-violet-400" />,
      title: "PilotReview — Avis Google automatiques",
      desc: "Envoyez automatiquement des demandes d'avis et boostez votre note Google sans effort.",
    },
    {
      icon: <Bell className="w-6 h-6 text-violet-400" />,
      title: "PilotSMS — Notifications d'équipe",
      desc: "Envoi planning, alertes changements, rappels, absences. Tout passe enfin par un canal fiable.",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-background-dark to-background-light">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-600/20 text-violet-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Le pilote automatique de votre restaurant
          </span>
          <h2 className="text-4xl font-bold text-white mb-6">
            Tout ce que <span className="text-violet-400">ShiftPilot</span> fait pour vous.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Oubliez la charge mentale opérationnelle. Une seule plateforme,
            pour tout planifier, répondre, prévenir et optimiser en temps réel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl hover:shadow-violet-500/20 transition group"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-violet-300 transition">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

