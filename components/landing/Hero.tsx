'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle, Star, Clock, Users, Shield, Sparkles } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-background-secondary"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-10 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-soft border border-border mb-8 max-w-full overflow-hidden"
          >
            <div className="flex -space-x-2 shrink-0">
              {['👨‍🍳', '👩‍🍳', '🧑‍🍳'].map((emoji, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-muted to-secondary-muted flex items-center justify-center text-base border-2 border-white"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            <div className="h-4 w-px bg-border shrink-0" />
            <span className="text-sm text-foreground-secondary truncate">
              Rejoignez <span className="font-semibold text-foreground">+500 restaurants</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 text-balance"
          >
            Vos plannings resto en{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="text-gradient">10 secondes</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 10C60 4 240 4 298 10"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Fini les heures perdues sur Excel. L'IA génère vos plannings automatiquement,{' '}
            <span className="font-semibold text-foreground">100% conforme au code du travail</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/register" className="btn-primary group w-full sm:w-auto">
                Essayer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary group w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-muted flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Play className="w-4 h-4 text-secondary ml-0.5" />
              </div>
              Voir la démo
              <span className="text-foreground-muted text-sm">(2 min)</span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 px-4"
          >
            {[
              { icon: CheckCircle, text: '14 jours gratuits' },
              { icon: CheckCircle, text: 'Sans carte bancaire' },
              { icon: CheckCircle, text: 'Prêt en 5 minutes' },
            ].map((item, i) => (
              <motion.span
                key={item.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border text-sm text-foreground-secondary whitespace-nowrap"
              >
                <item.icon className="w-4 h-4 text-success" />
                {item.text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto px-2 sm:px-0"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-60" />

          {/* Main mockup */}
          <div className="relative bg-white rounded-2xl shadow-soft-2xl border border-border overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-background-secondary border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1.5 bg-white rounded-lg text-xs text-foreground-muted border border-border truncate max-w-[200px]">
                  app.shiftpilot.fr/planning
                </div>
              </div>
            </div>

            {/* Planning UI */}
            <div className="p-4 md:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">Semaine 48</h3>
                  <p className="text-sm text-foreground-muted">25 Nov - 1 Déc 2024</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge-success">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Publié
                  </span>
                  <span className="badge-neutral">
                    <Users className="w-3.5 h-3.5" />
                    12 employés
                  </span>
                </div>
              </div>

              {/* Planning Grid */}
              <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-2 scrollbar-thin">
                <div className="min-w-[640px] lg:min-w-full">
                  <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-background-secondary">
                          <th className="text-left p-3 text-sm font-medium text-foreground-muted w-36 border-r border-border">
                            Équipe
                          </th>
                          {['Lun 25', 'Mar 26', 'Mer 27', 'Jeu 28', 'Ven 29', 'Sam 30', 'Dim 1'].map((day, i) => (
                            <th
                              key={day}
                              className={`text-center p-3 text-sm font-medium ${
                                i >= 5 ? 'text-primary' : 'text-foreground-muted'
                              }`}
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Marie', role: 'Serveuse', emoji: '👩', shifts: ['9h-14h', '9h-14h', '', '14h-22h', '14h-22h', '10h-18h', ''] },
                          { name: 'Lucas', role: 'Barman', emoji: '👨', shifts: ['', '17h-00h', '17h-00h', '17h-00h', '', '18h-01h', '18h-01h'] },
                          { name: 'Emma', role: 'Cuisinière', emoji: '👩‍🍳', shifts: ['7h-15h', '7h-15h', '7h-15h', '', '7h-15h', '7h-15h', ''] },
                          { name: 'Hugo', role: 'Serveur', emoji: '🧑', shifts: ['', '', '11h-19h', '11h-19h', '11h-19h', '11h-23h', '11h-23h'] },
                        ].map((employee, idx) => (
                          <tr key={employee.name} className={idx < 3 ? 'border-b border-border' : ''}>
                            <td className="p-3 border-r border-border">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{employee.emoji}</span>
                                <div>
                                  <p className="font-medium text-foreground text-sm">{employee.name}</p>
                                  <p className="text-xs text-foreground-muted">{employee.role}</p>
                                </div>
                              </div>
                            </td>
                            {employee.shifts.map((shift, i) => (
                              <td key={i} className="p-2 text-center">
                                {shift ? (
                                  <span
                                    className={`inline-block px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                                      shift.includes('7h') ? 'bg-info/10 text-info' :
                                      shift.includes('9h') || shift.includes('10h') || shift.includes('11h') ? 'bg-primary-muted text-primary-dark' :
                                      shift.includes('14h') ? 'bg-secondary-muted text-secondary-dark' :
                                      'bg-accent-muted text-accent-dark'
                                    }`}
                                  >
                                    {shift}
                                  </span>
                                ) : (
                                  <span className="text-foreground-light">—</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {[
                  { label: 'Heures totales', value: '156h', color: 'bg-background-secondary' },
                  { label: 'Postes couverts', value: '100%', color: 'bg-success-muted', textColor: 'text-success-dark' },
                  { label: 'Coût estimé', value: '4 280€', color: 'bg-background-secondary' },
                  { label: 'Alertes', value: '0', color: 'bg-background-secondary' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-3 ${stat.color} rounded-xl text-center`}>
                    <p className={`text-lg sm:text-xl font-bold ${stat.textColor || 'text-foreground'}`}>{stat.value}</p>
                    <p className="text-xs text-foreground-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -left-4 lg:-left-8 top-1/4 bg-white rounded-2xl p-4 shadow-soft-lg border border-border hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-muted flex items-center justify-center">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">10 sec</p>
                <p className="text-xs text-foreground-muted">Génération</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -right-4 lg:-right-8 top-1/3 bg-white rounded-2xl p-4 shadow-soft-lg border border-border hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-muted flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">4 SMS</p>
                <p className="text-xs text-foreground-muted">Envoyés ✓</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-5 py-3 shadow-soft-lg border border-border hidden sm:flex items-center gap-3 w-max max-w-[90%]"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm truncate">
              <span className="font-semibold text-foreground">100% conforme</span>
              <span className="text-foreground-muted"> au code du travail</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-warning fill-warning" />
            ))}
          </div>
          <span className="text-foreground-secondary">
            <span className="font-semibold text-foreground">4.9/5</span> sur Capterra
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
