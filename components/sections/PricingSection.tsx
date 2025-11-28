'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'LITE',
    price: 19,
    description: 'Parfait pour les petits restaurants',
    features: [
      "Jusqu'à 10 employés",
      'Planning hebdomadaire',
      'Export PDF',
      'Support email',
    ],
    cta: 'Commencer',
    popular: false,
  },
  {
    name: 'PRO',
    price: 29,
    description: 'Pour les restaurants en croissance',
    features: [
      "Jusqu'à 25 employés",
      'Tout LITE +',
      'Notifications SMS',
      'Échanges de shifts',
      'Dashboard analytics',
    ],
    cta: 'Essai gratuit',
    popular: true,
  },
  {
    name: 'BUSINESS',
    price: 49,
    description: 'Pour les groupes et chaînes',
    features: [
      'Employés illimités',
      'Tout PRO +',
      'Multi-établissements',
      'API access',
      'Support prioritaire',
    ],
    cta: 'Nous contacter',
    popular: false,
  },
]

export function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-4">
            Tarifs transparents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Un prix simple, sans surprise
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            14 jours d'essai gratuit. Sans carte bancaire. Annulation en 1 clic.
          </p>
        </motion.div>
        
        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlan(plan.name)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-slate-900 text-white scale-105 shadow-2xl'
                  : 'bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                    <Sparkles className="w-4 h-4" />
                    POPULAIRE
                  </span>
                </motion.div>
              )}
              
              {/* Plan header */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}€
                </span>
                <span className={plan.popular ? 'text-slate-400' : 'text-slate-500'}>
                  /mois
                </span>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-emerald-500' : 'bg-emerald-100'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-emerald-600'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              {/* CTA */}
              <motion.a
                href={plan.cta === 'Nous contacter' ? '/contact' : '/register'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold transition-colors block text-center ${
                  plan.popular
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
        
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-500"
        >
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            Sans engagement
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            Annulation en 1 clic
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            Support réactif
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            Données sécurisées
          </span>
        </motion.div>
      </div>
    </section>
  )
}
