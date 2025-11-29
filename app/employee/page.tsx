'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { shiftService } from '@/lib/services'
import { Shift } from '@/lib/types'
import { toast } from 'sonner'

export default function EmployeePlanningPage() {
  const { user, restaurant } = useAuth()
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!restaurant?.id || !user?.id) return

    const loadShifts = async () => {
      try {
        const today = new Date()
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        // In a real app, we would filter by employee_id = user.id (linked via profile)
        // Here we just fetch all restaurant shifts for demo purpose, assuming backend RLS filters it
        const data = await shiftService.getShifts(restaurant.id, startOfMonth, endOfMonth)
        setShifts(data as unknown as Shift[])
      } catch (error) {
        console.error('Error loading shifts:', error)
        toast.error('Erreur chargement planning')
      } finally {
        setIsLoading(false)
      }
    }

    loadShifts()
  }, [restaurant?.id, user?.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="size-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const upcomingShifts = shifts.filter(s => new Date(s.start).getTime() >= new Date().setHours(0,0,0,0))

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Bonjour 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Voici votre planning à venir</p>
        </div>
        <div className="size-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
          {user?.email?.substring(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Next Shift Card */}
      {upcomingShifts.length > 0 ? (
        <div className="bg-gradient-to-br from-accent to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-accent/20">
          <p className="text-white/80 text-sm font-medium mb-1">Prochain Service</p>
          <h2 className="text-3xl font-bold mb-4">
            {new Date(upcomingShifts[0].start).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })}
          </h2>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs opacity-80 uppercase tracking-wider font-bold">Début</p>
              <p className="text-xl font-bold">{new Date(upcomingShifts[0].start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            <div className="h-px flex-1 bg-white/20" />
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-right">
              <p className="text-xs opacity-80 uppercase tracking-wider font-bold">Fin</p>
              <p className="text-xl font-bold">{new Date(upcomingShifts[0].end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">Aucun shift à venir</p>
        </div>
      )}

      {/* Week Calendar List */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Cette semaine</h3>
        <div className="space-y-3">
          {upcomingShifts.slice(0, 5).map((shift, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl shadow-sm">
              <div className="flex flex-col items-center justify-center w-12 bg-slate-50 dark:bg-white/5 rounded-lg py-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  {new Date(shift.start).toLocaleDateString('fr-FR', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {new Date(shift.start).getDate()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">{shift.type}</span>
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-full font-medium text-slate-600 dark:text-slate-300">
                    {new Date(shift.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(shift.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{shift.label || 'Service normal'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

