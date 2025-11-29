'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, MessageSquare, AlertTriangle, Frown } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: '3 heures chaque dimanche',
    description: 'À jongler entre les dispos, les demandes de congés, et les contraintes légales sur Excel.',
    color: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp qui explose',
    description: '"Je peux échanger avec Lucas ?" "C\'est quoi mes horaires ?" "J\'ai pas reçu le planning !"',
    color: 'secondary',
  },
  {
    icon: AlertTriangle,
    title: 'La peur du contrôle',
    description: 'Est-ce que Julie a bien ses 11h de repos ? Marco dépasse-t-il les 48h cette semaine ?',
    color: 'warning',
  },
  {
    icon: Frown,
    title: 'L\'équipe qui râle',
    description: 'Plannings reçus tard, pas équitables, toujours les mêmes qui bossent le weekend...',
    color: 'error',
  },
]

const colorClasses = {
  primary: { bg: 'bg-primary-muted', icon: 'text-primary' },
  secondary: { bg: 'bg-secondary-muted', icon: 'text-secondary' },
  warning: { bg: 'bg-warning-muted', icon: 'text-warning-dark' },
  error: { bg: 'bg-error-muted', icon: 'text-error' },
}

export function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-background-secondary">
      <div className="container-default">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge-error mb-4">
            <Frown className="w-4 h-4" />
            On connaît ça...
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Faire les plannings, c'est{' '}
            <span className="relative">
              <span className="text-error">l'enfer</span>
              <span className="absolute inset-x-0 top-1/2 h-1 bg-error/30" />
            </span>
          </h2>

          <p className="text-lg text-foreground-secondary">
            Vous êtes restaurateur, pas administrateur. Pourtant vous passez des heures 
            chaque semaine sur cette corvée.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => {
            const colors = colorClasses[problem.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card card-padding"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <problem.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-foreground-secondary">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-foreground-secondary">
            Et si on vous disait que tout ça, c'est{' '}
            <span className="font-semibold text-primary">terminé</span> ?
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <div className="w-6 h-10 rounded-full border-2 border-border mx-auto flex justify-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

