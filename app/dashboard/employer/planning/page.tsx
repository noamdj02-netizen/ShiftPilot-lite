'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PlanningPage() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [view, setView] = useState<'week' | 'day'>('week')

  const days = ['Lun 4', 'Mar 5', 'Mer 6', 'Jeu 7', 'Ven 8', 'Sam 9', 'Dim 10']
  const hours = Array.from({ length: 16 }, (_, i) => i + 7) // 7h à 23h

  const shifts = [
    { employee: 'Marie Dupont', day: 0, start: 8, duration: 4, color: 'bg-blue-500', role: 'Serveur' },
    { employee: 'Jean Martin', day: 0, start: 8, duration: 6, color: 'bg-purple-500', role: 'Cuisine' },
    { employee: 'Sophie Bernard', day: 0, start: 12, duration: 6, color: 'bg-pink-500', role: 'Serveur' },
    { employee: 'Lucas Petit', day: 0, start: 14, duration: 8, color: 'bg-orange-500', role: 'Cuisine' },
    { employee: 'Emma Dubois', day: 0, start: 18, duration: 5, color: 'bg-green-500', role: 'Serveur' },
    { employee: 'Marie Dupont', day: 1, start: 12, duration: 6, color: 'bg-blue-500', role: 'Serveur' },
    { employee: 'Jean Martin', day: 1, start: 8, duration: 8, color: 'bg-purple-500', role: 'Cuisine' }
  ]

  const stats = [
    { label: 'Employés planifiés', value: '15/15', icon: '👥' },
    { label: 'Total heures', value: '145h', icon: '⏰' },
    { label: 'Coût estimé', value: '3,240€', icon: '💰' },
    { label: 'Conformité', value: '98%', icon: '✅' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
            📅
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Planning Manuel</h1>
            <p className="text-slate-600 dark:text-slate-400">Semaine du 4 au 10 Décembre 2025</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/employer/ai-planning"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>🤖</span>
            Optimiser avec l'IA
          </Link>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            📤 Publier
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl p-4 border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-white/80 dark:bg-slate-900/80 rounded-xl p-1 border border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'week'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'day'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Jour
          </button>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            ← Semaine préc.
          </button>
          <button className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            Semaine suiv. →
          </button>
        </div>
      </div>

      {/* Planning Grid */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
        {view === 'week' ? (
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="font-medium text-slate-600 dark:text-slate-400 text-sm">Heures</div>
                {days.map((day, i) => (
                  <div key={i} className="text-center">
                    <div className={`px-4 py-2 rounded-lg font-medium ${
                      i === selectedDay
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="relative">
                {/* Time labels */}
                <div className="absolute left-0 top-0 bottom-0 w-16 space-y-2">
                  {hours.map(hour => (
                    <div key={hour} className="h-16 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                      {hour}h
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="ml-16 grid grid-cols-7 gap-2">
                  {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {/* Hour slots */}
                      <div className="space-y-2">
                        {hours.map(hour => (
                          <div
                            key={hour}
                            className="h-16 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          />
                        ))}
                      </div>

                      {/* Shifts */}
                      <div className="absolute inset-0 pointer-events-none">
                        {shifts.filter(s => s.day === dayIndex).map((shift, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`absolute left-0 right-0 ${shift.color} rounded-lg p-2 text-white text-xs font-medium pointer-events-auto cursor-move shadow-lg hover:shadow-xl transition-shadow`}
                            style={{
                              top: `${(shift.start - 7) * 72}px`,
                              height: `${shift.duration * 72 - 8}px`
                            }}
                          >
                            <div className="font-bold truncate">{shift.employee.split(' ')[0]}</div>
                            <div className="text-white/80 text-[10px]">{shift.role}</div>
                            <div className="text-white/80 text-[10px] mt-1">
                              {shift.start}h-{shift.start + shift.duration}h
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            Vue jour - En développement
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="flex-1 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <span>➕</span>
          Ajouter un shift
        </button>
        <button className="flex-1 p-4 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white rounded-xl font-medium border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-center gap-2">
          <span>📋</span>
          Dupliquer semaine
        </button>
        <button className="flex-1 p-4 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white rounded-xl font-medium border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-center gap-2">
          <span>📄</span>
          Exporter PDF
        </button>
      </div>
    </div>
  )
}
