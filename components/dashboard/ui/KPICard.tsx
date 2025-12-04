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
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${bgColorClasses[color]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colorClasses[color]}`} />
        </div>
        {delta && (
          <div className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full ${deltaType === 'positive' ? 'bg-green-100 dark:bg-green-900/30' : deltaType === 'negative' ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-black/5 dark:bg-white/5'} ${deltaColors[deltaType]}`}>
            {delta}
          </div>
        )}
      </div>
      <div className="text-xs md:text-sm text-black/60 dark:text-white/60 mb-1 font-medium">{label}</div>
      <div className="text-2xl md:text-3xl font-semibold text-black dark:text-white">{value}</div>
    </motion.div>
  )
}

