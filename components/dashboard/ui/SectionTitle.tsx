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
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm md:text-base text-black/60 dark:text-white/60 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

