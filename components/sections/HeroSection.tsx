'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Calendar, Users, Clock, BarChart3, Bell, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('planning')
  const [hoveredShift, setHoveredShift] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  const employees = [
    { id: '1', name: 'Marie Dupont', role: 'Serveuse', color: 'bg-accent' },
    { id: '2', name: 'Lucas Martin', role: 'Barman', color: 'bg-cyan' },
    { id: '3', name: 'Emma Leroy', role: 'Cuisinière', color: 'bg-violet' },
    { id: '4', name: 'Hugo Robert', role: 'Serveur', color: 'bg-success' },
  ]
  
  const [shifts, setShifts] = useState({
    '1': ['9h-14h', '9h-14h', '', '14h-22h', '14h-22h', '9h-17h', ''],
    '2': ['', '14h-22h', '14h-22h', '14h-22h', '', '17h-23h', '17h-23h'],
    '3': ['6h-14h', '6h-14h', '6h-14h', '', '6h-14h', '', ''],
    '4': ['', '', '11h-19h', '11h-19h', '11h-19h', '11h-19h', ''],
  })
  
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  
  // Templates de plannings variés
  const planningTemplates = [
    {
      '1': ['9h-14h', '9h-14h', '', '14h-22h', '14h-22h', '9h-17h', ''],
      '2': ['', '14h-22h', '14h-22h', '14h-22h', '', '17h-23h', '17h-23h'],
      '3': ['6h-14h', '6h-14h', '6h-14h', '', '6h-14h', '', ''],
      '4': ['', '', '11h-19h', '11h-19h', '11h-19h', '11h-19h', ''],
    },
    {
      '1': ['11h-19h', '', '11h-19h', '11h-19h', '', '14h-22h', '14h-22h'],
      '2': ['14h-22h', '14h-22h', '', '14h-22h', '14h-22h', '', '17h-23h'],
      '3': ['', '6h-14h', '6h-14h', '6h-14h', '6h-14h', '6h-14h', ''],
      '4': ['9h-17h', '9h-17h', '9h-17h', '', '9h-17h', '9h-17h', ''],
    },
    {
      '1': ['', '9h-14h', '9h-14h', '9h-14h', '9h-14h', '', '14h-22h'],
      '2': ['17h-23h', '17h-23h', '', '17h-23h', '17h-23h', '17h-23h', ''],
      '3': ['6h-14h', '', '6h-14h', '6h-14h', '', '6h-14h', '6h-14h'],
      '4': ['11h-19h', '11h-19h', '', '11h-19h', '11h-19h', '', '11h-19h'],
    },
    {
      '1': ['14h-22h', '14h-22h', '14h-22h', '', '14h-22h', '14h-22h', ''],
      '2': ['', '17h-23h', '17h-23h', '17h-23h', '', '17h-23h', '17h-23h'],
      '3': ['6h-14h', '6h-14h', '', '6h-14h', '6h-14h', '6h-14h', ''],
      '4': ['9h-17h', '', '9h-17h', '9h-17h', '', '9h-17h', '9h-17h'],
    },
  ]
  
  const generatePlanning = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Animation de progression
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)
    
    // Simuler la génération IA
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Sélectionner un template aléatoire
    const randomTemplate = planningTemplates[Math.floor(Math.random() * planningTemplates.length)]
    setShifts(randomTemplate)
    
    setGenerationProgress(100)
    setIsGenerating(false)
    clearInterval(interval)
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background simple et professionnel */}
      <div className="absolute inset-0">
        {/* Gradient subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        
        {/* Grid pattern très subtil */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        
        {/* Légère lueur accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <motion.div 
        style={{ y: smoothY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 pb-16"
      >
        {/* Left: Content */}
        <div className="text-center lg:text-left space-y-6 lg:space-y-8">
          {/* Badge simple - Plus raffiné */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-xs font-medium text-accent tracking-wide">
              Nouveau : Génération IA des plannings
            </span>
          </motion.div>
          
          {/* Title - Hiérarchie typographique améliorée */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-foreground tracking-tight"
          >
            Vos plannings resto,{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">simplifiés</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute bottom-0 left-0 right-0 h-2 bg-accent/20 -z-0"
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>
          
          {/* Subtitle - Espacement et lisibilité améliorés */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg sm:text-xl lg:text-2xl text-foreground-secondary leading-[1.6] max-w-xl mx-auto lg:mx-0 font-light"
          >
            L'IA génère vos plannings en 10 secondes. 100% conforme au code du travail.{' '}
            <span className="text-foreground font-normal">Fini les heures perdues sur Excel.</span>
          </motion.p>
          
          {/* CTAs - Design plus premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start pt-2"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
              >
                <span className="relative z-10">Essayer gratuitement</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: '200% 100%' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-background-elevated/80 backdrop-blur-sm border border-border rounded-xl font-semibold text-foreground transition-all duration-300 hover:bg-background-hover hover:border-border-light hover:shadow-md"
              >
                Voir la démo
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Trust indicators - Design plus raffiné */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-wrap items-center gap-4 lg:gap-6 justify-center lg:justify-start pt-2"
          >
            {[
              { icon: Check, text: '14 jours gratuits', color: 'text-success' },
              { icon: Check, text: 'Sans carte bancaire', color: 'text-success' },
              { icon: Check, text: '500+ restaurants', color: 'text-success' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-foreground-secondary group"
              >
                <div className={`w-5 h-5 rounded-full ${item.color.replace('text-', 'bg-')}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                </div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Right: Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto lg:mx-0"
        >
          {/* Glow effect - Plus subtil et professionnel */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-accent/15 via-cyan/15 to-violet/15 rounded-3xl blur-2xl"
          />
          
          {/* Browser frame - Design plus premium */}
          <div className="relative bg-background-elevated/95 backdrop-blur-xl rounded-xl lg:rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-background/50">
            {/* Browser header */}
            <div className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-background-secondary border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-error" />
                <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-warning" />
                <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-success" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 lg:px-4 py-1 bg-background-tertiary rounded-lg text-[10px] lg:text-xs text-foreground-muted">
                  app.shiftpilot.fr/planning
                </div>
              </div>
            </div>
            
            {/* App content */}
            <div className="flex">
              {/* Sidebar - Compacte */}
              <div className="w-12 sm:w-14 bg-background-secondary border-r border-border p-2">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                </div>
                
                {[
                  { icon: Calendar, label: 'Planning', id: 'planning' },
                  { icon: Users, label: 'Employés', id: 'employees' },
                  { icon: Clock, label: 'Pointage', id: 'time' },
                  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
                  { icon: Bell, label: 'Notifications', id: 'notifs' },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-center px-0 py-2 rounded-lg mb-1 transition-colors ${
                      activeTab === item.id 
                        ? 'bg-accent/20 text-accent' 
                        : 'text-foreground-muted hover:bg-background-hover'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.label}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
              
              {/* Main content - Responsive */}
              <div className="flex-1 p-3 sm:p-4 lg:p-6 bg-background min-h-[400px] sm:min-h-[500px] overflow-x-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'planning' && (
                    <motion.div
                      key="planning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Toolbar - Responsive */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 lg:mb-6">
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-foreground">Semaine 48</h3>
                          <p className="text-xs lg:text-sm text-foreground-muted">25 Nov - 1 Déc 2024</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <motion.button
                            onClick={generatePlanning}
                            disabled={isGenerating}
                            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                            whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                            className={`flex-1 sm:flex-none px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm transition-all flex items-center justify-center gap-1.5 lg:gap-2 ${
                              isGenerating 
                                ? 'bg-accent/20 text-accent cursor-wait' 
                                : 'bg-background-elevated text-foreground-secondary hover:bg-background-hover'
                            }`}
                          >
                            {isGenerating ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-3.5 h-3.5 lg:w-4 lg:h-4 border-2 border-accent border-t-transparent rounded-full"
                                />
                                <span>Génération...</span>
                              </>
                            ) : (
                              'Générer auto'
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 sm:flex-none px-3 lg:px-4 py-1.5 lg:py-2 bg-accent text-white rounded-lg text-xs lg:text-sm hover:bg-accent-dark transition-colors flex items-center justify-center gap-1.5 lg:gap-2"
                          >
                            <MessageSquare className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            Publier
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Progress bar during generation */}
                      {isGenerating && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4"
                        >
                          <div className="bg-background-elevated rounded-lg p-3 border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-foreground-secondary">Génération en cours...</span>
                              <span className="text-xs font-semibold text-accent">{generationProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-background-tertiary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${generationProgress}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Planning grid - Plus lisible et responsive */}
                      <div className="bg-background-elevated rounded-lg lg:rounded-xl overflow-x-auto border border-border">
                        <div className="min-w-[600px]">
                          {/* Header row */}
                          <div className="grid grid-cols-8 border-b border-border">
                            <div className="p-2.5 lg:p-3 text-xs lg:text-sm font-semibold text-foreground-muted w-[120px]">Équipe</div>
                            {days.map((day, i) => (
                              <div 
                                key={day}
                                className={`p-2.5 lg:p-3 text-xs lg:text-sm font-semibold text-center min-w-[70px] ${
                                  i >= 5 ? 'text-foreground-subtle' : 'text-foreground-secondary'
                                }`}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          
                          {/* Employee rows */}
                          {employees.map((employee) => {
                            const initials = employee.name.split(' ').map(n => n[0]).join('')
                            return (
                              <div 
                                key={employee.id}
                                className="grid grid-cols-8 border-b border-border/50 hover:bg-background-hover transition-colors"
                              >
                                <div className="p-2.5 lg:p-3 flex items-center gap-2.5 w-[120px] flex-shrink-0">
                                  <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full ${employee.color} flex items-center justify-center text-white font-semibold text-xs lg:text-sm flex-shrink-0`}>
                                    {initials}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs lg:text-sm font-medium text-foreground truncate leading-tight">{employee.name.split(' ')[0]}</p>
                                    <p className="text-[10px] lg:text-xs text-foreground-muted truncate leading-tight">{employee.role}</p>
                                  </div>
                                </div>
                                {shifts[employee.id as keyof typeof shifts].map((shift, i) => (
                                  <motion.div
                                    key={i}
                                    className="p-1.5 lg:p-2 flex items-center justify-center min-w-[70px]"
                                    onHoverStart={() => setHoveredShift(`${employee.id}-${i}`)}
                                    onHoverEnd={() => setHoveredShift(null)}
                                  >
                                    {shift ? (
                                      <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-2 lg:px-2.5 py-1.5 lg:py-2 rounded-md text-[10px] lg:text-xs font-semibold cursor-pointer whitespace-nowrap ${
                                          shift.includes('6h') ? 'bg-cyan/20 text-cyan border border-cyan/30' :
                                          shift.includes('9h') ? 'bg-accent/20 text-accent border border-accent/30' :
                                          shift.includes('11h') ? 'bg-warning/20 text-warning border border-warning/30' :
                                          shift.includes('14h') ? 'bg-violet/20 text-violet border border-violet/30' :
                                          'bg-success/20 text-success border border-success/30'
                                        }`}
                                      >
                                        {shift}
                                      </motion.div>
                                    ) : (
                                      <div className="w-full h-10 lg:h-12 rounded-md border border-dashed border-border opacity-20" />
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                      {/* Stats footer - Responsive */}
                      <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-3 lg:mt-4">
                        <div className="bg-background-elevated rounded-lg p-2.5 lg:p-3 border border-border">
                          <p className="text-[10px] lg:text-xs text-foreground-muted mb-0.5 lg:mb-1">Heures totales</p>
                          <p className="text-lg lg:text-xl font-bold text-foreground">156h</p>
                        </div>
                        <div className="bg-background-elevated rounded-lg p-2.5 lg:p-3 border border-border">
                          <p className="text-[10px] lg:text-xs text-foreground-muted mb-0.5 lg:mb-1">Postes couverts</p>
                          <p className="text-lg lg:text-xl font-bold text-accent">100%</p>
                        </div>
                        <div className="bg-background-elevated rounded-lg p-2.5 lg:p-3 border border-border">
                          <p className="text-[10px] lg:text-xs text-foreground-muted mb-0.5 lg:mb-1">Alertes</p>
                          <p className="text-lg lg:text-xl font-bold text-foreground flex items-center gap-1.5 lg:gap-2">
                            0 <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-success" />
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'employees' && (
                    <motion.div
                      key="employees"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-20"
                    >
                      <Users className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                      <p className="text-foreground-secondary">Gestion des employés</p>
                    </motion.div>
                  )}
                  
                  {activeTab === 'time' && (
                    <motion.div
                      key="time"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-20"
                    >
                      <Clock className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                      <p className="text-foreground-secondary">Pointage en temps réel</p>
                    </motion.div>
                  )}
                  
                  {activeTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-20"
                    >
                      <BarChart3 className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                      <p className="text-foreground-secondary">Analytics et rapports</p>
                    </motion.div>
                  )}
                  
                  {activeTab === 'notifs' && (
                    <motion.div
                      key="notifs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-20"
                    >
                      <Bell className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                      <p className="text-foreground-secondary">Notifications et alertes</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator - Plus discret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-border flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-foreground-muted"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
