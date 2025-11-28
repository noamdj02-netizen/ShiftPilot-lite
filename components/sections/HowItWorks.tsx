'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Upload, Wand2, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Importez votre équipe',
    description: 'Ajoutez vos employés en 30 secondes. Import CSV disponible.',
    color: 'emerald',
    visual: (
      <div className="bg-slate-800 rounded-xl p-4 w-full max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-slate-700 rounded" />
            <div className="h-2 w-16 bg-slate-700/50 rounded mt-1" />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20" />
          <div className="flex-1">
            <div className="h-3 w-20 bg-slate-700 rounded" />
            <div className="h-2 w-12 bg-slate-700/50 rounded mt-1" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20" />
          <div className="flex-1">
            <div className="h-3 w-28 bg-slate-700 rounded" />
            <div className="h-2 w-14 bg-slate-700/50 rounded mt-1" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    icon: Wand2,
    title: 'Générez le planning',
    description: 'Un clic et l\'IA crée un planning optimisé et légal.',
    color: 'blue',
    visual: (
      <div className="bg-slate-800 rounded-xl p-4 w-full max-w-xs">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">Génération en cours...</p>
          <div className="h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    icon: Send,
    title: 'Partagez à l\'équipe',
    description: 'Envoyez par SMS ou WhatsApp en un clic.',
    color: 'purple',
    visual: (
      <div className="bg-slate-800 rounded-xl p-4 w-full max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
          <span className="text-sm text-slate-300">Marie - SMS envoyé</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
          <span className="text-sm text-slate-300">Lucas - SMS envoyé</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
          >
            <span className="text-xs">...</span>
          </motion.div>
          <span className="text-sm text-slate-400">Emma - Envoi...</span>
        </div>
      </div>
    ),
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])
  
  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-background-secondary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Design plus raffiné */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-block px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6 backdrop-blur-sm"
          >
            Simple comme bonjour
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            3 étapes pour en finir avec Excel
          </h2>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            De l'inscription à votre premier planning publié en moins de 10 minutes.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - Design premium */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border/30 -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-cyan to-violet"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-20 lg:space-y-24">
            {steps.map((step, index) => {
              const colorMap = {
                emerald: { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent', dot: 'bg-accent' },
                blue: { bg: 'bg-cyan/10', border: 'border-cyan/20', text: 'text-cyan', dot: 'bg-cyan' },
                purple: { bg: 'bg-violet/10', border: 'border-violet/20', text: 'text-violet', dot: 'bg-violet' },
              }
              const colors = colorMap[step.color as keyof typeof colorMap]
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <span className={`text-6xl lg:text-7xl font-bold ${colors.text}/10 mb-2 block`}>
                      {step.number}
                    </span>
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center transition-all duration-300`}
                      >
                        <step.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colors.text}`} />
                      </motion.div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-lg lg:text-xl text-foreground-secondary leading-relaxed font-light">{step.description}</p>
                  </div>
                  
                  {/* Center dot - Design premium */}
                  <div className="relative z-10 hidden lg:flex items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                      className={`w-6 h-6 rounded-full ${colors.dot} shadow-lg`}
                      style={{
                        boxShadow: colors.dot === 'bg-accent' ? '0 10px 30px rgba(59, 130, 246, 0.3)' :
                                   colors.dot === 'bg-cyan' ? '0 10px 30px rgba(6, 182, 212, 0.3)' :
                                   '0 10px 30px rgba(139, 92, 246, 0.3)'
                      }}
                    />
                  </div>
                  
                  {/* Visual - Design premium */}
                  <div className="flex-1 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className="w-full max-w-sm"
                    >
                      {step.visual}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
