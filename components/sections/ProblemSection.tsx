'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, MessageSquare, AlertTriangle, Frown } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: "3 heures chaque dimanche",
    description: "À jongler entre les dispos, les demandes de congés, et les contraintes légales sur un fichier Excel qui plante.",
    color: "orange",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp qui explose",
    description: '"Je peux échanger avec Lucas ?" "Tu peux me rappeler mes horaires ?" "J\'ai pas reçu le planning !"',
    color: "pink",
  },
  {
    icon: AlertTriangle,
    title: "La peur du contrôle",
    description: "Est-ce que Julie a bien ses 11h de repos ? Est-ce que Marco dépasse pas les 48h ? 🤷",
    color: "red",
  },
  {
    icon: Frown,
    title: "L'équipe qui râle",
    description: "Plannings reçus au dernier moment, pas équitables, toujours les mêmes qui bossent le weekend...",
    color: "purple",
  },
]

const colorMap: { [key: string]: { bg: string; text: string } } = {
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
}

export function ProblemSection() {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-medium text-orange-700 mb-4 border border-orange-200">
            <Frown className="w-4 h-4" />
            On connaît ça...
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Faire les plannings, c'est{' '}
            <span className="text-red-600 line-through decoration-4">l'enfer</span>
          </h2>
          
          <p className="text-lg text-foreground-muted">
            Vous êtes restaurateur, pas administrateur. Pourtant vous passez 
            des heures chaque semaine sur cette corvée.
          </p>
        </motion.div>
        
        {/* Problems grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => {
            const colors = colorMap[problem.color] || colorMap.orange
            
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <problem.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
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
        
        {/* Transition to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-foreground-secondary">
            Et si on vous disait que tout ça, c'est{' '}
            <span className="font-semibold text-purple-600">fini</span> ?
          </p>
        </motion.div>
      </div>
    </section>
  )
}
