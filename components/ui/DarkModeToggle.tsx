'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

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
      className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-steel-light dark:border-steel-dark hover:bg-steel-light dark:hover:bg-steel-dark transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-foreground dark:text-slate-100" />
      ) : (
        <Moon className="w-5 h-5 text-foreground" />
      )}
    </button>
  )
}

