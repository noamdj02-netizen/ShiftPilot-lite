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
    active: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    inactive: 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60',
    'on-shift': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs md:text-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-black dark:text-white truncate">{name}</div>
          <div className="text-xs text-black/60 dark:text-white/60 truncate">{role}</div>
          {hours !== undefined && (
            <div className="text-xs text-black/60 dark:text-white/60 mt-1">{hours}h cette semaine</div>
          )}
        </div>
        {status && (
          <div className={`px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold ${statusColors[status]}`}>
            {status === 'on-shift' ? 'En shift' : status === 'active' ? 'Actif' : 'Inactif'}
          </div>
        )}
      </div>
    </motion.div>
  )
}

