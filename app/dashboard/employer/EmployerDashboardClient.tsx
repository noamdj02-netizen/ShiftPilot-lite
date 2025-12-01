'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function EmployerDashboardClient({
  children,
  profile,
}: {
  children: React.ReactNode
  profile: any
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Auto scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#1C1C1E] hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent">
            ShiftPilot
          </h1>
          <p className="text-xs text-slate-400 mt-1 truncate">
            {profile?.organizations?.name || 'Mon Entreprise'}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard/employer" icon="dashboard" label="Vue d'ensemble" active={pathname === '/dashboard/employer'} />
          <NavItem href="/dashboard/employer/planning" icon="calendar_month" label="Planning" active={pathname?.includes('/planning')} />
          <NavItem href="/dashboard/employer/employees" icon="group" label="Employés" active={pathname?.includes('/employees')} />
          <NavItem href="/dashboard/employer/shifts" icon="event_note" label="Shifts" active={pathname?.includes('/shifts')} />
          <NavItem href="/dashboard/employer/timeoff" icon="beach_access" label="Congés" active={pathname?.includes('/timeoff')} />
          <NavItem href="/dashboard/employer/messages" icon="chat" label="Messagerie" active={pathname?.includes('/messages')} />
          <NavItem href="/dashboard/employer/settings" icon="settings" label="Paramètres" active={pathname?.includes('/settings')} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center text-xs font-bold">
              {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{profile?.first_name} {profile?.last_name}</p>
              <p className="text-xs text-slate-400 truncate">Gérant</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#1C1C1E] border-r border-white/5 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent">
                    ShiftPilot
                  </h1>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {profile?.organizations?.name || 'Mon Entreprise'}
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <NavItem href="/dashboard/employer" icon="dashboard" label="Vue d'ensemble" active={pathname === '/dashboard/employer'} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/planning" icon="calendar_month" label="Planning" active={pathname?.includes('/planning')} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/employees" icon="group" label="Employés" active={pathname?.includes('/employees')} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/shifts" icon="event_note" label="Shifts" active={pathname?.includes('/shifts')} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/timeoff" icon="beach_access" label="Congés" active={pathname?.includes('/timeoff')} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/messages" icon="chat" label="Messagerie" active={pathname?.includes('/messages')} onClick={() => setMobileMenuOpen(false)} />
                <NavItem href="/dashboard/employer/settings" icon="settings" label="Paramètres" active={pathname?.includes('/settings')} onClick={() => setMobileMenuOpen(false)} />
              </nav>

              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center text-xs font-bold">
                    {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{profile?.first_name} {profile?.last_name}</p>
                    <p className="text-xs text-slate-400 truncate">Gérant</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#1C1C1E] sticky top-0 z-30">
          <span className="font-bold text-lg">ShiftPilot</span>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ 
  href, 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  href: string
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
        active 
          ? 'text-white bg-[#6C63FF]/10 border border-[#6C63FF]/20' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className={`material-symbols-outlined transition-colors ${active ? 'text-[#6C63FF]' : 'group-hover:text-[#6C63FF]'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  )
}

