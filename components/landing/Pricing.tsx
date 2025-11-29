'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check, X, Sparkles, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Lite',
    description: 'Pour les petits restos',
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      { text: "Jusqu'à 10 employés", included: true },
      { text: 'Plannings illimités', included: true },
      { text: 'Export PDF', included: true },
      { text: 'Support email', included: true },
      { text: 'Notifications SMS', included: false },
      { text: 'Échanges de shifts', included: false },
      { text: 'Analytics', included: false },
    ],
    cta: 'Commencer',
    href: '/register?plan=lite',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Le plus populaire',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      { text: "Jusqu'à 25 employés", included: true },
      { text: 'Tout Lite inclus', included: true },
      { text: 'Notifications SMS illimitées', included: true },
      { text: 'Échanges de shifts', included: true },
      { text: 'Dashboard analytics', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Import/Export CSV', included: true },
    ],
    cta: 'Essai gratuit 14 jours',
    href: '/register?plan=pro',
    popular: true,
  },
  {
    name: 'Business',
    description: 'Pour les groupes',
    monthlyPrice: 49,
    yearlyPrice: 41,
    features: [
      { text: 'Employés illimités', included: true },
      { text: 'Tout Pro inclus', included: true },
      { text: 'Multi-établissements', included: true },
      { text: 'API access', included: true },
      { text: 'SSO / SAML', included: true },
      { text: 'Account manager dédié', included: true },
      { text: 'Formation incluse', included: true },
    ],
    cta: 'Nous contacter',
    href: '/contact?plan=business',
    popular: false,
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="tarifs" className="section bg-background">
      <div className="container-default">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="badge-primary mb-4">Tarifs transparents</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Moins cher qu'un{' '}
            <span className="text-gradient">plat du jour</span>
          </h2>
          <p className="text-lg text-foreground-secondary mb-8">
            14 jours d'essai gratuit. Sans carte bancaire. Résiliable en 1 clic.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-background-secondary rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly
                  ? 'bg-white text-foreground shadow-soft'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-foreground shadow-soft'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Annuel
              <span className="px-2 py-0.5 bg-success-muted text-success text-xs font-semibold rounded-full">
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
              className={`relative rounded-3xl p-6 lg:p-8 ${
                plan.popular
                  ? 'bg-foreground text-white border-2 border-primary shadow-glow-primary scale-105 z-10'
                  : 'bg-card border-2 border-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-sm font-semibold rounded-full shadow-glow-primary">
                    <Sparkles className="w-4 h-4" />
                    Recommandé
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 pt-2">
                <h3
                  className={`font-display text-xl font-bold mb-1 ${
                    plan.popular ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? 'text-white/70' : 'text-foreground-muted'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price - GROS ET VISIBLE */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-5xl lg:text-6xl font-bold ${
                      plan.popular ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}€
                  </span>
                  <span
                    className={plan.popular ? 'text-white/70' : 'text-foreground-muted'}
                  >
                    /mois
                  </span>
                </div>
                {isYearly && (
                  <p
                    className={`text-sm mt-1 ${
                      plan.popular ? 'text-primary-light' : 'text-success'
                    }`}
                  >
                    Économisez {(plan.monthlyPrice - plan.yearlyPrice) * 12}€/an
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.popular ? 'bg-primary' : 'bg-success-muted'
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.popular ? 'text-white' : 'text-success'
                          }`}
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.popular ? 'bg-white/10' : 'bg-foreground-light/20'
                        }`}
                      >
                        <X
                          className={`w-3 h-3 ${
                            plan.popular ? 'text-white/40' : 'text-foreground-light'
                          }`}
                        />
                      </div>
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? plan.popular
                            ? 'text-white'
                            : 'text-foreground'
                          : plan.popular
                          ? 'text-white/40'
                          : 'text-foreground-light'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-background-secondary text-foreground hover:bg-background-tertiary'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-foreground-muted"
        >
          {[
            '14 jours gratuits',
            'Sans carte bancaire',
            'Résiliable en 1 clic',
            'Support inclus',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

