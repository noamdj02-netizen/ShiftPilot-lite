'use client'

import { useState, useEffect } from 'react'

export type ColorPalette = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan'

const colorThemes: Record<ColorPalette, {
  primary: string
  primaryDark: string
  primaryLight: string
  bgLight: string
  bgDark: string
  textLight: string
  textDark: string
}> = {
  blue: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    primaryLight: '#60A5FA',
    bgLight: 'bg-blue-100',
    bgDark: 'bg-blue-900/30',
    textLight: 'text-blue-600',
    textDark: 'text-blue-400'
  },
  purple: {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    primaryLight: '#A78BFA',
    bgLight: 'bg-purple-100',
    bgDark: 'bg-purple-900/30',
    textLight: 'text-purple-600',
    textDark: 'text-purple-400'
  },
  green: {
    primary: '#10B981',
    primaryDark: '#059669',
    primaryLight: '#34D399',
    bgLight: 'bg-green-100',
    bgDark: 'bg-green-900/30',
    textLight: 'text-green-600',
    textDark: 'text-green-400'
  },
  orange: {
    primary: '#F97316',
    primaryDark: '#EA580C',
    primaryLight: '#FB923C',
    bgLight: 'bg-orange-100',
    bgDark: 'bg-orange-900/30',
    textLight: 'text-orange-600',
    textDark: 'text-orange-400'
  },
  pink: {
    primary: '#EC4899',
    primaryDark: '#DB2777',
    primaryLight: '#F472B6',
    bgLight: 'bg-pink-100',
    bgDark: 'bg-pink-900/30',
    textLight: 'text-pink-600',
    textDark: 'text-pink-400'
  },
  cyan: {
    primary: '#06B6D4',
    primaryDark: '#0891B2',
    primaryLight: '#22D3EE',
    bgLight: 'bg-cyan-100',
    bgDark: 'bg-cyan-900/30',
    textLight: 'text-cyan-600',
    textDark: 'text-cyan-400'
  }
}

export function useColorTheme() {
  const [theme, setTheme] = useState<ColorPalette>('blue')

  useEffect(() => {
    // Load theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('colorTheme') as ColorPalette
      if (savedTheme && colorThemes[savedTheme]) {
        setTheme(savedTheme)
        const root = document.documentElement
        const colors = colorThemes[savedTheme]
        root.style.setProperty('--color-primary', colors.primary)
        root.style.setProperty('--color-primary-dark', colors.primaryDark)
        root.style.setProperty('--color-primary-light', colors.primaryLight)
      }
    }
  }, [])

  const applyTheme = (newTheme: ColorPalette) => {
    setTheme(newTheme)
    localStorage.setItem('colorTheme', newTheme)
    
    // Apply CSS variables for dynamic theming
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const colors = colorThemes[newTheme]
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-primary-dark', colors.primaryDark)
      root.style.setProperty('--color-primary-light', colors.primaryLight)
    }
  }

  return {
    theme,
    setTheme: applyTheme,
    colors: colorThemes[theme],
    availableThemes: Object.keys(colorThemes) as ColorPalette[]
  }
}

