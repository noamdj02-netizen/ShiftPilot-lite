'use client'

import { motion } from 'framer-motion'
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
    description: "L'algorithme crée un planning optimisé en analysant les contraintes, disponibilités et compétences de votre équipe. Plus de 10 secondes pour générer votre planning.",
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: 'Respect automatique du code du travail français et de la convention HCR. 100% conforme, plus de stress avec les inspections.',
    color: 'green',
  },
  {
    icon: MessageSquare,
    title: 'Notifications instantanées',
    description: 'SMS, WhatsApp, email. Votre équipe reçoit son planning en temps réel. Fini les oublis et les malentendus.',
    color: 'pink',
  },
  {
    icon: RefreshCw,
    title: 'Échanges de shifts',
    description: "Vos employés gèrent leurs échanges. Vous validez en un clic. Plus besoin d'être au téléphone en permanence.",
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Suivez les heures, coûts et tendances. Optimisez votre masse salariale avec des données précises et en temps réel.',
    color: 'purple',
  },
  {
    icon: Clock,
    title: 'Pointage GPS',
    description: 'Pointage depuis le téléphone avec vérification de localisation. Plus de triche, plus de contrôle manuel.',
    color: 'orange',
  },
  {
    icon: Globe,
    title: 'Multi-établissements',
    description: 'Gérez tous vos restaurants depuis une seule interface. Chaque établissement a son planning, mais vous voyez tout.',
    color: 'violet',
  },
  {
    icon: Users,
    title: 'Gestion des compétences',
    description: 'Assignez automatiquement les bonnes personnes aux bons postes selon leurs compétences et certifications.',
    color: 'purple',
  },
]

const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  violet: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200">
              <Zap className="w-4 h-4" />
              Fonctionnalités
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Tout ce dont vous avez besoin pour gérer votre équipe
            </h1>
            <p className="text-lg lg:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Des fonctionnalités puissantes conçues pour simplifier la planification, réduire les coûts de main-d'œuvre et améliorer la communication avec votre équipe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const colors = colorMap[feature.color] || colorMap.purple
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                  <p className="text-foreground-muted leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex justify-end mt-6">
                    <div className={`w-9 h-9 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <ArrowRight className={`w-4 h-4 ${colors.text}`} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à simplifier vos plannings ?
            </h2>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les 500+ restaurants qui ont déjà simplifié leur gestion d'équipe.
            </p>
            <Link href="/register" className="btn-primary bg-white text-purple-600 hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)] inline-flex items-center gap-2">
              Essayer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
