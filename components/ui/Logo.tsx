'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 24, className = '' }: LogoProps) {
  const [primaryColor, setPrimaryColor] = useState('#3B82F6')
  const [primaryLight, setPrimaryLight] = useState('#60A5FA')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--theme-primary').trim() || '#3B82F6'
      const light = getComputedStyle(root).getPropertyValue('--theme-primary-light').trim() || '#60A5FA'
      setPrimaryColor(primary)
      setPrimaryLight(light)
    }
  }, [])

  const squircleSize = size * 0.45
  const innerSquircleSize = squircleSize * 0.65
  const gap = size * 0.05
  const borderRadius = size * 0.15

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background radial glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
          transform: 'scale(1.5)'
        }}
      />
      
      {/* Grid container */}
      <div 
        className="relative grid grid-cols-2"
        style={{ 
          width: size, 
          height: size,
          gap: gap
        }}
      >
        {/* Top Left - Black in light mode, White in dark mode */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{ width: squircleSize, height: squircleSize }}
        >
          <div
            className="absolute inset-0 border border-black/20 dark:border-white/20 bg-black dark:bg-white"
            style={{
              borderRadius: borderRadius,
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div
              className="absolute border border-black/10 dark:border-white/10 bg-gray-900 dark:bg-gray-100"
              style={{
                width: innerSquircleSize,
                height: innerSquircleSize,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: borderRadius * 0.7,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </motion.div>

        {/* Top Right - Blue */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{ width: squircleSize, height: squircleSize }}
        >
          <div
            className="absolute inset-0 border border-black/20 dark:border-white/20"
            style={{
              borderRadius: borderRadius,
              backgroundColor: primaryColor,
              boxShadow: `0 0 12px ${primaryColor}80, inset 0 0 20px rgba(0, 0, 0, 0.1)`
            }}
          >
            <div
              className="absolute border border-black/10 dark:border-white/10"
              style={{
                width: innerSquircleSize,
                height: innerSquircleSize,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: borderRadius * 0.7,
                backgroundColor: primaryLight,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Left - Blue */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{ width: squircleSize, height: squircleSize }}
        >
          <div
            className="absolute inset-0 border border-black/20 dark:border-white/20"
            style={{
              borderRadius: borderRadius,
              backgroundColor: primaryColor,
              boxShadow: `0 0 12px ${primaryColor}80, inset 0 0 20px rgba(0, 0, 0, 0.1)`
            }}
          >
            <div
              className="absolute border border-black/10 dark:border-white/10"
              style={{
                width: innerSquircleSize,
                height: innerSquircleSize,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: borderRadius * 0.7,
                backgroundColor: primaryLight,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Right - Black in light mode, White in dark mode */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{ width: squircleSize, height: squircleSize }}
        >
          <div
            className="absolute inset-0 border border-black/20 dark:border-white/20 bg-black dark:bg-white"
            style={{
              borderRadius: borderRadius,
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div
              className="absolute border border-black/10 dark:border-white/10 bg-gray-900 dark:bg-gray-100"
              style={{
                width: innerSquircleSize,
                height: innerSquircleSize,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: borderRadius * 0.7,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

