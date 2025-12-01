'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EmployeeSchedulePage() {
  const [shifts, setShifts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    loadShifts()
  }, [selectedWeek])

  const loadShifts = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Get week start (Monday)
      const weekStart = new Date(selectedWeek)
      weekStart.setDate(selectedWeek.getDate() - selectedWeek.getDay() + 1)
      weekStart.setHours(0, 0, 0, 0)
      
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      weekEnd.setHours(23, 59, 59, 999)

      const { data: shiftsData } = await supabase
        .from('shifts')
        .select(`
          *,
          schedule:schedules(week_start_date, status),
          employee:employees(position)
        `)
        .or(`profile_id.eq.${user.id},employee_id.in.(SELECT id FROM employees WHERE profile_id.eq.${user.id})`)
        .gte('start_time', weekStart.toISOString())
        .lte('start_time', weekEnd.toISOString())
        .order('start_time', { ascending: true })

      setShifts(shiftsData || [])
    } catch (error) {
      console.error('Error loading shifts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDayShifts = (dayIndex: number) => {
    const dayStart = new Date(selectedWeek)
    dayStart.setDate(selectedWeek.getDate() - selectedWeek.getDay() + 1 + dayIndex)
    dayStart.setHours(0, 0, 0, 0)
    
    const dayEnd = new Date(dayStart)
    dayEnd.setHours(23, 59, 59, 999)

    return shifts.filter(shift => {
      const shiftDate = new Date(shift.start_time)
      return shiftDate >= dayStart && shiftDate <= dayEnd
    })
  }

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  const changeWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(selectedWeek.getDate() + (direction === 'next' ? 7 : -7))
    setSelectedWeek(newDate)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="size-12 border-4 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-20">
      {/* Header */}
      <div className="bg-[#1C1C1E] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/dashboard/employee"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Mon Planning</h1>
            <div className="w-10" />
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeWeek('prev')}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="text-center">
              <p className="text-white font-medium">
                Semaine du {new Date(selectedWeek.setDate(selectedWeek.getDate() - selectedWeek.getDay() + 1)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
              </p>
            </div>
            <button
              onClick={() => changeWeek('next')}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {shifts.length === 0 ? (
          <div className="bg-[#1C1C1E] rounded-2xl p-8 text-center border border-white/5">
            <span className="material-symbols-outlined text-5xl text-slate-500 mb-3">event_busy</span>
            <p className="text-slate-400 mb-2">Aucun shift cette semaine</p>
            <p className="text-sm text-slate-500">Vos shifts apparaîtront ici une fois planifiés</p>
          </div>
        ) : (
          <div className="space-y-4">
            {days.map((day, dayIndex) => {
              const dayShifts = getDayShifts(dayIndex)
              if (dayShifts.length === 0) return null

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{day}</h3>
                  <div className="space-y-2">
                    {dayShifts.map((shift) => (
                      <div
                        key={shift.id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#6C63FF]">schedule</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                            </p>
                            {shift.employee?.position && (
                              <p className="text-xs text-slate-400">{shift.employee.position}</p>
                            )}
                          </div>
                        </div>
                        {shift.schedule?.status === 'PUBLISHED' && (
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                            Publié
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/5 z-50">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link
              href="/dashboard/employee"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs">Accueil</span>
            </Link>
            <Link
              href="/dashboard/employee/schedule"
              className="flex flex-col items-center gap-1 p-2 text-[#6C63FF]"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="text-xs font-medium">Planning</span>
            </Link>
            <Link
              href="/dashboard/employee/timeoff"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">beach_access</span>
              <span className="text-xs">Congés</span>
            </Link>
            <Link
              href="/dashboard/employee/messages"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">chat</span>
              <span className="text-xs">Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

