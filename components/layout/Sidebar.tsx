'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  BarChart3,
  Sparkles,
} from 'lucide-react'

const navigationItems = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Planning', href: '/dashboard/planning', icon: Calendar },
  { name: 'Employés', href: '/dashboard/employees', icon: Users },
  { name: 'Shifts', href: '/dashboard/shifts', icon: Clock },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 z-30">
      <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-primary to-primary-dark border-r border-primary/20">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-white">
              Shift<span className="text-white/80">Pilot</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* CTA AI */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/dashboard/planning"
            className="flex items-center gap-3 px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-all backdrop-blur-sm group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Générer par IA</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
