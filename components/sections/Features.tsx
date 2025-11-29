'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  CalendarCheck, 
  FileDown, 
  Building2 
} from 'lucide-react'
import { SectionReveal, StaggerContainer } from '@/components/ui/SectionReveal'

const features = [
  {
    icon: Zap,
    title: 'Planning automatisé par IA',
    description: 'Créez des plannings optimisés en quelques secondes grâce à notre intelligence artificielle avancée',
    color: '#8976FD',
    gradient: 'from-[#8976FD] to-[#7180FF]',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité Code du Travail',
    description: 'Respect automatique des réglementations et des conventions collectives de la restauration',
    color: '#7180FF',
    gradient: 'from-[#7180FF] to-[#6CC8FF]',
  },
  {
    icon: TrendingUp,
    title: 'Prévision des coûts',
    description: 'Estimez votre masse salariale en temps réel et optimisez votre budget automatiquement',
    color: '#FCA61F',
    gradient: 'from-[#FCA61F] to-[#FBBF24]',
  },
  {
    icon: CalendarCheck,
    title: 'Gestion des disponibilités',
    description: 'Collectez et intégrez automatiquement les disponibilités et préférences de votre équipe',
    color: '#6CC8FF',
    gradient: 'from-[#6CC8FF] to-[#7180FF]',
  },
  {
    icon: FileDown,
    title: 'Export PDF et Excel',
    description: 'Exportez vos plannings dans le format de votre choix en un seul clic',
    color: '#8976FD',
    gradient: 'from-[#8976FD] to-[#7180FF]',
  },
  {
    icon: Building2,
    title: 'Multi-établissements',
    description: 'Gérez plusieurs restaurants depuis une seule interface centralisée',
    color: '#7180FF',
    gradient: 'from-[#7180FF] to-[#6CC8FF]',
  },
]

export function Features() {
  return (
    <section id="fonctionnalites" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-20">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ color: '#1a1a2e' }}
          >
            Fonctionnalités principales
          </h2>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto font-medium">
            Tout ce dont vous avez besoin pour gérer vos plannings de manière professionnelle
          </p>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-indigo-100 transition-all hover:shadow-[0_24px_64px_rgba(137,118,253,0.15)] shadow-premium"
            >
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all hover:-translate-y-0.5 bg-gradient-to-br ${feature.gradient} bg-opacity-10`}
                style={{ 
                  background: feature.gradient.includes('#8976FD') ? 'linear-gradient(135deg, rgba(137, 118, 253, 0.1) 0%, rgba(113, 128, 255, 0.1) 100%)' :
                          feature.gradient.includes('#7180FF') ? 'linear-gradient(135deg, rgba(113, 128, 255, 0.1) 0%, rgba(108, 200, 255, 0.1) 100%)' :
                          feature.gradient.includes('#FCA61F') ? 'linear-gradient(135deg, rgba(252, 166, 31, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)' :
                          'linear-gradient(135deg, rgba(108, 200, 255, 0.1) 0%, rgba(113, 128, 255, 0.1) 100%)'
                }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900">{feature.title}</h3>
              <p className="text-base text-indigo-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
