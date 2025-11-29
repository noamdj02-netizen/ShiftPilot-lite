'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: "Starter",
    description: "Petites équipes / Restaurants indépendants",
    monthlyPrice: 29,
    yearlyPrice: 24,
    perUnit: "établissement",
    features: [
      { text: "Jusqu'à 15 employés", included: true },
      { text: "Planning illimité", included: true },
      { text: "Notifications SMS", included: true },
      { text: "Export PDF", included: true },
      { text: "Support email", included: true },
      { text: "Conformité légale basique", included: true },
      { text: "Multi-établissements", included: false },
      { text: "Analytics avancés", included: false },
      { text: "API", included: false },
    ],
    cta: "Essai gratuit",
    ctaLink: "/register",
    popular: false,
  },
  {
    name: "Professional",
    description: "Établissements moyens / Multi-établissements",
    monthlyPrice: 79,
    yearlyPrice: 66,
    perUnit: "établissement",
    features: [
      { text: "Jusqu'à 50 employés", included: true },
      { text: "Tout Starter inclus", included: true },
      { text: "Multi-sites (jusqu'à 3)", included: true },
      { text: "Analytics avancés", included: true },
      { text: "Support prioritaire", included: true },
      { text: "Conformité légale complète", included: true },
      { text: "Auto-planification IA", included: true },
      { text: "API basique", included: true },
      { text: "Formations", included: false },
    ],
    cta: "Essai gratuit",
    ctaLink: "/register",
    popular: true,
  },
  {
    name: "Business",
    description: "Chaînes de taille moyenne",
    monthlyPrice: 99,
    yearlyPrice: 83,
    perUnit: "établissement",
    features: [
      { text: "Employés illimités", included: true },
      { text: "Tout Professional inclus", included: true },
      { text: "Multi-sites illimités", included: true },
      { text: "API complète", included: true },
      { text: "Formations incluses", included: true },
      { text: "Support dédié", included: true },
      { text: "Intégrations personnalisées", included: true },
      { text: "Manager dédié", included: false },
      { text: "SSO", included: false },
    ],
    cta: "Nous contacter",
    ctaLink: "/contact",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "Chaînes / Groupes / Multi-sites / Gros volumes",
    monthlyPrice: null,
    yearlyPrice: null,
    perUnit: "sur devis",
    features: [
      { text: "Tout Business inclus", included: true },
      { text: "SSO (Single Sign-On)", included: true },
      { text: "Intégrations personnalisées", included: true },
      { text: "Manager dédié", included: true },
      { text: "SLA garanti", included: true },
      { text: "Conformité avancée", included: true },
      { text: "Support 24/7", included: true },
      { text: "Développements sur mesure", included: true },
      { text: "Hébergement dédié", included: true },
    ],
    cta: "Demander un devis",
    ctaLink: "/contact?plan=enterprise",
    popular: false,
    custom: true,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#000000] relative overflow-hidden" id="pricing">
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
          
          <p className="text-lg text-black/60 dark:text-white/60 mb-8">
            14 jours gratuits. Sans carte bancaire. Résiliable en 1 clic.
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white dark:bg-surface-dark rounded-xl p-6 border-2 transition-all ${
                plan.popular 
                  ? 'border-accent scale-105 shadow-xl shadow-accent/20' 
                  : plan.custom
                  ? 'border-steel-dark/50 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-background-dark dark:to-surface-dark'
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

              {/* Enterprise badge */}
              {plan.custom && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-accent to-primary text-white text-xs font-semibold rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    Enterprise
                  </span>
                </div>
              )}
              
              {/* Plan header */}
              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {plan.description}
                </p>
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
              <ul className="space-y-2.5 mb-6 min-h-[280px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {feature.included ? (
                      <span className="material-symbols-outlined text-success text-lg flex-shrink-0">check_circle</span>
                    ) : (
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-lg flex-shrink-0">cancel</span>
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? 'text-black dark:text-white' 
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
                    : plan.custom
                    ? 'bg-gradient-to-r from-accent to-primary text-white hover:opacity-90 shadow-lg'
                    : 'bg-slate-100 dark:bg-background-dark text-black dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-steel-dark/30'
                }`}
              >
                {plan.cta}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Trust elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-black/60 dark:text-white/60"
        >
          {[
            "14 jours gratuits",
            "Sans carte bancaire",
            "Résiliable en 1 clic",
            "Support inclus",
            "Conformité garantie",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success text-base">check_circle</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
