'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  icon: LucideIcon
  label: string
  value: string | number
  delta?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red'
}

export function KPICard({ 
  icon: Icon, 
  label, 
  value, 
  delta, 
  deltaType = 'neutral',
  color = 'blue'
}: KPICardProps) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    amber: 'text-amber-600 dark:text-amber-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400',
  }

  const bgColorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    amber: 'bg-amber-100 dark:bg-amber-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    red: 'bg-red-100 dark:bg-red-900/30',
  }

  const deltaColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-orange-600 dark:text-orange-400',
    neutral: 'text-black/60 dark:text-white/60',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 md:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgColorClasses[color]} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        {delta && (
          <div className={`text-xs font-semibold px-2 py-1 rounded-full bg-white/5 dark:bg-white/5 ${deltaColors[deltaType]}`}>
            {delta}
          </div>
        )}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
    </motion.div>
  )
}

