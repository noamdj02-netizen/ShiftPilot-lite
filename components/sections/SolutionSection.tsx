'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

const benefits = [
  "Planning fait en 2 minutes, pas 3 heures",
  "Équipe prévenue automatiquement par SMS",
  "Code du travail respecté sans y penser",
  "Échanges gérés par les employés eux-mêmes",
]

export function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4 border border-green-200">
              <Sparkles className="w-4 h-4" />
              La solution
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Un outil pensé pour{' '}
              <span className="text-purple-600">vos équipes opérationnelles</span>
            </h2>
            
            <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
              ShiftPilot centralise la planification, la communication et le suivi de vos équipes. 
              Moins d'administration, plus de temps pour votre restaurant. 
              <span className="font-semibold text-foreground"> Simple, rapide, conforme.</span>
            </p>
            
            {/* Benefits list */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-lg text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/register" className="btn-primary group inline-flex items-center gap-2">
                Essayer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-sm text-foreground-muted mt-3">
                Gratuit 14 jours • Sans engagement
              </p>
            </motion.div>
          </motion.div>
          
          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* App screenshot placeholder */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 bg-gradient-to-br from-purple-100 to-pink-100 aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-foreground-muted">Screenshot app</p>
              </div>
            </div>
            
            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">SMS envoyé !</p>
                  <p className="text-xs text-foreground-muted">12 employés notifiés</p>
                </div>
              </div>
            </motion.div>
            
            {/* Time saved indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl px-4 py-3 shadow-[0_10px_30px_rgba(124,58,237,0.4)]"
            >
              <p className="text-2xl font-bold">2 min</p>
              <p className="text-sm opacity-90">au lieu de 3h</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
