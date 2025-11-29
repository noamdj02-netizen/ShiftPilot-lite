'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-pastel-lg focus:ring-primary',
    secondary: 'bg-white border-2 border-gray-200 text-primary hover:bg-gray-50 focus:ring-primary',
    ghost: 'text-text-bright hover:bg-gray-50 focus:ring-primary',
  }
  
  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }
  
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )
  
  const animationProps = {
    whileHover: { scale: 1.03, y: -1 },
    whileTap: { scale: 0.97 },
  }
  
  // Separate button-specific props from common props
  const { type, ...restProps } = props as any
  
  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    
    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...animationProps}
        >
          {children}
        </motion.a>
      )
    }
    
    return (
      <Link href={href} className={classes}>
        <motion.span
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2"
        >
          {children}
        </motion.span>
      </Link>
    )
  }
  
  return (
    <motion.button className={classes} {...animationProps} {...restProps} type={type || 'button'}>
      {children}
    </motion.button>
  )
}
