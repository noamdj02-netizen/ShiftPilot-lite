'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  Clock, 
  BarChart3, 
  Bell,
  Check,
  MessageSquare
} from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('planning')
  const [hoveredShift, setHoveredShift] = useState<string | null>(null)
  
  const employees = [
    { id: '1', name: 'Marie Dupont', role: 'Serveuse', avatar: '👩' },
    { id: '2', name: 'Lucas Martin', role: 'Barman', avatar: '👨' },
    { id: '3', name: 'Emma Leroy', role: 'Cuisinière', avatar: '👩‍🍳' },
    { id: '4', name: 'Hugo Robert', role: 'Serveur', avatar: '👨‍🍳' },
  ]
  
  const shifts = {
    '1': ['9h-14h', '9h-14h', '', '14h-22h', '14h-22h', '9h-17h', ''],
    '2': ['', '14h-22h', '14h-22h', '14h-22h', '', '17h-23h', '17h-23h'],
    '3': ['6h-14h', '6h-14h', '6h-14h', '', '6h-14h', '', ''],
    '4': ['', '', '11h-19h', '11h-19h', '11h-19h', '11h-19h', ''],
  }
  
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Design plus raffiné */}
        <SectionReveal className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-block px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6 backdrop-blur-sm"
          >
            Interface intuitive
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Un dashboard pensé pour les restaurateurs
          </h2>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Visualisez, modifiez et partagez vos plannings en quelques clics. 
            Pas besoin de formation, c'est intuitif.
          </p>
        </SectionReveal>
        
        {/* Dashboard Mockup */}
        <SectionReveal delay={0.2}>
          <div className="relative">
          {/* Glow effect - Plus subtil */}
          <motion.div
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 bg-gradient-to-r from-accent/15 via-cyan/15 to-violet/15 rounded-3xl blur-2xl"
          />
          
          {/* Browser frame - Design premium */}
          <div className="relative bg-background-elevated/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-background/50">
            {/* Browser header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-background-secondary border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-background-tertiary rounded-lg text-xs text-foreground-muted">
                  app.shiftpilot.fr/planning
                </div>
              </div>
            </div>
            
            {/* App content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-16 lg:w-56 bg-background-secondary border-r border-border p-3 lg:p-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <span className="hidden lg:block text-foreground font-semibold">ShiftPilot</span>
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-300 ${
                      activeTab === item.id 
                        ? 'bg-accent/20 text-accent' 
                        : 'text-foreground-muted hover:bg-background-hover'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="hidden lg:block text-sm">{item.label}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Main content */}
              <div className="flex-1 p-4 lg:p-6 bg-background min-h-[500px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'planning' && (
                    <motion.div
                      key="planning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Toolbar - Design premium */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Semaine 48</h3>
                          <p className="text-sm text-foreground-muted">25 Nov - 1 Déc 2024</p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-background-elevated text-foreground-secondary rounded-lg text-sm hover:bg-background-hover transition-all duration-300 border border-border"
                          >
                            Générer auto
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition-all duration-300 flex items-center gap-2 shadow-glow-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Publier
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Planning grid - Design premium */}
                      <div className="bg-background-elevated rounded-xl overflow-hidden border border-border">
                        {/* Header row */}
                        <div className="grid grid-cols-8 border-b border-border">
                          <div className="p-3 text-sm font-semibold text-foreground-muted">Équipe</div>
                          {days.map((day, i) => (
                            <div 
                              key={day}
                              className={`p-3 text-sm font-semibold text-center ${
                                i >= 5 ? 'text-foreground-subtle' : 'text-foreground-secondary'
                              }`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Employee rows */}
                        {employees.map((employee) => (
                          <div 
                            key={employee.id}
                            className="grid grid-cols-8 border-b border-border/50 hover:bg-background-hover transition-colors duration-300"
                          >
                            <div className="p-3 flex items-center gap-2">
                              <span className="text-lg">{employee.avatar}</span>
                              <div className="hidden lg:block">
                                <p className="text-sm font-medium text-foreground">{employee.name.split(' ')[0]}</p>
                                <p className="text-xs text-foreground-muted">{employee.role}</p>
                              </div>
                            </div>
                            {shifts[employee.id as keyof typeof shifts].map((shift, i) => (
                              <motion.div
                                key={i}
                                className="p-2 flex items-center justify-center"
                                onHoverStart={() => setHoveredShift(`${employee.id}-${i}`)}
                                onHoverEnd={() => setHoveredShift(null)}
                              >
                                {shift ? (
                                  <motion.div
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all duration-300 ${
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
                                  <div className="w-full h-8 rounded-md border border-dashed border-border opacity-20" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      {/* Stats footer - Design premium */}
                      <div className="flex gap-4 mt-4">
                        <div className="flex-1 bg-background-elevated rounded-lg p-3 border border-border">
                          <p className="text-xs text-foreground-muted mb-1">Heures totales</p>
                          <p className="text-xl font-bold text-foreground">156h</p>
                        </div>
                        <div className="flex-1 bg-background-elevated rounded-lg p-3 border border-border">
                          <p className="text-xs text-foreground-muted mb-1">Postes couverts</p>
                          <p className="text-xl font-bold text-accent">100%</p>
                        </div>
                        <div className="flex-1 bg-background-elevated rounded-lg p-3 border border-border">
                          <p className="text-xs text-foreground-muted mb-1">Alertes</p>
                          <p className="text-xl font-bold text-foreground flex items-center gap-2">
                            0 <Check className="w-4 h-4 text-success" />
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
                      <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Gestion des employés</p>
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
                      <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Pointage en temps réel</p>
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
                      <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Analytics et rapports</p>
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
                      <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Notifications et alertes</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

