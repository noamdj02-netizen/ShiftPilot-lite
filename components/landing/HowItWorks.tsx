'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Wand2, Send, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Ajoutez votre équipe',
    description: 'Prénom, téléphone, poste. C\'est tout. Import Excel possible.',
    time: '2 min',
    color: 'primary',
  },
  {
    number: '2',
    icon: Wand2,
    title: 'Cliquez sur "Générer"',
    description: 'L\'IA crée le planning parfait : équitable, légal, optimisé.',
    time: '10 sec',
    color: 'secondary',
  },
  {
    number: '3',
    icon: Send,
    title: 'Envoyez par SMS',
    description: 'Un clic, toute l\'équipe reçoit son planning sur son téléphone.',
    time: '1 clic',
    color: 'success',
  },
]

const colorClasses = {
  primary: { bg: 'bg-primary', light: 'bg-primary-muted', text: 'text-primary' },
  secondary: { bg: 'bg-secondary', light: 'bg-secondary-muted', text: 'text-secondary' },
  success: { bg: 'bg-success', light: 'bg-success-muted', text: 'text-success' },
}

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-foreground text-white" id="fonctionnalites">
      <div className="container-default">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/80 mb-4">
            Simple comme bonjour
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            3 étapes, 5 minutes,{' '}
            <span className="text-primary-light">c'est réglé</span>
          </h2>

          <p className="text-lg text-white/70">
            Pas de formation. Pas de consultant. Pas de prise de tête.
            Si vous savez utiliser WhatsApp, vous savez utiliser ShiftPilot.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-0.5 bg-white/20">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      className="h-full bg-white/40 origin-left"
                    />
                  </div>
                )}

                {/* Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15, type: 'spring' }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 mb-6"
                >
                  <span className="text-5xl font-bold text-white">{step.number}</span>
                </motion.div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${colors.bg} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/70 mb-4">{step.description}</p>

                {/* Time badge */}
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-success-light" />
                  {step.time}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground font-semibold text-lg rounded-2xl hover:bg-white/90 transition-colors group shadow-soft-lg"
          >
            Démarrer maintenant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-white/60 text-sm mt-3">
            Configuration en 5 minutes chrono
          </p>
        </motion.div>
      </div>
    </section>
  )
}

