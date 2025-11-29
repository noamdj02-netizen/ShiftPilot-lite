'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-surface-dark border-b border-steel-dark/30">
      <div className="flex items-center justify-between h-full px-6 lg:pl-72 lg:pr-6">
        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400">search</span>
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-background-dark border border-slate-200 dark:border-steel-dark/30 rounded text-sm focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:text-accent transition">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-surface-dark"></span>
          </button>

          {/* User menu */}
          <div className="size-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
        </div>
      </div>
    </header>
  )
}
