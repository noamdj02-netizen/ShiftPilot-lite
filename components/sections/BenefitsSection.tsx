'use client'

import { motion } from 'framer-motion'
import { Sparkles, X, Zap } from 'lucide-react'

export function BenefitsSection() {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Automatisation IA',
      description: 'Génération automatique de plannings optimisés en quelques secondes',
      color: 'purple',
      gradient: 'from-purple-100 to-purple-50',
    },
    {
      icon: X,
      title: 'Zéro Excel',
      description: 'Fini les tableaux complexes, tout est automatisé et centralisé',
      color: 'primary-yellow',
      gradient: 'from-yellow-100 to-yellow-50',
    },
    {
      icon: Zap,
      title: 'Planning plus rapide',
      description: 'Réduisez votre temps de planification de 3h à 2 minutes',
      color: 'secondary-turquoise',
      gradient: 'from-green-100 to-turquoise-50',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-yellow/5 rounded-full blur-3xl" />

      <div className="container-standard relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${benefit.gradient} rounded-3xl p-8 shadow-pastel hover:shadow-pastel-lg transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-6">
                <benefit.icon className={`w-8 h-8 ${
                  benefit.color === 'purple' ? 'text-primary' :
                  benefit.color === 'primary-yellow' ? 'text-primary-yellow' :
                  'text-secondary-turquoise'
                }`} />
              </div>
              <h3 className="text-2xl font-bold text-text-bright mb-3">{benefit.title}</h3>
              <p className="text-text-mid leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
