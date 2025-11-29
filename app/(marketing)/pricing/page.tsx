'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  
  const plans = [
    {
      name: "Free",
      description: "Pour tester",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Jusqu'à 5 employés",
        "Planning illimité",
        "Export PDF",
        "Support email",
        "Notifications SMS",
        "Échanges de shifts",
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
        "Jusqu'à 25 employés",
        "Tout Free inclus",
        "Notifications SMS",
        "Échanges de shifts",
        "Statistiques avancées",
        "Support prioritaire",
        "Multi-établissements",
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
        "Employés illimités",
        "Tout Pro inclus",
        "Multi-établissements",
        "API complète",
        "Manager dédié",
        "Formation incluse",
        "Support 24/7",
      ],
      cta: "Nous contacter",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-200/30 rounded-full blur-3xl" />
        
        <div className="container-standard relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Choisissez le plan adapté à votre restaurant
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-8">
              14 jours d'essai gratuit • Sans engagement • Annulation en 1 clic
            </p>
            
            {/* Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 bg-white rounded-full shadow-framer">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !isYearly
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  isYearly
                    ? 'bg-primary text-white shadow-sm'
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
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-standard">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  hover={false}
                  className={`relative h-full flex flex-col ${
                    plan.popular
                      ? 'border-2 border-primary ring-4 ring-primary/10 scale-105'
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-full shadow-framer">
                        <Sparkles className="w-4 h-4" />
                        Recommandé
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-foreground-muted">{plan.description}</p>
                  </div>
                  
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
                      <span className="text-foreground-muted">/mois</span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm mt-1 text-green-600">
                        Économisez {(plan.monthlyPrice - plan.yearlyPrice) * 12}€/an
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={plan.name === "Business" ? "/contact" : "/register"}
                    className={`w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-framer-lg'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Trust elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted"
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
    </div>
  )
}
