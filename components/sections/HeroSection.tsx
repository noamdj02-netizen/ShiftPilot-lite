'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play, Sparkles, Check } from 'lucide-react'
import Link from 'next/link'

// Dynamic import pour éviter le SSR avec Three.js
const Scene3D = dynamic(
  () => import('./Scene3D').then((mod) => ({ default: mod.Scene3D })),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-foreground-muted">Chargement...</div>
  }
)

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set((clientX - width / 2) / 50)
    mouseY.set((clientY - height / 2) / 50)
  }
  
  const titleWords = ['Vos', 'plannings', 'resto,', 'simplifiés.']
  
  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Radial glow */}
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px]"
        />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet/10 rounded-full blur-[80px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 noise" />
      </div>
      
      <motion.div 
        style={{ y: smoothY, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20"
      >
        {/* Left: Content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-foreground-secondary">
              Nouveau : Génération IA des plannings
            </span>
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className={`inline-block mr-4 ${
                  i === 1 ? 'gradient-text' : 'text-foreground'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-foreground-secondary mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            L'IA génère vos plannings en 10 secondes. 100% conforme au code du travail. 
            <span className="text-foreground"> Fini les heures perdues sur Excel.</span>
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-accent text-white rounded-xl font-semibold overflow-hidden shadow-glow transition-shadow hover:shadow-glow-lg"
            >
              <Link href="/register" className="relative z-10 flex items-center justify-center gap-2">
                Essayer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_100%] animate-gradient-shift" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 glass glass-hover rounded-xl font-semibold flex items-center justify-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Play className="w-4 h-4 text-accent ml-0.5" />
              </div>
              <span className="text-foreground">Voir la démo</span>
              <span className="text-foreground-muted text-sm">2 min</span>
            </motion.button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 justify-center lg:justify-start"
          >
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-background-elevated to-background-tertiary border-2 border-background ring-2 ring-accent/20"
                />
              ))}
            </div>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-foreground-secondary">
                <span className="font-semibold text-foreground">4.9/5</span> · 500+ restaurants
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Right: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[500px] lg:h-[650px]"
        >
          <div className="w-full h-full">
            <Scene3D />
          </div>
          
          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute top-16 -left-4 lg:left-0"
          >
            <div className="glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">10s</p>
                  <p className="text-xs text-foreground-muted">génération planning</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-32 -right-4 lg:right-0"
          >
            <div className="glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-xs text-foreground-muted">conforme légalement</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="glass rounded-2xl px-6 py-3 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent/50" />
                  <div className="w-8 h-8 rounded-full bg-cyan/30 border border-cyan/50" />
                  <div className="w-8 h-8 rounded-full bg-violet/30 border border-violet/50" />
                </div>
                <p className="text-sm text-foreground-secondary">
                  <span className="font-semibold text-foreground">+23</span> inscrits aujourd'hui
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
