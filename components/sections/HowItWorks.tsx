'use client'

import { motion } from 'framer-motion'
import { Users, Wand2, Send, CheckCircle } from 'lucide-react'
import { SectionShell, StaggerContainer } from '@/components/ui/SectionShell'
import { Card } from '@/components/ui/Card'

const steps = [
  {
    number: "1",
    icon: Users,
    title: "Ajoutez votre équipe",
    description: "Prénom, téléphone, poste. C'est tout ce qu'il faut. Import Excel possible si vous avez déjà une liste.",
    time: "2 min",
    color: "purple",
  },
  {
    number: "2",
    icon: Wand2,
    title: "Définissez vos contraintes",
    description: "Horaires d'ouverture, nombre d'employés par service, compétences requises. L'IA s'adapte à vos besoins.",
    time: "5 min",
    color: "pink",
  },
  {
    number: "3",
    icon: Send,
    title: "L'IA génère le planning",
    description: "Un clic, toute l'équipe reçoit son planning. Ils peuvent confirmer ou demander un échange.",
    time: "10 sec",
    color: "violet",
  },
]

const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-200' },
}

export function HowItWorks() {
  return (
    <SectionShell className="section-padding bg-white">
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
            Comment ShiftPilot crée vos plannings
          </h2>
          <p className="text-xl text-foreground-muted leading-relaxed">
            En 3 étapes simples, vos plannings sont créés, optimisés et envoyés automatiquement.
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const colors = colorMap[step.color] || colorMap.purple
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-transparent">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </div>
                )}
                
                <Card hover className="text-center h-full">
                  {/* Number badge */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.bg} ${colors.border} border-2 mb-6`}>
                    <span className={`text-4xl font-bold ${colors.text}`}>{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} mx-auto mb-4 flex items-center justify-center`}>
                    <step.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground-muted mb-4 leading-relaxed">{step.description}</p>
                  
                  {/* Time badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full text-sm font-medium text-purple-700">
                    <CheckCircle className="w-4 h-4" />
                    {step.time}
                  </span>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
