'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  { text: 'Configuration en 10 min' },
  { text: '100% conforme légalement' },
  { text: 'Économisez 3h/semaine' },
]

export function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm font-medium text-white">
              Rejoignez 500+ restaurants déjà satisfaits
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Un outil que vos{' '}
            <span className="text-yellow-300">équipes vont adopter</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez les 500+ restaurants qui ont simplifié leur gestion d'équipe. 
            Plus de visibilité, de conformité et de performance.
            <span className="text-white font-semibold"> Commencez gratuitement.</span>
          </p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <Check className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register" className="btn-primary group bg-white text-purple-600 hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/contact" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
              Demander une démo
            </Link>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-white/80 mt-6"
          >
            14 jours d'essai • Sans carte bancaire • Annulation en 1 clic
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
