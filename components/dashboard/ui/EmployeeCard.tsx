'use client'

import { motion } from 'framer-motion'

interface EmployeeCardProps {
  name: string
  role: string
  avatar?: string
  hours?: number
  status?: 'active' | 'inactive' | 'on-shift'
  onClick?: () => void
}

export function EmployeeCard({ name, role, avatar, hours, status = 'active', onClick }: EmployeeCardProps) {
  const initials = avatar || name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  const statusColors = {
    active: 'bg-green-500/20 text-green-500',
    inactive: 'bg-slate-500/20 text-slate-500',
    'on-shift': 'bg-blue-500/20 text-blue-500',
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{name}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{role}</div>
          {hours !== undefined && (
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{hours}h cette semaine</div>
          )}
        </div>
        {status && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status === 'on-shift' ? 'En shift' : status === 'active' ? 'Actif' : 'Inactif'}
          </div>
        )}
      </div>
    </motion.div>
  )
}

