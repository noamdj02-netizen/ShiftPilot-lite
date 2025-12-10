'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export default function PlanningPage() {
  const { profile } = useAuth()
  const [selectedDay, setSelectedDay] = useState(0)
  const [view, setView] = useState<'week' | 'day'>('week')
  const [isPublishing, setIsPublishing] = useState(false)

  const days = ['Lun 4', 'Mar 5', 'Mer 6', 'Jeu 7', 'Ven 8', 'Sam 9', 'Dim 10']
  const hours = Array.from({ length: 16 }, (_, i) => i + 7) // 7h à 23h

  const shifts = [
    { employee: 'Marie Dupont', day: 0, start: 8, duration: 4, color: 'var(--theme-primary)', role: 'Serveur' },
    { employee: 'Jean Martin', day: 0, start: 8, duration: 6, color: 'var(--theme-primary-light)', role: 'Cuisine' },
    { employee: 'Sophie Bernard', day: 0, start: 12, duration: 6, color: 'var(--theme-primary)', role: 'Serveur' },
    { employee: 'Lucas Petit', day: 0, start: 14, duration: 8, color: 'var(--theme-primary-light)', role: 'Cuisine' },
    { employee: 'Emma Dubois', day: 0, start: 18, duration: 5, color: 'var(--theme-primary)', role: 'Serveur' },
    { employee: 'Marie Dupont', day: 1, start: 12, duration: 6, color: 'var(--theme-primary)', role: 'Serveur' },
    { employee: 'Jean Martin', day: 1, start: 8, duration: 8, color: 'var(--theme-primary-light)', role: 'Cuisine' }
  ]

  const stats = [
    { label: 'Employés planifiés', value: '15/15' },
    { label: 'Total heures', value: '145h' },
    { label: 'Coût estimé', value: '3,240€' },
    { label: 'Conformité', value: '98%' }
  ]

  const handlePublish = async () => {
    if (!profile?.restaurant_id) {
      toast.error('Restaurant requis. Veuillez créer votre restaurant.')
      return
    }

    setIsPublishing(true)

    try {
      // Collecter tous les shifts de la semaine
      // Note: Ici on utilise les shifts statiques pour la démo
      // En production, il faudrait récupérer les shifts depuis l'état du composant
      const shiftsToPublish = shifts.map(shift => {
        // Calculer la date pour le jour
        const date = new Date()
        date.setDate(date.getDate() - date.getDay() + 1 + shift.day) // Lundi + offset
        
        return {
          profile_id: shift.employee || null,
          date: date.toISOString().split('T')[0],
          start_time: `${String(shift.start).padStart(2, '0')}:00:00`,
          end_time: `${String(shift.start + shift.duration).padStart(2, '0')}:00:00`,
          position_id: null
        }
      })

      const response = await fetch('/api/schedule/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: profile.organization_id,
          shifts: shiftsToPublish,
          status: 'published'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la publication')
      }

      toast.success('Planning publié avec succès !')
      // Optionnel: recharger la page ou mettre à jour l'état
    } catch (error) {
      console.error('Publish error:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la publication')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="space-y-6 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Calendar size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">Planning Manuel</h1>
            <p className="text-black/60 dark:text-white/60">Semaine du 4 au 10 Décembre 2025</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/employer/ai-planning"
            className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all flex items-center gap-2 text-sm md:text-base"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
          >
            Optimiser avec l'IA
          </Link>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
          >
            {isPublishing ? 'Publication...' : 'Publier'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 border border-black/5 dark:border-white/5 shadow-sm">
            <div>
              <p className="text-xs text-black/60 dark:text-white/60 mb-1">{stat.label}</p>
              <p className="text-lg md:text-xl font-semibold text-black dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-white dark:bg-[#1C1C1E] rounded-full p-1 border border-black/5 dark:border-white/5">
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
              view === 'week'
                ? 'theme-primary text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
              view === 'day'
                ? 'theme-primary text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Jour
          </button>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-[#1C1C1E] rounded-lg border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm">
            ← Semaine préc.
          </button>
          <button className="px-4 py-2 bg-white dark:bg-[#1C1C1E] rounded-lg border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm">
            Semaine suiv. →
          </button>
        </div>
      </div>

      {/* Planning Grid */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
        {view === 'week' ? (
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="font-medium text-black/60 dark:text-white/60 text-sm">Heures</div>
                {days.map((day, i) => (
                  <div key={i} className="text-center">
                    <div className={`px-3 py-2 rounded-lg font-medium text-sm ${
                      i === selectedDay
                        ? 'theme-primary text-white'
                        : 'bg-black/5 dark:bg-white/5 text-black dark:text-white'
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
                    <div key={hour} className="h-16 flex items-center justify-center text-xs text-black/60 dark:text-white/60">
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
                            className="h-16 border border-black/5 dark:border-white/5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
                            className="absolute left-0 right-0 rounded-lg p-2 text-white text-xs font-medium pointer-events-auto cursor-move shadow-lg hover:shadow-xl transition-shadow"
                            style={{
                              top: `${(shift.start - 7) * 72}px`,
                              height: `${shift.duration * 72 - 8}px`,
                              backgroundColor: shift.color
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
          <div className="text-center py-12 text-black/60 dark:text-white/60">
            Vue jour - En développement
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button 
          className="flex-1 p-4 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        >
          Ajouter un shift
        </button>
        <button className="flex-1 p-4 bg-white dark:bg-[#1C1C1E] text-black dark:text-white rounded-lg font-medium border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
          Dupliquer semaine
        </button>
        <button className="flex-1 p-4 bg-white dark:bg-[#1C1C1E] text-black dark:text-white rounded-lg font-medium border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
          Exporter PDF
        </button>
      </div>
    </div>
  )
}
