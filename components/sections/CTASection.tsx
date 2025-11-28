'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  { icon: Zap, text: 'Configuration en 10 min' },
  { icon: Shield, text: '100% conforme légalement' },
  { icon: Clock, text: 'Économisez 3h/semaine' },
]

export function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]"
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet/5 rounded-full blur-[100px]" />
        
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/30 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-accent">
              Offre de lancement : -50% à vie pour les 100 premiers
            </span>
          </motion.div>

          {/* Title - Typographie améliorée */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            Prêt à simplifier vos{' '}
            <span className="relative inline-block">
              <span className="relative z-10 gradient-text">plannings</span>
            </span>
            {' '}?
          </h2>

          {/* Subtitle - Espacement amélioré */}
          <p className="text-lg lg:text-xl xl:text-2xl text-foreground-secondary mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Rejoignez les 500+ restaurants qui économisent des heures chaque semaine.
            <span className="text-foreground font-normal"> Commencez gratuitement.</span>
          </p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground-secondary">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 text-white">Commencer gratuitement</span>
                <ArrowRight className="w-5 h-5 relative z-10 text-white group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-cyan" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: '200% 100%' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 glass glass-hover rounded-xl font-semibold text-foreground border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
              >
                Demander une démo
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-foreground-muted"
          >
            {[
              '14 jours gratuits',
              'Sans carte bancaire',
              'Annulation en 1 clic',
              'Support réactif',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 hidden lg:block"
        >
          <div className="glass rounded-xl p-3 border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm text-foreground-secondary">+23 inscrits</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
