'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState({
    employee: 'all',
    status: 'all',
    date: 'all'
  })

  useEffect(() => {
    loadShifts()
  }, [])

  const loadShifts = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!profile?.organization_id) {
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('shifts')
        .select(`
          *,
          profile:profiles!shifts_profile_id_fkey(first_name, last_name, email),
          position:positions(name, color)
        `)
        .eq('organization_id', profile.organization_id)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error loading shifts:', error)
      } else {
        setShifts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    return `${hours}h${minutes || '00'}`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const filteredShifts = shifts.filter(shift => {
    if (filter.employee !== 'all' && shift.profile_id !== filter.employee) return false
    if (filter.status !== 'all' && shift.status !== filter.status) return false
    return true
  })

  const today = new Date().toISOString().split('T')[0]
  const upcomingShifts = filteredShifts.filter(s => s.date >= today).slice(0, 10)
  const pastShifts = filteredShifts.filter(s => s.date < today)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Shifts</h1>
          <p className="text-slate-400 mt-1">Gérez tous vos shifts planifiés</p>
        </div>
        <Link
          href="/dashboard/employer/planning"
          className="bg-[#6C63FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5a52d5] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nouveau shift
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total shifts</span>
            <span className="material-symbols-outlined text-[#6C63FF]">event</span>
          </div>
          <p className="text-3xl font-bold text-white">{filteredShifts.length}</p>
        </div>
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">À venir</span>
            <span className="material-symbols-outlined text-green-500">schedule</span>
          </div>
          <p className="text-3xl font-bold text-white">{upcomingShifts.length}</p>
        </div>
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Passés</span>
            <span className="material-symbols-outlined text-slate-500">history</span>
          </div>
          <p className="text-3xl font-bold text-white">{pastShifts.length}</p>
        </div>
      </div>

      {/* Shifts List */}
      {isLoading ? (
        <div className="bg-[#1C1C1E] rounded-2xl p-12 text-center border border-white/5">
          <div className="size-10 border-4 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Chargement...</p>
        </div>
      ) : filteredShifts.length === 0 ? (
        <div className="bg-[#1C1C1E] rounded-2xl p-12 text-center border border-white/5">
          <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">event_busy</span>
          <p className="text-slate-400 mb-4">Aucun shift pour le moment</p>
          <Link
            href="/dashboard/employer/planning"
            className="inline-flex items-center gap-2 bg-[#6C63FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5a52d5] transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            Créer un planning
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingShifts.map((shift, i) => (
            <motion.div
              key={shift.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5 hover:border-[#6C63FF]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#6C63FF] text-lg">calendar_month</span>
                    <span className="font-medium text-white">{formatDate(shift.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-sm">
                      {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  shift.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  shift.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {shift.status}
                </span>
              </div>
              
              {shift.profile && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-xs font-bold text-[#6C63FF]">
                    {shift.profile.first_name?.[0]}{shift.profile.last_name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {shift.profile.first_name} {shift.profile.last_name}
                    </p>
                    <p className="text-xs text-slate-500">{shift.profile.email}</p>
                  </div>
                </div>
              )}
              
              {shift.position && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-slate-500 text-sm">work</span>
                  <span className="text-slate-300">{shift.position.name}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

