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
    <section ref={containerRef} className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Simple comme bonjour
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            3 étapes pour en finir avec Excel
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            De l'inscription à votre premier planning publié en moins de 10 minutes.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <span className={`text-6xl font-bold ${
                    step.color === 'emerald' ? 'text-emerald-500/20' :
                    step.color === 'blue' ? 'text-blue-500/20' :
                    'text-purple-500/20'
                  }`}>
                    {step.number}
                  </span>
                  <div className={`flex items-center gap-3 mb-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl ${
                      step.color === 'emerald' ? 'bg-emerald-500/20' :
                      step.color === 'blue' ? 'bg-blue-500/20' :
                      'bg-purple-500/20'
                    } flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 ${
                        step.color === 'emerald' ? 'text-emerald-400' :
                        step.color === 'blue' ? 'text-blue-400' :
                        'text-purple-400'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-lg text-slate-400">{step.description}</p>
                </div>
                
                {/* Center dot */}
                <div className="relative z-10 hidden lg:flex items-center justify-center">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    className={`w-6 h-6 rounded-full ${
                      step.color === 'emerald' ? 'bg-emerald-500' :
                      step.color === 'blue' ? 'bg-blue-500' :
                      'bg-purple-500'
                    } shadow-lg`}
                  />
                </div>
                
                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    style={{ perspective: 1000 }}
                  >
                    {step.visual}
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
