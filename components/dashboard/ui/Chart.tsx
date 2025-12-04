'use client'

import { ReactNode } from 'react'

interface ChartProps {
  children: ReactNode
  title?: string
  className?: string
}

export function Chart({ children, title, className = '' }: ChartProps) {
  return (
    <div className={`bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 md:p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}

