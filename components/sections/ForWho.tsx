'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Coffee, Wine } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Card } from '@/components/ui/Card'

const categories = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description: "Gérez vos équipes de cuisine et de salle. Plannings optimisés selon les pics d'affluence, rotations équitables, gestion des compétences.",
    color: "purple",
  },
  {
    icon: Wine,
    title: "Bars",
    description: "Gestion simplifiée des shifts de soirée, week-ends et événements. Respect des heures de nuit et des repos obligatoires.",
    color: "pink",
  },
  {
    icon: Coffee,
    title: "Cafés & Franchises",
    description: "Multi-établissements, plannings centralisés, gestion des remplacements. Parfait pour les chaînes et réseaux.",
    color: "orange",
  },
]

const colorMap: { [key: string]: { bg: string; text: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
}

export function ForWho() {
  return (
    <SectionShell className="section-padding bg-gray-50">
      <div className="container-standard">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Pour qui ?
          </h2>
          <p className="text-xl text-foreground-muted leading-relaxed">
            ShiftPilot s'adapte à tous les types d'établissements de restauration.
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const colors = colorMap[category.color] || colorMap.purple
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} mx-auto mb-6 flex items-center justify-center`}>
                    <category.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {category.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-foreground-muted leading-relaxed">
                    {category.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

