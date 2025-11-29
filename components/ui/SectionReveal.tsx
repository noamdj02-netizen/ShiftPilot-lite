'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const variants: Record<string, Variants> = {
  up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  down: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
}

export function SectionReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: SectionRevealProps) {
  const variant = variants[direction]

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.4, 0.25, 1] 
      }}
      variants={variant}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  direction = 'up'
}: StaggerContainerProps) {
  const variant = variants[direction]

  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * staggerDelay,
                ease: [0.25, 0.4, 0.25, 1] 
              }}
              variants={variant}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  )
}

