'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface KPICardProps {
  title: string
  value: string | number
  icon: string
  trend?: string
  subtitle?: string
  color?: string
  alert?: boolean
  href?: string
}

export function KPICard({ title, value, icon, trend, subtitle, color, alert, href }: KPICardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1C1C1E] p-4 sm:p-5 lg:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          alert ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-slate-400 group-hover:text-white'
        }`}>
          <span className={`material-symbols-outlined ${color || ''}`}>{icon}</span>
        </div>
        {trend && (
          <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

interface QuickActionProps {
  label: string
  icon: string
  href: string
}

export function QuickAction({ label, icon, href }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-black/20 rounded-xl hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] transition-all cursor-pointer border border-transparent hover:border-[#6C63FF]/20"
    >
      <span className="material-symbols-outlined mb-2 text-2xl">{icon}</span>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  )
}

interface DashboardOverviewProps {
  organizationId: string
}

export function DashboardOverview({ organizationId }: DashboardOverviewProps) {
  const [stats, setStats] = useState({
    activeEmployees: 0,
    shiftsToday: 0,
    hoursThisWeek: 0,
    pendingTimeOff: 0,
  })
  const [loading, setLoading] = useState(true)
  const [todayShifts, setTodayShifts] = useState<any[]>([])

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()
      
      try {
        // Fetch KPIs from API
        const res = await fetch('/api/dashboard/overview')
        if (res.ok) {
          const data = await res.json()
          setStats(data.kpis || stats)
        }

        // Fetch today's shifts
        const today = new Date().toISOString().split('T')[0]
        const { data: shifts } = await supabase
          .from('shifts')
          .select(`
            *,
            employee:employees(first_name, last_name, position),
            profile:profiles(first_name, last_name)
          `)
          .gte('start_time', `${today}T00:00:00`)
          .lte('start_time', `${today}T23:59:59`)
          .order('start_time', { ascending: true })
          .limit(5)

        setTodayShifts(shifts || [])
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (organizationId) {
      fetchStats()
    }
  }, [organizationId])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-white/5 rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Vue d'ensemble</h1>
        <p className="text-slate-400 text-sm sm:text-base">Bienvenue sur votre espace de gestion.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard
          title="Employés actifs"
          value={stats.activeEmployees}
          icon="group"
          trend="+2 ce mois"
          href="/dashboard/employer/employees"
        />
        <KPICard
          title="Shifts aujourd'hui"
          value={stats.shiftsToday}
          icon="event"
          color="text-[#6C63FF]"
          href="/dashboard/employer/shifts"
        />
        <KPICard
          title="Heures planifiées"
          value={`${stats.hoursThisWeek}h`}
          icon="schedule"
          subtitle="Cette semaine"
          href="/dashboard/employer/planning"
        />
        <KPICard
          title="Demandes congés"
          value={stats.pendingTimeOff}
          icon="beach_access"
          alert={stats.pendingTimeOff > 0}
          href="/dashboard/employer/timeoff"
        />
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-6 border border-white/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <QuickAction
              label="Ajouter un employé"
              icon="person_add"
              href="/dashboard/employer/employees"
            />
            <QuickAction
              label="Créer un planning"
              icon="calendar_add_on"
              href="/dashboard/employer/planning"
            />
            <QuickAction
              label="Envoyer un message"
              icon="send"
              href="/dashboard/employer/messages"
            />
            <QuickAction
              label="Valider les congés"
              icon="check_circle"
              href="/dashboard/employer/timeoff"
            />
          </div>
        </div>

        <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-6 border border-white/5">
          <h3 className="text-lg font-semibold mb-4 text-white">Aperçu Planning (Aujourd'hui)</h3>
          {todayShifts.length > 0 ? (
            <div className="space-y-2">
              {todayShifts.map((shift) => {
                const employee = shift.employee || shift.profile
                const startTime = new Date(shift.start_time).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
                const endTime = new Date(shift.end_time).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
                return (
                  <div
                    key={shift.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] text-xs font-medium">
                        {employee?.first_name?.[0]}{employee?.last_name?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {employee?.first_name} {employee?.last_name}
                        </p>
                        <p className="text-xs text-slate-400">{shift.role || employee?.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {startTime} - {endTime}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-slate-500 border border-dashed border-white/10 rounded-xl">
              <span className="material-symbols-outlined mb-2 text-4xl">calendar_view_day</span>
              <p className="text-sm">Aucun shift prévu aujourd'hui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

