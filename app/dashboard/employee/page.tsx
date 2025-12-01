'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EmployeeDashboard() {
  const [user, setUser] = useState<any>(null)
  const [shifts, setShifts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hoursThisMonth, setHoursThisMonth] = useState(0)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) {
        router.push('/login')
        return
      }

      setUser(authUser)

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (!profile) {
        setLoading(false)
        return
      }

      // Fetch upcoming shifts
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const { data: shiftsData } = await supabase
        .from('shifts')
        .select(`
          *,
          schedule:schedules(week_start_date, status),
          employee:employees(position)
        `)
        .or(`profile_id.eq.${authUser.id},employee_id.in.(SELECT id FROM employees WHERE profile_id.eq.${authUser.id})`)
        .gte('start_time', today.toISOString())
        .order('start_time', { ascending: true })
        .limit(10)

      setShifts(shiftsData || [])

      // Calculate hours this month
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const { data: monthShifts } = await supabase
        .from('shifts')
        .select('start_time, end_time')
        .or(`profile_id.eq.${authUser.id},employee_id.in.(SELECT id FROM employees WHERE profile_id.eq.${authUser.id})`)
        .gte('start_time', monthStart.toISOString())

      if (monthShifts) {
        const totalMinutes = monthShifts.reduce((acc, shift) => {
          const start = new Date(shift.start_time)
          const end = new Date(shift.end_time)
          const diff = (end.getTime() - start.getTime()) / (1000 * 60)
          return acc + diff
        }, 0)
        setHoursThisMonth(Math.round(totalMinutes / 60))
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Mon Planning</h1>
              <p className="text-sm text-slate-400">Bienvenue, {user?.email}</p>
            </div>
            <Link
              href="/dashboard/employee/profile"
              className="w-10 h-10 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] font-medium"
            >
              {user?.email?.[0]?.toUpperCase()}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Heures ce mois</span>
              <span className="material-symbols-outlined text-[#6C63FF]">schedule</span>
            </div>
            <p className="text-2xl font-bold text-white">{hoursThisMonth}h</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Shifts à venir</span>
              <span className="material-symbols-outlined text-green-500">event</span>
            </div>
            <p className="text-2xl font-bold text-white">{shifts.length}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/dashboard/employee/timeoff"
            className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5 hover:border-[#6C63FF]/30 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-500">beach_access</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Demander un congé</p>
              <p className="text-xs text-slate-400">Faire une demande</p>
            </div>
          </Link>

          <Link
            href="/dashboard/employee/messages"
            className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5 hover:border-[#6C63FF]/30 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500">chat</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Messagerie</p>
              <p className="text-xs text-slate-400">Voir les messages</p>
            </div>
          </Link>
        </div>

        {/* Upcoming Shifts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Mes prochains shifts</h2>
            <Link
              href="/dashboard/employee/schedule"
              className="text-sm text-[#6C63FF] hover:text-[#5a52d5]"
            >
              Voir tout
            </Link>
          </div>

          {shifts.length === 0 ? (
            <div className="bg-[#1C1C1E] rounded-2xl p-8 text-center border border-white/5">
              <span className="material-symbols-outlined text-5xl text-slate-500 mb-3">event_busy</span>
              <p className="text-slate-400 mb-2">Aucun shift planifié</p>
              <p className="text-sm text-slate-500">Vos shifts apparaîtront ici</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shifts.map((shift, i) => (
                <motion.div
                  key={shift.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#6C63FF]">schedule</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{formatDate(shift.start_time)}</p>
                        <p className="text-sm text-slate-400">
                          {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                        </p>
                      </div>
                    </div>
                    {shift.employee?.position && (
                      <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs">
                        {shift.employee.position}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/5 z-50">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link
              href="/dashboard/employee"
              className="flex flex-col items-center gap-1 p-2 text-[#6C63FF]"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs font-medium">Accueil</span>
            </Link>
            <Link
              href="/dashboard/employee/schedule"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="text-xs">Planning</span>
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

