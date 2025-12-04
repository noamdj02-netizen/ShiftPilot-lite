'use client'

import { motion } from 'framer-motion'

interface ShiftCardProps {
  employeeName: string
  role: string
  startTime: string
  endTime: string
  date?: string
  onClick?: () => void
}

export function ShiftCard({ employeeName, role, startTime, endTime, date, onClick }: ShiftCardProps) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {employeeName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{employeeName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{role}</div>
            {date && (
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{date}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {startTime} - {endTime}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

