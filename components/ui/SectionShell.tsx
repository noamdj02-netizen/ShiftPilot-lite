'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionShellProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionShell({ children, className = '', delay = 0 }: SectionShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * staggerDelay,
                ease: [0.25, 0.4, 0.25, 1]
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  )
}

