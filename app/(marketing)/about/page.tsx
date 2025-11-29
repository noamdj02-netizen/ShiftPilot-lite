'use client'

import { motion } from 'framer-motion'
import { Users, Target, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Simplicité',
    description: 'Nous croyons que la technologie doit être simple. Pas besoin d\'être un expert pour utiliser ShiftPilot.',
    color: 'purple',
  },
  {
    icon: Target,
    title: 'Efficacité',
    description: 'Chaque fonctionnalité est pensée pour vous faire gagner du temps. Fini les heures perdues sur Excel.',
    color: 'pink',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Nous sommes passionnés par la restauration et comprenons vos défis quotidiens.',
    color: 'red',
  },
  {
    icon: Users,
    title: 'Respect',
    description: 'Nous respectons vos employés et le code du travail. La conformité n\'est pas optionnelle.',
    color: 'blue',
  },
]

const colorMap: { [key: string]: { bg: string; text: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
}

export default function AboutPage() {
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
              À propos
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Nous simplifions la gestion des plannings restaurant
            </h1>
            <p className="text-lg lg:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              ShiftPilot est né d'un constat simple : créer des plannings est chronophage, complexe et source de stress. Nous avons décidé d'y remédier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Notre histoire</h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              ShiftPilot a été créé par une équipe qui connaît bien le monde de la restauration. 
              Nos fondateurs ont eux-mêmes géré des restaurants et vécu la frustration de passer 
              des heures chaque semaine à créer des plannings sur Excel.
            </p>
            <p className="text-foreground-muted leading-relaxed mb-4">
              En 2023, nous avons décidé qu'il était temps de moderniser la gestion des équipes 
              dans la restauration. Aujourd'hui, plus de 500 restaurants nous font confiance pour 
              simplifier leur quotidien.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              Notre mission est simple : vous faire gagner du temps, réduire votre stress et 
              garantir la conformité légale, tout en respectant vos équipes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Nos valeurs
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const colors = colorMap[value.color] || colorMap.purple
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} mx-auto mb-4 flex items-center justify-center`}>
                    <value.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{value.description}</p>
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
              Rejoignez l'aventure ShiftPilot
            </h2>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons simplifier la gestion de votre équipe.
            </p>
            <Link href="/register" className="btn-primary bg-white text-purple-600 hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)] inline-flex items-center gap-2">
              Essayer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

