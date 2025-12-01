'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: 'dashboard' },
  { href: '/planning', label: 'Planning', icon: 'calendar_month' },
  { href: '/collaborateurs', label: 'Collaborateurs', icon: 'groups' },
  { href: '/statistiques', label: 'Statistiques', icon: 'analytics' },
  { href: '/settings', label: 'Paramètres', icon: 'settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const restaurant = { name: "L'Orsan", type: "Restaurant Gastronomique" }

  const notifications = [
    { id: 1, type: 'warning', message: 'Marie a demandé un congé pour vendredi', time: '10 min', read: false },
    { id: 2, type: 'success', message: 'Planning de la semaine validé', time: '1h', read: false },
    { id: 3, type: 'info', message: 'Nouveau collaborateur ajouté', time: '2h', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'} bg-[#111113] border-r border-white/5 transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] flex items-center justify-center shadow-lg shadow-[#6C63FF]/25">
            <span className="material-symbols-outlined text-white text-xl">calendar_month</span>
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="font-bold text-white tracking-tight">ShiftPilot</span>
              <span className="text-[10px] text-slate-500">Planification intelligente</span>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6C63FF]/20 to-[#4F46E5]/10 text-white border border-[#6C63FF]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${isActive ? 'text-[#6C63FF]' : ''}`}>{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Restaurant Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/5">
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">restaurant</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{restaurant.name}</p>
                <p className="text-xs text-slate-500 truncate">{restaurant.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="h-12 border-t border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">{sidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-[#111113]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5">
            <span className="material-symbols-outlined text-white">menu</span>
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">calendar_month</span>
            </div>
            <span className="font-bold text-white">ShiftPilot</span>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
              <input type="text" placeholder="Rechercher..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6C63FF]/50" />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-slate-400">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">{unreadCount}</span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-80 bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button className="text-xs text-[#6C63FF] hover:underline">Tout marquer lu</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer ${!notif.read ? 'bg-white/[0.02]' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${notif.type === 'warning' ? 'bg-amber-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">{notif.message}</p>
                              <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] flex items-center justify-center text-white font-semibold text-sm">JD</div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">Jean Dupont</p>
                <p className="text-xs text-slate-500">Manager</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-5 lg:p-6 pb-24 lg:pb-6 overflow-auto">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111113]/95 backdrop-blur-xl border-t border-white/5 z-50 safe-area-pb">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center px-3 py-2 ${isActive ? 'text-[#6C63FF]' : 'text-slate-500'}`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium mt-1">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
          <Link href="/settings" className={`flex flex-col items-center justify-center px-3 py-2 ${pathname?.startsWith('/settings') ? 'text-[#6C63FF]' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-[10px] font-medium mt-1">Réglages</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#111113] border-r border-white/5 z-50 flex flex-col">
              <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">calendar_month</span>
                  </div>
                  <span className="font-bold text-white">ShiftPilot</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-[#6C63FF]/20 to-[#4F46E5]/10 text-white border border-[#6C63FF]/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                      <span className={`material-symbols-outlined ${isActive ? 'text-[#6C63FF]' : ''}`}>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t border-white/5">
                <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{restaurant.name}</p>
                    <p className="text-sm text-slate-500">{restaurant.type}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
