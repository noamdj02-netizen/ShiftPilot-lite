'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Star, MessageSquare, Sparkles, ArrowRight, CheckCircle2, Zap, Bot, TrendingUp, Bell } from 'lucide-react'

export function AIservicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#000000] relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <Sparkles className="w-4 h-4" />
            Intelligence Artificielle
          </span>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Vos opérations, automatisées par IA. <span className="text-black/40 dark:text-white/40">24h/24.</span>
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            ShiftPilot devient votre manager virtuel : réponses clients, avis Google, communication équipe… tout tourne sans vous.
          </p>
        </motion.div>

        {/* Three Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* PilotBot™ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onHoverStart={() => setHoveredCard(0)}
            onHoverEnd={() => setHoveredCard(null)}
            className="group relative bg-white dark:bg-[#000000] rounded-3xl p-8 shadow-sm border border-black/5 dark:border-white/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-opacity duration-500 ${hoveredCard === 0 ? 'opacity-10' : 'opacity-0'}`} />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Bot className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-black dark:text-white">PilotBot™</h3>
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  IA
                </span>
              </div>

              <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                Un assistant client 24h/24, sur Instagram, Facebook et votre site.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {[
                  'Répond aux messages clients instantanément',
                  'Donne horaires, menus, allergènes',
                  'Peut prendre des réservations automatiquement',
                  'Ton adapté à votre restaurant',
                  'Disponible même quand vous dormez',
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-black/60 dark:text-white/60"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Punchline */}
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Vous ne ratez plus une seule réservation.
                </p>
              </div>

              {/* Chat Animation */}
              <div className="mt-6 space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none p-3 max-w-[85%] shadow-sm"
                >
                  <p className="text-xs text-black/70 dark:text-white/70">Bonjour, avez-vous une table pour 4 ce soir ?</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-br-none p-3 max-w-[85%] ml-auto text-white shadow-lg shadow-blue-500/20"
                >
                  <p className="text-xs">Bien sûr ! Nous avons une table disponible à 20h. Je vous réserve ?</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* PilotReview™ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onHoverStart={() => setHoveredCard(1)}
            onHoverEnd={() => setHoveredCard(null)}
            className="group relative bg-slate-900 dark:bg-black/40 rounded-3xl p-8 shadow-sm border border-slate-800 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 transition-opacity duration-500 ${hoveredCard === 1 ? 'opacity-10' : 'opacity-0'}`} />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-white">PilotReview™</h3>
                <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  Auto
                </span>
              </div>

              <p className="text-base text-white/70 mb-6 leading-relaxed">
                Boostez vos avis Google… automatiquement.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {[
                  'Envoi auto après chaque passage de client',
                  'Messages personnalisables',
                  'Anti-spam intégré',
                  'Dashboard : avis / notes / évolutions',
                  '+20 à +50 avis / mois en moyenne',
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Punchline */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm font-semibold text-yellow-400">
                  Votre réputation devient votre meilleur employé.
                </p>
              </div>

              {/* Stars Animation */}
              <div className="mt-6 flex items-center gap-1.5 mb-4">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1, type: "spring" }}
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  className="ml-2 text-base font-semibold text-white/90"
                >
                  4.8/5
                </motion.span>
              </div>

              {/* Mini Chart */}
              <div className="flex items-end gap-1.5 h-16 bg-slate-800/50 dark:bg-black/30 rounded-xl p-3">
                {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.05, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* PilotSMS™ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onHoverStart={() => setHoveredCard(2)}
            onHoverEnd={() => setHoveredCard(null)}
            className="group relative bg-white dark:bg-[#000000] rounded-3xl p-8 shadow-sm border border-black/5 dark:border-white/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 transition-opacity duration-500 ${hoveredCard === 2 ? 'opacity-10' : 'opacity-0'}`} />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-black dark:text-white">PilotSMS™</h3>
                <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  SMS
                </span>
              </div>

              <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                Gérez toute votre équipe par SMS.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {[
                  'SMS auto quand le planning est publié',
                  'Alerte absence / retard',
                  'Rappel 1h avant chaque shift',
                  'Messages individuels ou en masse',
                  'Historique complet',
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-black/60 dark:text-white/60"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Punchline */}
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Moins de no-shows. Moins de chaos.
                </p>
              </div>

              {/* SMS Animation */}
              <div className="mt-6 space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                  className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none p-3 max-w-[85%] shadow-sm"
                >
                  <p className="text-xs text-black/70 dark:text-white/70">📅 Planning publié ! Votre shift : Lun 9h-17h</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rounded-br-none p-3 max-w-[85%] ml-auto text-white shadow-lg shadow-purple-500/20"
                >
                  <p className="text-xs">⏰ Rappel : Shift dans 1h (9h-17h)</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-6">
            Un restaurant qui tourne tout seul. <span className="text-black/40 dark:text-white/40">(Ou presque.)</span>
          </h3>
          
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300 hover:scale-105 text-lg mb-4"
          >
            Essayer gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="text-sm text-black/60 dark:text-white/60">
            14 jours gratuits • Installation en 5 min
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AIservicesSection

