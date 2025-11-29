'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  MessageSquare, 
  RefreshCw, 
  BarChart3, 
  Clock,
  Globe,
  Users,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Zap,
    title: 'Génération IA',
    description: "L'algorithme crée un planning optimisé en analysant les contraintes, disponibilités et compétences de votre équipe.",
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: 'Respect automatique du code du travail français et de la convention HCR. 100% conforme.',
    color: 'green',
  },
  {
    icon: MessageSquare,
    title: 'Notifications instantanées',
    description: 'SMS, WhatsApp, email. Votre équipe reçoit son planning en temps réel.',
    color: 'pink',
  },
  {
    icon: RefreshCw,
    title: 'Échanges de shifts',
    description: 'Vos employés gèrent leurs échanges. Vous validez en un clic.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Suivez les heures, coûts et tendances. Optimisez votre masse salariale.',
    color: 'purple',
  },
  {
    icon: Clock,
    title: 'Pointage GPS',
    description: 'Pointage depuis le téléphone avec vérification de localisation.',
    color: 'orange',
  },
]

const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
}

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden" id="features">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200">
            <Zap className="w-4 h-4" />
            Fonctionnalités
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Tout pour gérer vos équipes,{' '}
            <span className="text-purple-600">rien de superflu</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Des outils puissants dans une interface simple. 
            Concentrez-vous sur votre restaurant, on s'occupe du reste.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color] || colorMap.purple
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-foreground-muted leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Arrow */}
                <div className="flex justify-end">
                  <div className={`w-9 h-9 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <ArrowRight className={`w-4 h-4 ${colors.text}`} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 lg:mt-20"
        >
          <Link href="/features" className="btn-secondary group inline-flex items-center gap-2">
            Voir toutes les fonctionnalités
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
