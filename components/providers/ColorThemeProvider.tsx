'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useColorTheme, ColorPalette } from '@/hooks/useColorTheme'

interface ColorThemeContextType {
  theme: ColorPalette
  setTheme: (theme: ColorPalette) => void
  colors: ReturnType<typeof useColorTheme>['colors']
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const colorTheme = useColorTheme()

  useEffect(() => {
    // Apply theme CSS variables globally
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const colors = colorTheme.colors
      
      // Set CSS variables for dynamic theming
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-primary-dark', colors.primaryDark)
      root.style.setProperty('--color-primary-light', colors.primaryLight)
      
      // Add theme class to body for conditional styling
      root.setAttribute('data-color-theme', colorTheme.theme)
      
      // Remove old theme classes
      const themes: ColorPalette[] = ['blue', 'purple', 'green', 'orange', 'pink', 'cyan']
      themes.forEach(t => {
        if (t !== colorTheme.theme) {
          root.classList.remove(`theme-${t}`)
        }
      })
      
      // Add current theme class
      root.classList.add(`theme-${colorTheme.theme}`)
    }
  }, [colorTheme.theme, colorTheme.colors])

  return (
    <ColorThemeContext.Provider value={colorTheme}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorThemeContext() {
  const context = useContext(ColorThemeContext)
  if (!context) {
    throw new Error('useColorThemeContext must be used within ColorThemeProvider')
  }
  return context
}

