'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navigation = [
    {
      name: 'Vue d\'ensemble',
      href: '/dashboard/employer',
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500',
      exact: true
    },
    {
      name: 'Planning Manuel',
      href: '/dashboard/employer/planning',
      icon: '📅',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Planning IA',
      href: '/dashboard/employer/ai-planning',
      icon: '🤖',
      gradient: 'from-violet-500 to-purple-500',
      badge: 'NEW'
    },
    {
      name: 'Employés',
      href: '/dashboard/employer/employees',
      icon: '👥',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Congés & Absences',
      href: '/dashboard/employer/absences',
      icon: '🏖️',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'PilotBot',
      href: '/dashboard/employer/pilotbot',
      icon: '💬',
      gradient: 'from-cyan-500 to-blue-500',
      badge: 'IA'
    },
    {
      name: 'PilotReview',
      href: '/dashboard/employer/pilotreview',
      icon: '⭐',
      gradient: 'from-yellow-500 to-orange-500',
      badge: 'IA'
    },
    {
      name: 'PilotSMS',
      href: '/dashboard/employer/pilotsms',
      icon: '📱',
      gradient: 'from-pink-500 to-rose-500',
      badge: 'IA'
    },
    {
      name: 'Paramètres',
      href: '/dashboard/employer/settings',
      icon: '⚙️',
      gradient: 'from-slate-500 to-gray-500'
    }
  ]

  const isActive = (item: typeof navigation[0]) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname?.startsWith(item.href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? '280px' : '80px'
        }}
        className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 z-50 transition-all duration-300"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <motion.div
            animate={{
              opacity: isSidebarOpen ? 1 : 0,
              scale: isSidebarOpen ? 1 : 0.8
            }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              ✈️
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShiftPilot
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Dashboard Manager</p>
              </div>
            )}
          </motion.div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="text-xl">{isSidebarOpen ? '←' : '→'}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
          {navigation.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${active
                    ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg shadow-blue-500/20'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }
                `}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>

                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between flex-1"
                    >
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.badge && (
                        <span className={`
                          px-2 py-0.5 text-xs font-bold rounded-full
                          ${active
                            ? 'bg-white/20 text-white'
                            : 'bg-gradient-to-r ' + item.gradient + ' text-white'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip pour sidebar collapsed */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manager</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? '280px' : '80px'
        }}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
