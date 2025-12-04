'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Briefcase } from 'lucide-react'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

interface NextShiftCardProps {
  date: string
  startTime: string
  endTime: string
  role: string
  location: string
}

export function NextShiftCard({ date, startTime, endTime, role, location }: NextShiftCardProps) {
  return (
    <DashboardCard hover>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Prochain shift</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{date}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {startTime} - {endTime}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                ({calculateDuration(startTime, endTime)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-900 dark:text-white">{role}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">{location}</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

function calculateDuration(start: string, end: string): string {
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  
  const startTotal = startHour * 60 + startMin
  const endTotal = endHour * 60 + endMin
  
  const diff = endTotal - startTotal
  const hours = Math.floor(diff / 60)
  const minutes = diff % 60
  
  if (hours === 0) {
    return `${minutes}min`
  } else if (minutes === 0) {
    return `${hours}h`
  } else {
    return `${hours}h${minutes}min`
  }
}

