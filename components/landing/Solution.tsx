'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react'

const benefits = [
  'Planning généré en 10 secondes, pas 3 heures',
  'Équipe prévenue automatiquement par SMS',
  'Code du travail respecté sans y penser',
  'Échanges gérés par les employés eux-mêmes',
  'Toujours à jour, accessible partout',
]

export function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-background">
      <div className="container-default">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-success mb-4">
              <Sparkles className="w-4 h-4" />
              La solution
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              ShiftPilot fait le boulot{' '}
              <span className="text-gradient">à votre place</span>
            </h2>

            <p className="text-lg text-foreground-secondary mb-8">
              Vous indiquez qui travaille et quand vous avez besoin de monde. 
              On s'occupe du reste. <span className="font-semibold text-foreground">Vraiment.</span>
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-lg text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/register" className="btn-primary group">
                Essayer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-sm text-foreground-muted mt-3">
                Gratuit 14 jours • Sans engagement • Sans carte bancaire
              </p>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="card card-padding bg-error-muted/30 border-error/20">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-error-muted mb-3">
                    <span className="text-2xl">😩</span>
                  </span>
                  <p className="font-semibold text-error">Avant</p>
                </div>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-error">✗</span> 3h sur Excel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-error">✗</span> WhatsApp H24
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-error">✗</span> Stress légal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-error">✗</span> Équipe mécontente
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="card card-padding bg-success-muted/30 border-success/20">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-muted mb-3">
                    <span className="text-2xl">😎</span>
                  </span>
                  <p className="font-semibold text-success">Après</p>
                </div>
                <ul className="space-y-2 text-sm text-foreground-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> 10 secondes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> SMS automatiques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> 100% conforme
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-success">✓</span> Équipe ravie
                  </li>
                </ul>
              </div>
            </div>

            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl px-6 py-4 shadow-glow-primary"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <div>
                  <p className="font-bold">3h → 10 sec</p>
                  <p className="text-sm opacity-90">Chaque semaine</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

