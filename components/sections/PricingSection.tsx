'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ArrowRight, X } from 'lucide-react'

const plans = [
  {
    name: 'Lite',
    description: 'Pour les petits restaurants',
    price: { monthly: 19, yearly: 15 },
    features: [
      { text: "Jusqu'à 10 employés", included: true },
      { text: 'Planning hebdomadaire', included: true },
      { text: 'Export PDF', included: true },
      { text: 'Support email', included: true },
      { text: 'Notifications SMS', included: false },
      { text: 'Analytics', included: false },
    ],
    cta: 'Commencer',
    popular: false,
    color: 'foreground',
  },
  {
    name: 'Pro',
    description: 'Pour les restaurants en croissance',
    price: { monthly: 29, yearly: 24 },
    features: [
      { text: "Jusqu'à 25 employés", included: true },
      { text: 'Tout Lite inclus', included: true },
      { text: 'Notifications SMS illimitées', included: true },
      { text: 'Échanges de shifts', included: true },
      { text: 'Dashboard analytics', included: true },
      { text: 'Support prioritaire', included: true },
    ],
    cta: 'Essai gratuit 14 jours',
    popular: true,
    color: 'accent',
  },
  {
    name: 'Business',
    description: 'Pour les groupes et chaînes',
    price: { monthly: 49, yearly: 41 },
    features: [
      { text: 'Employés illimités', included: true },
      { text: 'Tout Pro inclus', included: true },
      { text: 'Multi-établissements', included: true },
      { text: 'API access', included: true },
      { text: 'SSO / SAML', included: true },
      { text: 'Account manager dédié', included: true },
    ],
    cta: 'Nous contacter',
    popular: false,
    color: 'violet',
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  
  return (
    <section className="py-24 lg:py-32 bg-background-secondary relative overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6">
            Tarifs
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple et transparent
          </h2>
          
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-10">
            14 jours d'essai gratuit. Sans carte bancaire. Annulation en 1 clic.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly 
                  ? 'bg-accent text-white shadow-glow-sm' 
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly 
                  ? 'bg-accent text-white shadow-glow-sm' 
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              Annuel
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">
                -20%
              </span>
            </button>
          </div>
        </motion.div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative group rounded-2xl transition-all duration-500 ${
                plan.popular 
                  ? 'glass border-accent/50 shadow-glow scale-105 z-10' 
                  : 'glass border-border hover:border-border-light'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.3)',
                        '0 0 30px rgba(59, 130, 246, 0.5)',
                        '0 0 20px rgba(59, 130, 246, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-4 py-1.5 rounded-full bg-accent text-white text-sm font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Plus populaire
                  </motion.div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-foreground-muted">{plan.description}</p>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isYearly ? 'yearly' : 'monthly'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-5xl font-bold text-foreground"
                      >
                        {isYearly ? plan.price.yearly : plan.price.monthly}€
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-foreground-muted">/mois</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-success mt-1">
                      Économisez {(plan.price.monthly - plan.price.yearly) * 12}€/an
                    </p>
                  )}
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-foreground-subtle/20 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-foreground-subtle" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground-secondary' : 'text-foreground-subtle'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-accent text-white hover:shadow-glow'
                      : 'glass border-border hover:border-accent/50 text-foreground'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-foreground-muted"
        >
          {[
            '14 jours gratuits',
            'Sans carte bancaire',
            'Annulation en 1 clic',
            'Support réactif',
            'Données sécurisées',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
