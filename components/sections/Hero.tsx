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
            Unifiez. Simplifiez.
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
            Voir le film <span className="material-symbols-outlined text-xl">play_circle</span>
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
          className="relative rounded-[2rem] p-2 bg-gradient-to-b from-black/5 to-black/20 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Screen Content */}
          <div className="relative rounded-3xl overflow-hidden bg-[#F2F2F7] dark:bg-[#1C1C1E] aspect-[16/10] border border-black/5 dark:border-white/5 shadow-inner">
            {/* REAL DASHBOARD UI */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col gap-3 md:gap-4 overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-accent/10"
                    style={{
                      width: Math.random() * 60 + 20,
                      height: Math.random() * 60 + 20,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Header - Enhanced with dynamic title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-primary shadow-sm">
                      <span className="material-symbols-outlined text-white text-xs">
                        {activeView === 'dashboard' ? 'dashboard' : activeView === 'planning' ? 'calendar_month' : 'group'}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={activeView}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm md:text-base font-bold text-slate-900 dark:text-white"
                      >
                        {activeView === 'dashboard' ? 'Tableau de bord' : activeView === 'planning' ? 'Planning' : 'Collaborateurs'}
                      </motion.h2>
                    </AnimatePresence>
                  </motion.div>
                  <div className="h-4 w-px bg-slate-300 dark:bg-steel-dark hidden md:block"></div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-background-dark dark:to-surface-dark px-2.5 py-1.5 rounded-lg text-xs border border-steel-dark/20 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-xs text-accent">store</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Paris - Le Marais</span>
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="size-6 md:size-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer"
                >
                  JD
                </motion.div>
              </motion.div>

              {/* Dynamic Content based on activeView */}
              <AnimatePresence mode="wait">
                {activeView === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col gap-3 md:gap-4 overflow-y-auto"
                  >
                    {/* KPI Cards - Enhanced with animations */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {[
                  { 
                    label: 'CA Aujourd\'hui', 
                    val: '4,200€', 
                    delta: '+8.5%', 
                    trend: 'up', 
                    sub: 'vs hier',
                    icon: 'payments',
                    gradient: 'from-blue-500 to-cyan-500',
                    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20'
                  },
                  { 
                    label: 'Couverts', 
                    val: '156', 
                    delta: '+12%', 
                    trend: 'up', 
                    sub: 'Objectif: 140',
                    icon: 'restaurant',
                    gradient: 'from-emerald-500 to-teal-500',
                    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20'
                  },
                  { 
                    label: 'Factures', 
                    val: '98', 
                    delta: '+5', 
                    trend: 'up', 
                    sub: 'Panier: 42.86€',
                    icon: 'receipt_long',
                    gradient: 'from-purple-500 to-pink-500',
                    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'
                  },
                  { 
                    label: 'Productivité', 
                    val: '84.20€', 
                    delta: '+5.1%', 
                    trend: 'up', 
                    sub: 'CA/heure',
                    icon: 'trending_up',
                    gradient: 'from-orange-500 to-amber-500',
                    bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.7 + idx * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => setHoveredCard(idx)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`relative bg-white dark:bg-surface-dark p-3 md:p-4 rounded-xl border border-steel-dark/30 shadow-sm overflow-hidden group cursor-pointer ${
                      hoveredCard === idx ? 'shadow-lg shadow-accent/20 border-accent/50' : ''
                    }`}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    
                    {/* Icon with gradient */}
                    <div className="relative flex items-start justify-between mb-2">
                      <motion.div
                        className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-sm`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="material-symbols-outlined text-white text-sm md:text-base">
                          {stat.icon}
                        </span>
                      </motion.div>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1, type: "spring" }}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          stat.trend === 'up' 
                            ? 'bg-success/20 text-success border border-success/30' 
                            : 'bg-warning/20 text-warning border border-warning/30'
                        }`}
                      >
                        {stat.delta}
                      </motion.span>
                    </div>

                    <div className="relative">
                      <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        {stat.label}
                      </p>
                      <motion.div 
                        className="flex items-baseline gap-1.5 mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                      >
                        <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                          <AnimatedNumber value={stat.val} delay={0.5 + idx * 0.15} />
                        </p>
                      </motion.div>
                      {stat.sub && (
                        <motion.p 
                          className="text-[10px] text-slate-500 dark:text-slate-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + idx * 0.1 }}
                        >
                          {stat.sub}
                        </motion.p>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      style={{ width: '200%' }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Chart Area - Enhanced */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 min-h-0">
                {/* Main Chart - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="md:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-lg p-3 md:p-4 relative overflow-hidden group"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/10 dark:to-cyan-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex justify-between items-center mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <motion.span
                          className="material-symbols-outlined text-accent text-base"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          auto_graph
                        </motion.span>
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Couverts par heure</h3>
                      </div>
                      <p className="text-[10px] text-slate-500 hidden md:block">Réel vs Prévision IA</p>
                    </div>
                    <div className="flex gap-1">
                      <motion.div
                        className="size-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="size-2 rounded-full bg-purple-500/50" />
                    </div>
                  </div>
                  <div className="h-full min-h-[120px] md:min-h-[150px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { time: '08:00', value: 8, predicted: 10 },
                          { time: '10:00', value: 25, predicted: 22 },
                          { time: '12:00', value: 45, predicted: 42 },
                          { time: '14:00', value: 32, predicted: 35 },
                          { time: '16:00', value: 18, predicted: 20 },
                          { time: '18:00', value: 52, predicted: 48 },
                          { time: '20:00', value: 38, predicted: 40 },
                        ]}
                        margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="heroColorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="heroPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                        <XAxis
                          dataKey="time"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                          dy={5}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1B263B',
                            borderColor: '#415A77',
                            borderRadius: '8px',
                            fontSize: '11px',
                            padding: '8px 12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          }}
                          formatter={(value: number) => [`${value} couverts`, '']}
                          cursor={{ stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' }}
                        />
                        <Area
                          name="Réel"
                          type="monotone"
                          dataKey="value"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#heroColorVal)"
                          animationDuration={1500}
                          animationBegin={1000}
                        />
                        <Area
                          name="IA"
                          type="monotone"
                          dataKey="predicted"
                          stroke="#6C63FF"
                          strokeWidth={2.5}
                          strokeDasharray="5 5"
                          fill="url(#heroPredicted)"
                          fillOpacity={0.3}
                          animationDuration={1500}
                          animationBegin={1200}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Side Cards - Enhanced */}
                <div className="flex flex-col gap-2 md:gap-3">
                  {/* CA Hebdo Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex-1 bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-lg p-3 md:p-4 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/10 dark:to-teal-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-emerald-500 text-sm">show_chart</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">CA Hebdo</h4>
                    </div>
                    <div className="h-full min-h-[60px] md:min-h-[80px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { day: 'Lun', actual: 4200 },
                            { day: 'Mar', actual: 3800 },
                            { day: 'Mer', actual: 4500 },
                            { day: 'Jeu', actual: 4800 },
                            { day: 'Ven', actual: 6200 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1B263B',
                              borderColor: '#415A77',
                              borderRadius: '8px',
                              fontSize: '10px',
                              padding: '6px 10px',
                            }}
                            formatter={(value: number) => [`${value.toLocaleString()}€`, '']}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                          />
                          <Bar 
                            dataKey="actual" 
                            fill="url(#barGradient)" 
                            radius={[4, 4, 0, 0]} 
                            barSize={12}
                            animationDuration={1500}
                            animationBegin={1300}
                          >
                            <defs>
                              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.8} />
                              </linearGradient>
                            </defs>
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Employees Active - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-surface-dark dark:to-background-dark rounded-xl border border-steel-dark/30 shadow-lg p-3 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-accent text-sm">groups</span>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Employés actifs</span>
                      </div>
                      <motion.span
                        className="text-xs font-bold text-accent"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        8/12
                      </motion.span>
                    </div>
                    <div className="flex -space-x-1.5">
                      {['AM', 'BD', 'CL', 'ML', 'TP'].map((initials, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 1.4 + i * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          className="size-6 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white dark:border-surface-dark flex items-center justify-center text-[9px] font-bold text-white shadow-md cursor-pointer"
                        >
                          {initials}
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.9, type: "spring" }}
                        className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-surface-dark flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300 shadow-md"
                      >
                        +3
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Alerts - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-3 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-500/5"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative flex items-center gap-2 mb-1.5">
                      <motion.span
                        className="material-symbols-outlined text-red-500 text-base"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        warning
                      </motion.span>
                      <span className="text-xs font-semibold text-red-700 dark:text-red-400">3 Alertes</span>
                    </div>
                    <p className="text-[10px] text-red-600 dark:text-red-400 relative">Violation repos • Heures sup</p>
                  </motion.div>
                </div>
              </div>
                    </motion.div>
                )}

                {activeView === 'planning' && (
                  <motion.div
                    key="planning"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto"
                  >
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-lg p-3 md:p-4 h-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="material-symbols-outlined text-accent">chevron_left</span>
                          <span className="font-semibold">Semaine 29 (15-21 Juil)</span>
                          <span className="material-symbols-outlined text-accent">chevron_right</span>
                        </div>
                        <button className="px-2 py-1 bg-accent text-white rounded text-[10px] font-medium">
                          <span className="material-symbols-outlined text-xs align-middle mr-1">magic_button</span>
                          IA
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="min-w-[600px] text-[10px]">
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
                    className="flex-1 overflow-y-auto"
                  >
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-lg p-3 md:p-4 h-full">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Collaborateurs</h3>
                        <button className="px-2 py-1 bg-accent text-white rounded text-[10px] font-medium">
                          <span className="material-symbols-outlined text-xs align-middle mr-1">add</span>
                          Nouveau
                        </button>
                      </div>
                      <div className="space-y-2">
                        {demoEmployees.slice(0, 5).map((emp, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
