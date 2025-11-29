'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: "Free",
    description: "Pour tester",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "Jusqu'à 5 employés", included: true },
      { text: "Planning illimité", included: true },
      { text: "Export PDF", included: true },
      { text: "Support email", included: true },
      { text: "Notifications SMS", included: false },
      { text: "Échanges de shifts", included: false },
    ],
    cta: "Démarrer",
    popular: false,
  },
  {
    name: "Pro",
    description: "Le plus populaire",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      { text: "Jusqu'à 25 employés", included: true },
      { text: "Tout Free inclus", included: true },
      { text: "Notifications SMS", included: true },
      { text: "Échanges de shifts", included: true },
      { text: "Statistiques", included: true },
      { text: "Support prioritaire", included: true },
    ],
    cta: "Essai gratuit",
    popular: true,
  },
  {
    name: "Business",
    description: "Pour les groupes",
    monthlyPrice: 49,
    yearlyPrice: 41,
    features: [
      { text: "Employés illimités", included: true },
      { text: "Tout Pro inclus", included: true },
      { text: "Multi-établissements", included: true },
      { text: "API", included: true },
      { text: "Manager dédié", included: true },
      { text: "Formation incluse", included: true },
    ],
    cta: "Nous contacter",
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden" id="pricing">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-4 border border-purple-200">
            Tarifs simples
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Moins cher qu'un plat du jour
          </h2>
          
          <p className="text-lg text-foreground-muted mb-8">
            14 jours gratuits. Sans carte bancaire. Résiliable en 1 clic.
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-gray-100 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly 
                  ? 'bg-white text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.08)]' 
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                isYearly 
                  ? 'bg-white text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.08)]' 
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Annuel
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>
        
        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-2 transition-all ${
                plan.popular 
                  ? 'border-purple-500 scale-105 ring-4 ring-purple-100' 
                  : 'border-gray-100 hover:border-purple-200'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold rounded-full shadow-[0_4px_12px_rgba(124,58,237,0.3)]">
                    <Sparkles className="w-4 h-4" />
                    Recommandé
                  </span>
                </div>
              )}
              
              {/* Plan header */}
              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {plan.description}
                </p>
              </div>
              
              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-5xl font-bold text-foreground"
                    >
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}€
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-foreground-muted">
                    /mois
                  </span>
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm mt-1 text-green-600">
                    Économisez {(plan.monthlyPrice - plan.yearlyPrice) * 12}€/an
                  </p>
                )}
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-gray-400" />
                      </div>
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? 'text-foreground' 
                        : 'text-foreground-muted line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <Link 
                href={plan.name === "Business" ? "/contact" : "/register"}
                className={`w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-[0_10px_30px_rgba(124,58,237,0.4)]' 
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Trust elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-foreground-muted"
        >
          {[
            "14 jours gratuits",
            "Sans carte bancaire",
            "Résiliable en 1 clic",
            "Support inclus",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
