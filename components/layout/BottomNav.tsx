'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppRoute } from '@/lib/types'

export function BottomNav() {
  const pathname = usePathname()

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(path + '/')
    return isActive
      ? "flex flex-col items-center gap-1 text-accent transition-colors duration-200"
      : "flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-white transition-colors duration-200"
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-steel-dark/30 z-50 shadow-lg md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        <Link href={AppRoute.DASHBOARD} className={getLinkClass(AppRoute.DASHBOARD)}>
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium tracking-wide">Vue</span>
        </Link>
        <Link href={AppRoute.PLANNING} className={getLinkClass(AppRoute.PLANNING)}>
          <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          <span className="text-[10px] font-medium tracking-wide">Plan</span>
        </Link>
        <Link href={AppRoute.EMPLOYEES} className={getLinkClass(AppRoute.EMPLOYEES)}>
          <span className="material-symbols-outlined text-[24px]">group</span>
          <span className="text-[10px] font-medium tracking-wide">RH</span>
        </Link>
        <Link href={AppRoute.COMPLIANCE} className={getLinkClass(AppRoute.COMPLIANCE)}>
          <span className="material-symbols-outlined text-[24px]">gavel</span>
          <span className="text-[10px] font-medium tracking-wide">Légal</span>
        </Link>
      </div>
    </div>
  )
}

