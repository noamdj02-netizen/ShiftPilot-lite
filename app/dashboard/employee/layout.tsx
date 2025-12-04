'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/dashboard/employee', label: 'Mon planning', icon: 'calendar_month' },
  { href: '/dashboard/employee/shifts', label: 'Mes shifts', icon: 'event' },
  { href: '/dashboard/employee/timeoff', label: 'Congés', icon: 'beach_access' },
  { href: '/dashboard/employee/messages', label: 'Messagerie', icon: 'chat' },
  { href: '/dashboard/employee/profile', label: 'Mon profil', icon: 'person' },
]

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-[#1C1C1E] border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-slate-500 dark:text-slate-400"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">ShiftPilot</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Espace employé</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C1C1E] border-t border-slate-200 dark:border-slate-800 z-40 safe-area-pb">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard/employee' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 ${isActive ? 'text-accent' : 'text-slate-500 dark:text-slate-400'}`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium mt-1">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#1C1C1E] border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">ShiftPilot</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Espace employé</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard/employee' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-accent/20 text-accent border border-accent/30'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

