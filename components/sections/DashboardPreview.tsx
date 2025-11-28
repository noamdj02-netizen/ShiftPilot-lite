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
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Interface intuitive
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Un dashboard pensé pour les restaurateurs
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Visualisez, modifiez et partagez vos plannings en quelques clics. 
            Pas besoin de formation, c'est intuitif.
          </p>
        </motion.div>
        
        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
          
          {/* Browser frame */}
          <div className="relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            {/* Browser header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-slate-700 rounded-lg text-xs text-slate-400">
                  app.shiftpilot.fr/planning
                </div>
              </div>
            </div>
            
            {/* App content */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-16 lg:w-56 bg-slate-900 border-r border-slate-700 p-3 lg:p-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <span className="hidden lg:block text-white font-semibold">ShiftPilot</span>
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                      activeTab === item.id 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'text-slate-400 hover:bg-slate-800'
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
              <div className="flex-1 p-4 lg:p-6 bg-slate-800 min-h-[500px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'planning' && (
                    <motion.div
                      key="planning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Toolbar */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Semaine 48</h3>
                          <p className="text-sm text-slate-400">25 Nov - 1 Déc 2024</p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                          >
                            Générer auto
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Publier
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Planning grid */}
                      <div className="bg-slate-800 rounded-xl overflow-hidden">
                        {/* Header row */}
                        <div className="grid grid-cols-8 border-b border-slate-700">
                          <div className="p-3 text-sm font-medium text-slate-400">Équipe</div>
                          {days.map((day, i) => (
                            <div 
                              key={day}
                              className={`p-3 text-sm font-medium text-center ${
                                i >= 5 ? 'text-slate-500' : 'text-slate-300'
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
                            className="grid grid-cols-8 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                          >
                            <div className="p-3 flex items-center gap-2">
                              <span className="text-lg">{employee.avatar}</span>
                              <div className="hidden lg:block">
                                <p className="text-sm text-white">{employee.name.split(' ')[0]}</p>
                                <p className="text-xs text-slate-500">{employee.role}</p>
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
                                    whileHover={{ scale: 1.05 }}
                                    className={`px-2 py-1 rounded-md text-xs font-medium cursor-pointer ${
                                      shift.includes('6h') ? 'bg-blue-500/20 text-blue-400' :
                                      shift.includes('9h') ? 'bg-emerald-500/20 text-emerald-400' :
                                      shift.includes('11h') ? 'bg-yellow-500/20 text-yellow-400' :
                                      shift.includes('14h') ? 'bg-purple-500/20 text-purple-400' :
                                      'bg-orange-500/20 text-orange-400'
                                    }`}
                                  >
                                    {shift}
                                  </motion.div>
                                ) : (
                                  <div className="w-full h-8 rounded-md border border-dashed border-slate-600 opacity-30" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      {/* Stats footer */}
                      <div className="flex gap-4 mt-4">
                        <div className="flex-1 bg-slate-800 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Heures totales</p>
                          <p className="text-xl font-bold text-white">156h</p>
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Postes couverts</p>
                          <p className="text-xl font-bold text-emerald-400">100%</p>
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg p-3">
                          <p className="text-xs text-slate-400 mb-1">Alertes</p>
                          <p className="text-xl font-bold text-white flex items-center gap-2">
                            0 <Check className="w-4 h-4 text-emerald-400" />
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
        </motion.div>
      </div>
    </section>
  )
}

