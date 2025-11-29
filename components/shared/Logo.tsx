'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white'
  className?: string
}

export function Logo({ size = 'md', variant = 'default', className }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  }

  return (
    <Link href="/" className={cn('flex items-center gap-2.5 group', className)}>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        className={cn(
          'rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft',
          sizeClasses[size]
        )}
      >
        <span className="text-white font-bold">S</span>
      </motion.div>
      <span className={cn(
        'font-bold',
        variant === 'white' ? 'text-white' : 'text-foreground',
        size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
      )}>
        Shift<span className="text-primary">Pilot</span>
      </span>
    </Link>
  )
}

