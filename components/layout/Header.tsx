'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Search, User, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-border-soft">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:pl-72 lg:pr-8">
        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-50 border border-border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-foreground-muted" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-border-soft">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Marie Fontaine</p>
              <p className="text-xs text-foreground-muted">Le Comptoir Parisien</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-framer">
              M
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
