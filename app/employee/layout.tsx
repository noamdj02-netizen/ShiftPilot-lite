'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Planning', href: '/employee', icon: '📅', exact: true },
    { name: 'Dispos', href: '/employee/availability', icon: '🗓️' },
    { name: 'Notifs', href: '/employee/notifications', icon: '🔔' },
    { name: 'Profil', href: '/employee/profile', icon: '👤' }
  ]

  const isActive = (item: typeof navigation[0]) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname?.startsWith(item.href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 pb-20">
      {/* Top Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                ✈️
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShiftPilot
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Espace Employé</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                MD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navigation.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex flex-col items-center gap-1 py-2"
              >
                <motion.div
                  animate={{
                    scale: active ? 1.1 : 1
                  }}
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all
                    ${active
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {item.icon}
                </motion.div>
                <span className={`
                  text-xs font-medium transition-colors
                  ${active
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400'
                  }
                `}>
                  {item.name}
                </span>

                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
