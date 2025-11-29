'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedHighlightProps {
  children: ReactNode
  className?: string
}

export function AnimatedHighlight({ children, className = '' }: AnimatedHighlightProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-primary">{children}</span>
      <motion.svg
        className="absolute -bottom-2 left-0 right-0 h-4 w-full"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <motion.path
          d="M0 15 Q50 5, 100 10 T200 8"
          stroke="#FACC15"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
    </span>
  )
}

