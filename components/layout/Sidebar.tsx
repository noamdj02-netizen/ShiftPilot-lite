'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppRoute } from '@/lib/types'
import { useState, useEffect } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
        document.documentElement.classList.add('dark')
      } else {
        setTheme('light')
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + '/')
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl mx-2 ${
      isActive
        ? "bg-accent text-white shadow-lg shadow-accent/20"
        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
    }`
  }

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-[#0D1B2A] border-r border-slate-200 dark:border-white/5 flex-shrink-0 z-50 transition-colors duration-300">
      <div className="p-6 mb-4">
        <Link href={AppRoute.DASHBOARD} onClick={handleLinkClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gradient-to-br from-accent to-blue-600 rounded-lg">
            <span className="material-symbols-outlined text-xl text-white">grid_view</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight block text-slate-900 dark:text-white">ShiftPilot</span>
            <span className="text-[10px] font-medium text-accent uppercase tracking-wider bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">Enterprise</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 flex flex-col gap-1">
        <div className="px-4 mb-2 mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Opérations
        </div>
        <Link href={AppRoute.DASHBOARD} onClick={handleLinkClick} className={getLinkClass(AppRoute.DASHBOARD)}>
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          Vue d'ensemble
        </Link>
        <Link href={AppRoute.PLANNING} onClick={handleLinkClick} className={getLinkClass(AppRoute.PLANNING)}>
          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          Planification
        </Link>
        <Link href={AppRoute.EMPLOYEES} onClick={handleLinkClick} className={getLinkClass(AppRoute.EMPLOYEES)}>
          <span className="material-symbols-outlined text-[20px]">group</span>
          Collaborateurs
        </Link>

        <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Gestion
        </div>
        <Link href={AppRoute.COMPLIANCE} onClick={handleLinkClick} className={getLinkClass(AppRoute.COMPLIANCE)}>
          <span className="material-symbols-outlined text-[20px]">gavel</span>
          Conformité & Audit
        </Link>
        <Link href={AppRoute.AVAILABILITIES} onClick={handleLinkClick} className={getLinkClass(AppRoute.AVAILABILITIES)}>
          <span className="material-symbols-outlined text-[20px]">fact_check</span>
          Validations
        </Link>
        <Link href="/billing" onClick={handleLinkClick} className={getLinkClass("/billing")}>
          <span className="material-symbols-outlined text-[20px]">credit_card</span>
          Facturation
        </Link>

        <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Système
        </div>
        <Link href="/settings" onClick={handleLinkClick} className={getLinkClass("/settings")}>
          <span className="material-symbols-outlined text-[20px]">settings</span>
          Paramètres
        </Link>
      </nav>

      <div className="p-4 mt-auto space-y-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              {theme === 'dark' ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="text-xs font-medium">Thème {theme === 'dark' ? 'Sombre' : 'Clair'}</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-accent' : 'bg-slate-300'}`}>
            <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </button>

        <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Admin Corp.</p>
              <p className="text-xs text-slate-500 truncate">admin@corp.com</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 py-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-sm">logout</span>
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}