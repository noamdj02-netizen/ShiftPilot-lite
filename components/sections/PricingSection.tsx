'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: "Lite",
    description: "Pour les restaurants indépendants qui veulent arrêter de galérer avec les plannings",
    monthlyPrice: 59,
    yearlyPrice: 49,
    perUnit: "établissement",
    color: "blue",
    features: [
      { text: "Planning en 2 minutes", included: true, highlight: false },
      { text: "Planning illimité", included: true, highlight: false },
      { text: "Application mobile employés", included: true, highlight: false },
      { text: "Export PDF", included: true, highlight: false },
      { text: "Notifications SMS équipe", included: true, highlight: false },
      { text: "Gestion des remplacements", included: true, highlight: false },
      { text: "Conformité légale basique", included: true, highlight: false },
      { text: "Support email", included: true, highlight: false },
      { text: "IA Planning", included: false, highlight: false },
      { text: "Avis Google Auto", included: false, highlight: false },
      { text: "Chatbot IA clients", included: false, highlight: false },
      { text: "Multi-établissements", included: false, highlight: false },
    ],
    cta: "Essai gratuit",
    ctaLink: "/register",
    popular: false,
    tagline: "Le choix parfait pour commencer sans friction",
  },
  {
    name: "Pro",
    description: "Pour les restaurants qui veulent automatiser + booster leurs avis + gagner du temps",
    monthlyPrice: 99,
    yearlyPrice: 83,
    perUnit: "établissement",
    color: "purple",
    features: [
      { text: "Tout Lite inclus", included: true, highlight: false },
      { text: "IA Planning avancée", included: true, highlight: true },
      { text: "Génération automatique complète", included: true, highlight: false },
      { text: "Optimisation légale & charge", included: true, highlight: false },
      { text: "Suggestions intelligentes", included: true, highlight: false },
      { text: "PilotReview – Avis Google Auto", included: true, highlight: true },
      { text: "+10 à +20 avis Google / mois", included: true, highlight: false },
      { text: "Messages personnalisés", included: true, highlight: false },
      { text: "Dashboard de suivi en temps réel", included: true, highlight: false },
      { text: "Analytics avancés", included: true, highlight: false },
      { text: "PilotBot – Chatbot IA", included: false, highlight: false },
      { text: "PilotSMS avancé", included: false, highlight: false },
      { text: "Multi-établissements", included: false, highlight: false },
    ],
    cta: "Essai gratuit",
    ctaLink: "/register",
    popular: true,
    tagline: "Idéal pour restaurants avec 8–30 employés",
  },
  {
    name: "Full",
    description: "Pour ceux qui veulent le pilote automatique complet",
    monthlyPrice: 149,
    yearlyPrice: 124,
    perUnit: "établissement",
    color: "violet",
    features: [
      { text: "Tout Pro inclus", included: true, highlight: false },
      { text: "PilotBot – Chatbot IA clients 24/7", included: true, highlight: true },
      { text: "Répond Instagram, Facebook, Site web", included: true, highlight: false },
      { text: "Donne horaires, menus, allergènes", included: true, highlight: false },
      { text: "Peut prendre des réservations", included: true, highlight: false },
      { text: "PilotSMS – Notifications avancées", included: true, highlight: true },
      { text: "Envoi automatique planning", included: true, highlight: false },
      { text: "Alertes modifications", included: true, highlight: false },
      { text: "Messages absence & rappels", included: true, highlight: false },
      { text: "Historique lecture", included: true, highlight: false },
      { text: "Multi-établissements illimité", included: true, highlight: false },
      { text: "Support prioritaire", included: true, highlight: false },
    ],
    cta: "Essai gratuit",
    ctaLink: "/register",
    popular: false,
    tagline: "Gère l'opérationnel pendant que vous bossez",
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#000000] relative overflow-hidden" id="tarifs">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-base">payments</span>
            Tarifs Enterprise
          </span>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Des prix transparents. <span className="text-black/40 dark:text-white/40">Sans surprise.</span>
          </h2>
          
          <p className="text-lg text-black/60 dark:text-white/60 mb-6 max-w-2xl mx-auto">
            Vous perdez du temps chaque semaine avec les plannings, les remplacements,
            les employés qui lisent pas les horaires, les messages Insta,
            et les avis Google à gérer.
          </p>
          
          <p className="text-base text-black/70 dark:text-white/70 mb-8 font-medium">
            ShiftPilot automatise tout ça pour vous : <span className="text-accent">Planning IA</span> • <span className="text-accent">SMS équipe</span> • <span className="text-accent">Chatbot client</span> • <span className="text-accent">Avis Google automatiques</span>
          </p>
          
          <p className="text-sm text-black/50 dark:text-white/50 mb-8">
            14 jours gratuits • Sans carte bancaire • Résiliable en 1 clic
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-slate-100 dark:bg-surface-dark rounded-full border border-steel-dark/30">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly 
                  ? 'bg-white dark:bg-background-dark text-black dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                isYearly 
                  ? 'bg-white dark:bg-background-dark text-black dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Annuel
              <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-medium">
                -17%
              </span>
            </button>
          </div>
        </motion.div>
        
        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-surface-dark rounded-xl p-6 border-2 transition-all ${
                plan.popular 
                  ? 'border-accent scale-105 shadow-xl shadow-accent/20' 
                  : 'border-steel-dark/30 hover:border-accent/50'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-sm">star</span>
                    Recommandé
                  </span>
                </div>
              )}
              
              {/* Plan header */}
              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-3">
                  {plan.description}
                </p>
                {plan.tagline && (
                  <p className="text-[10px] text-accent font-medium italic">
                    {plan.tagline}
                  </p>
                )}
              </div>
              
              {/* Price */}
              <div className="text-center mb-6">
                {plan.monthlyPrice !== null ? (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isYearly ? 'yearly' : 'monthly'}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-4xl font-bold text-black dark:text-white"
                        >
                          {isYearly ? plan.yearlyPrice : plan.monthlyPrice}€
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-black/60 dark:text-white/60 text-sm">
                        /mois
                      </span>
                    </div>
                    <p className="text-xs text-black/50 dark:text-white/50 mt-1">
                      par {plan.perUnit}
                    </p>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm mt-2 text-success font-medium">
                        Économisez {((plan.monthlyPrice - plan.yearlyPrice) * 12).toFixed(0)}€/an
                      </p>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-black dark:text-white mb-2">
                      Sur devis
                    </div>
                    <p className="text-xs text-black/50 dark:text-white/50">
                      Tarif personnalisé selon vos besoins
                    </p>
                  </div>
                )}
              </div>
              
              {/* Features */}
              <ul className="space-y-2.5 mb-6 min-h-[320px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2 ${
                    feature.highlight ? 'bg-gradient-to-r from-violet-500/15 to-purple-500/15 dark:from-violet-500/25 dark:to-purple-500/25 border border-violet-500/30 dark:border-violet-500/40 rounded-lg p-2.5 -mx-2' : ''
                  }`}>
                    {feature.included ? (
                      <span className={`text-lg flex-shrink-0 ${
                        feature.highlight ? 'text-violet-600 dark:text-violet-400' : 'text-success'
                      }`}>
                        <span className="material-symbols-outlined">check_circle</span>
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-lg flex-shrink-0">cancel</span>
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? feature.highlight
                          ? 'text-violet-700 dark:text-violet-300 font-bold'
                          : 'text-black dark:text-white'
                        : 'text-slate-400 dark:text-slate-600 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <Link 
                href={plan.ctaLink}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20' 
                    : 'bg-slate-100 dark:bg-background-dark text-black dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-steel-dark/30'
                }`}
              >
                {plan.cta}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
