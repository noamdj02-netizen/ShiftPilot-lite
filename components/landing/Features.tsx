'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  MessageSquare, 
  RefreshCw, 
  BarChart3, 
  MapPin,
  Building2,
  Users,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Génération IA',
    description: 'L\'algorithme analyse contraintes, disponibilités et compétences pour créer le planning optimal.',
    color: 'primary',
    size: 'large',
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: 'Code du travail et convention HCR respectés automatiquement.',
    color: 'success',
    size: 'small',
  },
  {
    icon: MessageSquare,
    title: 'Notifications SMS',
    description: 'Équipe prévenue en temps réel. WhatsApp et email aussi.',
    color: 'secondary',
    size: 'small',
  },
  {
    icon: RefreshCw,
    title: 'Échanges de shifts',
    description: 'Vos employés gèrent leurs échanges. Vous validez en un clic.',
    color: 'accent',
    size: 'medium',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Suivez heures, coûts et tendances. Optimisez votre masse salariale.',
    color: 'warning',
    size: 'medium',
  },
  {
    icon: MapPin,
    title: 'Pointage GPS',
    description: 'Pointage mobile avec vérification de localisation.',
    color: 'error',
    size: 'small',
  },
  {
    icon: Building2,
    title: 'Multi-établissements',
    description: 'Gérez tous vos restaurants depuis une seule interface.',
    color: 'secondary',
    size: 'small',
  },
  {
    icon: Users,
    title: 'Gestion compétences',
    description: 'Assignez les bonnes personnes aux bons postes automatiquement.',
    color: 'primary',
    size: 'large',
  },
]

const colorClasses = {
  primary: { bg: 'bg-primary-muted', icon: 'text-primary', border: 'hover:border-primary/30' },
  secondary: { bg: 'bg-secondary-muted', icon: 'text-secondary', border: 'hover:border-secondary/30' },
  success: { bg: 'bg-success-muted', icon: 'text-success', border: 'hover:border-success/30' },
  warning: { bg: 'bg-warning-muted', icon: 'text-warning-dark', border: 'hover:border-warning/30' },
  error: { bg: 'bg-error-muted', icon: 'text-error', border: 'hover:border-error/30' },
  accent: { bg: 'bg-accent-muted', icon: 'text-accent', border: 'hover:border-accent/30' },
}

export function Features() {
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
          <span className="badge-primary mb-4">
            <Zap className="w-4 h-4" />
            Fonctionnalités
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tout pour gérer vos équipes,{' '}
            <span className="text-gradient">rien de superflu</span>
          </h2>

          <p className="text-lg text-foreground-secondary">
            Des outils puissants dans une interface simple. 
            Concentrez-vous sur votre restaurant, on s'occupe du reste.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`card card-padding card-hover group relative ${colors.border} ${
                  feature.size === 'large' ? 'lg:col-span-2 lg:row-span-2' :
                  feature.size === 'medium' ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colors.icon}`} />
                </div>

                {/* Content */}
                <h3 className={`font-display font-semibold text-foreground mb-2 ${
                  feature.size === 'large' ? 'text-xl lg:text-2xl' : 'text-lg'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-foreground-secondary ${
                  feature.size === 'large' ? 'text-base lg:text-lg' : 'text-sm'
                }`}>
                  {feature.description}
                </p>

                {/* Arrow on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <ArrowRight className={`w-4 h-4 ${colors.icon}`} />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

