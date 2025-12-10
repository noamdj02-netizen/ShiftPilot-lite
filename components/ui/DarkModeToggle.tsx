'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * Dark Mode Toggle - Réduit à 50% de la taille originale
 * Style minimaliste inspiré Apple/Vercel/Linear
 */
export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-0.5 border-0 bg-transparent hover:opacity-80 transition-opacity"
      aria-label="Basculer entre mode clair et sombre"
      role="button"
      type="button"
    >
      {isDark ? (
        <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-700 dark:text-slate-300" />
      ) : (
        <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-700 dark:text-slate-300" />
      )}
    </button>
  )
}

