'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section relative overflow-hidden bg-gradient-to-r from-primary to-secondary">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="container-tight relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Commencez à automatiser vos plannings dès aujourd'hui
          </h2>
          <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Rejoignez les centaines de restaurants qui gagnent du temps et optimisent leur gestion d'équipe avec ShiftPilot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-secondary bg-white text-primary hover:bg-white/90 group">
              Créer mon compte en 2 minutes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-secondary bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20">
              Parler à un expert
            </Link>
          </div>
          <p className="text-sm text-white/90 mt-8 font-medium">
            Aucune carte bancaire requise · Essai gratuit de 14 jours
          </p>
        </motion.div>
      </div>
    </section>
  )
}

