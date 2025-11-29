'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-[#0D1B2A] border-b border-slate-200 dark:border-white/5 lg:pl-64 transition-all">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        {/* Mobile Logo / Menu Trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-slate-500 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-accent">grid_view</span>
            <span className="text-lg font-bold tracking-tight">ShiftPilot</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative ml-4 lg:ml-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="search"
            placeholder="Rechercher un employé, un planning..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] font-medium text-slate-400 border border-slate-300 dark:border-white/10 rounded px-1.5 py-0.5">⌘K</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 pl-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
          
          <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0D1B2A]"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

          <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <div className="size-8 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              AM
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">Alice M.</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-1">Manager</p>
            </div>
            <span className="hidden md:block material-symbols-outlined text-slate-400 text-[16px]">expand_more</span>
          </button>
        </div>
      </div>
    </header>
  )
}