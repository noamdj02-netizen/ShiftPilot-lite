'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export function EmployeeBottomNav() {
  const pathname = usePathname()
  
  const tabs = [
    { id: 'planning', label: 'Planning', icon: 'calendar_month', href: '/employee' },
    { id: 'requests', label: 'Demandes', icon: 'event_note', href: '/employee/requests' },
    { id: 'hours', label: 'Heures', icon: 'schedule', href: '/employee/hours' },
    { id: 'chat', label: 'Chat', icon: 'chat', href: '/employee/chat' },
    { id: 'profile', label: 'Profil', icon: 'person', href: '/employee/profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C1C1E] border-t border-slate-200 dark:border-white/10 px-2 py-2 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors w-16 ${
                isActive 
                  ? 'text-accent' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-current' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[10px] font-medium truncate w-full text-center">
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

