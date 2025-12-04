'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { demoEmployees, demoShifts, demoDailyTotals, demoKPIs } from '@/lib/demo-data'

type DemoView = 'dashboard' | 'planning' | 'employees'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeView, setActiveView] = useState<DemoView>('dashboard')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -50])
  const ySub = useTransform(scrollYProgress, [0, 1], [0, -30])
  const scaleDashboard = useTransform(scrollYProgress, [0, 0.4], [1, 1.05])
  const opacityDashboard = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const yDashboard = useTransform(scrollYProgress, [0, 0.4], [0, -40])

  // Animated counter for KPIs
  const AnimatedNumber = ({ value, suffix = '', delay = 0 }: { value: string | number, suffix?: string, delay?: number }) => {
    const [displayValue, setDisplayValue] = useState(0)
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value

    useEffect(() => {
      const timer = setTimeout(() => {
        const duration = 1200
        const steps = 40
        const increment = numValue / steps
        let current = 0
        const interval = setInterval(() => {
          current += increment
          if (current >= numValue) {
            setDisplayValue(numValue)
            clearInterval(interval)
          } else {
            setDisplayValue(current)
          }
        }, duration / steps)
        return () => clearInterval(interval)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }, [numValue, delay])

    if (typeof value === 'string' && value.includes('€')) {
      return <>{displayValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€{suffix}</>
    }
    if (typeof value === 'string' && value.includes('/')) {
      return <>{value}</>
    }
    if (typeof value === 'string' && value.includes('.')) {
      return <>{displayValue.toFixed(2)}€{suffix}</>
    }
    return <>{Math.round(displayValue)}{suffix}</>
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] w-full pt-32 flex flex-col items-center overflow-x-hidden font-sans text-slate-900 dark:text-slate-100 bg-[#F5F5F7] dark:bg-[#000000]"
    >
      {/* Ambient Light */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-gradient-to-b from-blue-400/10 to-transparent pointer-events-none blur-[120px] dark:opacity-20"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 px-3 py-1 rounded-full border border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-black/60 dark:text-white/60"
        >
          Nouvelle Version Enterprise
        </motion.div>

        {/* Title */}
        <motion.h1
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[1.05] text-black dark:text-white"
        >
          Planifiez.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/40 dark:from-white dark:to-white/40">
            Unifiez.
          </span>{' '}
          <span className="relative inline-block">
            <span className="absolute -inset-1 bg-blue-100 dark:bg-blue-900/30 -skew-y-2 rounded-lg -z-10"></span>
            <span className="text-blue-600 dark:text-blue-400">
              Simplifiez.
            </span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          style={{ y: ySub }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-xl md:text-2xl font-medium text-black/60 dark:text-white/60 max-w-2xl leading-relaxed"
        >
          Une orchestration parfaite pour les entreprises multi-sites.
          <br />
          La puissance sans la complexité.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            href="/register"
            className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg transition-colors flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            Commencer
          </Link>
          <button className="h-12 px-8 rounded-full text-blue-600 dark:text-blue-400 font-medium text-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
            Voir la démo <span className="material-symbols-outlined text-xl">play_circle</span>
          </button>
        </motion.div>
      </div>

      {/* INTERACTIVE DEMO SECTION */}
      <motion.div
        style={{ scale: scaleDashboard, opacity: opacityDashboard, y: yDashboard }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-24 w-full max-w-6xl px-4 md:px-0"
      >
        {/* Badge DÉMO INTERACTIVE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl rounded-full border border-black/10 dark:border-white/10 shadow-lg">
            <span className="material-symbols-outlined text-accent text-base">play_circle</span>
            <span className="text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60">
              DÉMO INTERACTIVE
            </span>
          </div>
        </motion.div>

        {/* Navigation Tabs - Above Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <div className="flex items-center gap-1 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl rounded-full p-1.5 border border-black/10 dark:border-white/10 shadow-lg">
            {[
              { id: 'dashboard' as DemoView, label: 'Dashboard', icon: 'dashboard' },
              { id: 'planning' as DemoView, label: 'Planning', icon: 'calendar_month' },
              { id: 'employees' as DemoView, label: 'Collaborateurs', icon: 'group' },
            ].map((view) => (
              <motion.button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeView === view.id
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeView === view.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="material-symbols-outlined text-base relative z-10">
                  {view.icon}
                </span>
                <span className="relative z-10 hidden sm:inline">{view.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

          {/* Hardware Frame - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative rounded-[1.5rem] md:rounded-[2rem] p-1 md:p-2 bg-gradient-to-b from-black/5 to-black/20 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl group mx-auto max-w-[95vw]"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-[1.5rem] md:rounded-[2rem] blur-lg md:blur-xl"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Screen Content */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-[#1C1C1E] aspect-[9/16] md:aspect-[16/10] border border-black/5 dark:border-white/5 shadow-inner h-[600px] md:h-auto">
            {/* REAL DASHBOARD UI with Sidebar */}
            <div className="absolute inset-0 flex overflow-hidden">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="hidden md:flex w-16 md:w-20 bg-slate-50 dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 flex-col items-center py-4 gap-6"
              >
                {/* Logo */}
                <div className="text-[9px] md:text-[10px] font-bold text-slate-900 dark:text-white writing-vertical-rl flex items-center justify-center min-h-[120px]">
                  SHIFTPILOT
                </div>
                
                {/* Navigation */}
                <div className="flex flex-col gap-2 flex-1">
                  {[
                    { icon: 'dashboard', label: 'Tableau de bord', view: 'dashboard' as DemoView },
                    { icon: 'calendar_month', label: 'Planning', view: 'planning' as DemoView },
                    { icon: 'group', label: 'Employés', view: 'employees' as DemoView },
                    { icon: 'schedule', label: 'Disponibilités', view: 'planning' as DemoView },
                    { icon: 'verified', label: 'Conformité', view: 'dashboard' as DemoView },
                  ].map((item, idx) => {
                    const isActive = activeView === item.view
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveView(item.view)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-accent/20 text-accent'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={item.label}
                      >
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Settings */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  title="Paramètres"
                >
                  <span className="material-symbols-outlined text-xl">settings</span>
                </motion.button>
              </motion.div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-1 -ml-1 text-slate-500">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div>
                        <AnimatePresence mode="wait">
                          <motion.h2
                            key={activeView}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-base md:text-xl font-bold text-slate-900 dark:text-white"
                          >
                            {activeView === 'dashboard' ? 'Tableau de bord' : activeView === 'planning' ? 'Planning' : 'Collaborateurs'}
                          </motion.h2>
                        </AnimatePresence>
                        <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                          {activeView === 'dashboard' ? 'Vue d\'ensemble de votre activité' : activeView === 'planning' ? 'Gestion des plannings et shifts' : 'Gestion des équipes'}
                        </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] md:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="text-slate-600 dark:text-slate-300 truncate max-w-[60px] md:max-w-none">Semaine 42</span>
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="size-7 md:size-10 rounded-full bg-accent flex items-center justify-center text-white text-[10px] md:text-xs font-bold cursor-pointer shadow-lg"
                    >
                      AM
                    </motion.div>
                  </div>
                </motion.div>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <AnimatePresence mode="wait">
                    {activeView === 'dashboard' && (
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 h-full"
                      >
                        {/* KPI Cards - Matching image design */}
                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                          {[
                            { 
                              label: 'Heures planifiées', 
                              val: '168h', 
                              delta: '+12%', 
                              trend: 'up',
                              icon: 'schedule',
                              iconBg: 'bg-purple-100 dark:bg-purple-900/30',
                              iconColor: 'text-purple-600 dark:text-purple-400'
                            },
                            { 
                              label: 'Coût salarial', 
                              val: '3 240€', 
                              delta: '-8%', 
                              trend: 'down',
                              icon: 'euro',
                              iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                              iconColor: 'text-blue-600 dark:text-blue-400'
                            },
                            { 
                              label: 'Employés actifs', 
                              val: '12', 
                              delta: '+2', 
                              trend: 'up',
                              icon: 'group',
                              iconBg: 'bg-orange-100 dark:bg-orange-900/30',
                              iconColor: 'text-orange-600 dark:text-orange-400'
                            },
                            { 
                              label: 'Shifts créés', 
                              val: '42', 
                              delta: '+24%', 
                              trend: 'up',
                              icon: 'calendar_month',
                              iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                              iconColor: 'text-blue-600 dark:text-blue-400'
                            },
                          ].map((stat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 md:p-4 shadow-sm"
                            >
                              <div className="flex items-start justify-between mb-2 md:mb-3">
                                <div className={`size-8 md:size-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                                  <span className={`material-symbols-outlined ${stat.iconColor} text-lg md:text-xl`}>
                                    {stat.icon}
                                  </span>
                                </div>
                                <div className={`flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs font-semibold ${
                                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                  {stat.trend === 'up' ? (
                                    <span className="material-symbols-outlined text-xs md:text-sm">trending_up</span>
                                  ) : (
                                    <span className="material-symbols-outlined text-xs md:text-sm">trending_down</span>
                                  )}
                                  {stat.delta}
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mb-0.5 md:mb-1 truncate">{stat.label}</p>
                                <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
                                  {stat.val}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Weekly Planning Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">Planning de la semaine</h3>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1.5 bg-accent hover:bg-accent/90 text-white rounded-lg text-xs md:text-sm font-medium flex items-center gap-1.5 transition-colors shadow-md hover:shadow-lg"
                              onClick={(e) => {
                                e.preventDefault()
                                // Animation de feedback
                                const btn = e.currentTarget
                                btn.style.transform = 'scale(0.95)'
                                setTimeout(() => {
                                  btn.style.transform = 'scale(1)'
                                }, 150)
                              }}
                            >
                              <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="material-symbols-outlined text-sm"
                              >
                                bolt
                              </motion.span>
                              <span className="hidden sm:inline">Générer avec IA</span>
                              <span className="sm:hidden">IA</span>
                            </motion.button>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Aperçu des shifts à venir</p>
                            <div className="space-y-2">
                              {[
                                { name: 'Alice Martin', service: 'Service midi', time: '11h-15h', date: 'Lundi 16/10', hours: '4h' },
                                { name: 'Thomas Bernard', service: 'Service soir', time: '18h-23h', date: 'Mardi 17/10', hours: '5h' },
                                { name: 'Sophie Dubois', service: 'Service complet', time: '10h-22h', date: 'Mercredi 18/10', hours: '12h' },
                              ].map((shift, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 1.3 + idx * 0.1 }}
                                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700"
                                >
                                  <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    {shift.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{shift.name}</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                      {shift.service} · {shift.time}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-medium text-slate-900 dark:text-white">{shift.date}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{shift.hours}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {activeView === 'planning' && (
                      <motion.div
                        key="planning"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-4 md:p-6 h-full">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs">
                              <motion.button
                                whileHover={{ scale: 1.1, x: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              >
                                <span className="material-symbols-outlined text-accent">chevron_left</span>
                              </motion.button>
                              <span className="font-semibold">Semaine 29 (15-21 Juil)</span>
                              <motion.button
                                whileHover={{ scale: 1.1, x: 2 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              >
                                <span className="material-symbols-outlined text-accent">chevron_right</span>
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2 py-1 bg-accent text-white rounded text-[10px] font-medium hover:bg-accent/90 transition-colors"
                            >
                              <span className="material-symbols-outlined text-xs align-middle mr-1">magic_button</span>
                              IA
                            </motion.button>
                          </div>
                          
                          {/* Responsive Planning View */}
                          <div className="overflow-x-auto pb-2">
                            {/* Mobile View (Vertical List) - Visible on small screens */}
                            <div className="md:hidden space-y-3">
                              {demoShifts.slice(0, 3).map((shift, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-200 dark:border-slate-700 p-2">
                                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <div className="size-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                                      {shift.employee.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{shift.employee.split(' ')[0]}</span>
                                  </div>
                                  <div className="flex gap-2 overflow-x-auto pb-1">
                                    {['monday', 'wednesday', 'friday'].map((day) => {
                                      const shiftData = shift[day as keyof typeof shift] as any
                                      if (!shiftData?.start) return null
                                      return (
                                        <div key={day} className="flex-shrink-0 min-w-[80px] rounded border border-blue-500/50 bg-blue-500/20 p-1.5 text-[9px]">
                                          <div className="font-bold text-blue-700 dark:text-blue-300 mb-0.5">
                                            {day === 'monday' ? 'Lun' : day === 'wednesday' ? 'Mer' : 'Ven'}
                                          </div>
                                          <div>{shiftData.start}-{shiftData.end}</div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Desktop View (Table) - Hidden on small screens */}
                            <div className="hidden md:block min-w-[600px] text-[10px]">
                              <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-1">
                                <div className="p-1.5 bg-slate-50 dark:bg-[#151e32] rounded font-semibold text-slate-500 text-left text-[9px]">Collaborateur</div>
                                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                                  <div key={day} className="p-1.5 bg-slate-50 dark:bg-[#151e32] rounded text-center font-semibold text-slate-500 text-[9px]">
                                    {day}
                                  </div>
                                ))}
                                {demoShifts.slice(0, 4).map((shift, i) => (
                                  <React.Fragment key={i}>
                                    <div className="p-1.5 flex items-center gap-1">
                                      <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center text-[8px] font-bold text-accent">
                                        {shift.employee.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div className="text-[9px] font-semibold text-slate-900 dark:text-white truncate">
                                        {shift.employee.split(' ')[0]}
                                      </div>
                                    </div>
                                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                                      const shiftData = shift[day as keyof typeof shift] as any
                                      return (
                                        <div key={day} className="p-0.5 min-h-[40px]">
                                          {shiftData?.start ? (
                                            <div className="h-full rounded border border-blue-500/50 bg-blue-500/20 p-1 flex flex-col text-[8px]">
                                              <div className="font-bold text-blue-700 dark:text-blue-300">{shiftData.start}-{shiftData.end}</div>
                                              {shiftData.covers > 0 && (
                                                <div className="text-[7px] opacity-80 mt-0.5">{shiftData.covers} cov.</div>
                                              )}
                                            </div>
                                          ) : null}
                                        </div>
                                      )
                                    })}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeView === 'employees' && (
                      <motion.div
                        key="employees"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-4 md:p-6 h-full">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Collaborateurs</h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 py-1 bg-accent text-white rounded text-[10px] font-medium hover:bg-accent/90 transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">add</span>
                          Nouveau
                        </motion.button>
                      </div>
                      <div className="space-y-2">
                        {demoEmployees.slice(0, 5).map((emp, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                              {emp.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-slate-900 dark:text-white">{emp.name}</div>
                              <div className="text-[10px] text-slate-500">{emp.role} • {emp.department}</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                emp.status === 'En shift' ? 'bg-success/20 text-success' : 'bg-blue-500/20 text-blue-600'
                              }`}>
                                {emp.status}
                              </div>
                              <div className="text-[9px] text-slate-500 mt-0.5">{emp.hoursThisWeek}h</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
