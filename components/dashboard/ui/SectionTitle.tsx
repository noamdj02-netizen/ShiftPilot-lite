'use client'

import { ReactNode } from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

