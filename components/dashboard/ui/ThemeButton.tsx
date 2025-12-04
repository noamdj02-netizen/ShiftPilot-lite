'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ThemeButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export function ThemeButton({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  variant = 'primary'
}: ThemeButtonProps) {
  const baseClasses = variant === 'primary'
    ? 'theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all'
    : 'bg-white dark:bg-[#1C1C1E] text-black dark:text-white rounded-lg font-medium border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all'

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`${baseClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={variant === 'primary' ? {
        boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40`
      } : {}}
    >
      {children}
    </motion.button>
  )
}

