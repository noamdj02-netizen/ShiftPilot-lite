'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eye, Shield, TrendingUp, CheckCircle } from 'lucide-react'

const valueProps = [
  {
    icon: Eye,
    title: "Visibilité totale",
    description: "Vue d'ensemble en temps réel de vos équipes, plannings et disponibilités. Plus de surprises, tout est transparent.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Conformité garantie",
    description: "Respect automatique du code du travail : repos obligatoires, heures max, temps de pause. Zéro risque de contrôle.",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Performance optimisée",
    description: "Plannings équitables, équipes motivées, moins d'absentéisme. Vos indicateurs s'améliorent naturellement.",
    color: "blue",
  },
]

const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
}

export function ValuePropsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tout ce dont vous avez besoin pour{' '}
            <span className="text-purple-600">gérer vos équipes</span>
          </h2>
          
          <p className="text-lg text-foreground-muted leading-relaxed">
            ShiftPilot centralise la planification, la communication et le suivi. 
            Moins d'administration, plus de temps pour votre restaurant.
          </p>
        </motion.div>
        
        {/* Value props grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {valueProps.map((prop, index) => {
            const colors = colorMap[prop.color] || colorMap.purple
            
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 border-2 ${colors.border}`}>
                    <prop.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    {prop.description}
                  </p>
                  
                  {/* Check mark */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-foreground-muted">
                    <CheckCircle className={`w-5 h-5 ${colors.text}`} />
                    <span>Inclus dans tous les plans</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
