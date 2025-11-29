'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppRoute } from '@/lib/types'

export function Sidebar() {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + '/')
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 border-l-2 ${
      isActive
        ? "border-accent bg-surface-dark/50 text-white"
        : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
    }`
  }

  return (
    <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[#0B1622] border-r border-steel-dark/30 flex-shrink-0">
      <div className="p-6 border-b border-steel-dark/30">
        <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-accent">grid_view</span>
          <span className="text-lg font-bold tracking-tight">ShiftPilot</span>
        </div>
        <div className="mt-2 px-2 py-1 bg-accent/20 border border-accent/30 rounded text-xs font-mono text-accent w-fit">
          ENTERPRISE
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-1">
        <div className="px-4 mb-2 text-xs font-semibold text-steel-dark uppercase tracking-wider">
          Opérations
        </div>
        <Link href={AppRoute.DASHBOARD} className={getLinkClass(AppRoute.DASHBOARD)}>
          <span className="material-symbols-outlined">dashboard</span>
          Vue d'ensemble
        </Link>
        <Link href={AppRoute.PLANNING} className={getLinkClass(AppRoute.PLANNING)}>
          <span className="material-symbols-outlined">calendar_month</span>
          Planification
        </Link>
        <Link href={AppRoute.EMPLOYEES} className={getLinkClass(AppRoute.EMPLOYEES)}>
          <span className="material-symbols-outlined">group</span>
          Collaborateurs
        </Link>

        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-steel-dark uppercase tracking-wider">
          Gouvernance
        </div>
        <Link href={AppRoute.COMPLIANCE} className={getLinkClass(AppRoute.COMPLIANCE)}>
          <span className="material-symbols-outlined">gavel</span>
          Conformité & Audit
        </Link>
        <Link href={AppRoute.AVAILABILITIES} className={getLinkClass(AppRoute.AVAILABILITIES)}>
          <span className="material-symbols-outlined">fact_check</span>
          Validations
        </Link>
      </nav>

      <div className="p-4 border-t border-steel-dark/30">
        <div className="flex items-center gap-3 px-2">
          <div className="size-8 rounded bg-steel-dark flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Admin Corp.</p>
            <p className="text-xs text-slate-400 truncate">admin@corp.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
