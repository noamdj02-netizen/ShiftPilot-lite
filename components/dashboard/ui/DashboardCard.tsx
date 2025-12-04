'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DashboardCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function DashboardCard({ children, className = '', hover = false, onClick }: DashboardCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 md:p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

