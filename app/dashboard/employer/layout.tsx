'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3, Calendar, Bot, Users, Umbrella,
  MessageSquare, Star, Smartphone, Settings,
  ChevronLeft, ChevronRight, Bell, LogOut, Menu, X
} from 'lucide-react'
import { ColorThemeProvider, useColorThemeContext } from '@/components/providers/ColorThemeProvider'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/hooks/useAuth'

function EmployerDashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut, profile } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true) // Default to true to avoid layout shift
  const { colors } = useColorThemeContext()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    // Check immediately
    if (typeof window !== 'undefined') {
      checkDesktop()
      window.addEventListener('resize', checkDesktop)
      return () => window.removeEventListener('resize', checkDesktop)
    }
  }, [])

  // No redirect needed - user can access dashboard even without organization

  const navigation = [
    {
      name: 'Vue d\'ensemble',
      href: '/dashboard/employer',
      icon: BarChart3,
      gradient: 'from-blue-600 to-cyan-600',
      exact: true
    },
    {
      name: 'Planning Manuel',
      href: '/dashboard/employer/planning',
      icon: Calendar,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Planning IA',
      href: '/dashboard/employer/ai-planning',
      icon: Bot,
      gradient: 'from-violet-600 to-purple-600',
      badge: 'NEW'
    },
    {
      name: 'Employés',
      href: '/dashboard/employer/employees',
      icon: Users,
      gradient: 'from-orange-600 to-red-600'
    },
    {
      name: 'Congés & Absences',
      href: '/dashboard/employer/absences',
      icon: Umbrella,
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      name: 'PilotBot',
      href: '/dashboard/employer/pilotbot',
      icon: MessageSquare,
      gradient: 'from-cyan-600 to-blue-600',
      badge: 'IA'
    },
    {
      name: 'PilotReview',
      href: '/dashboard/employer/pilotreview',
      icon: Star,
      gradient: 'from-yellow-600 to-orange-600',
      badge: 'IA'
    },
    {
      name: 'PilotSMS',
      href: '/dashboard/employer/pilotsms',
      icon: Smartphone,
      gradient: 'from-pink-600 to-rose-600',
      badge: 'IA'
    },
    {
      name: 'Paramètres',
      href: '/dashboard/employer/settings',
      icon: Settings,
      gradient: 'from-slate-600 to-gray-600'
    }
  ]

  const isActive = (item: typeof navigation[0]) => {
    if (item.exact) {
      return pathname === item.href
    }
    return pathname?.startsWith(item.href)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000]">
      {/* Ambient Light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-gradient-to-b from-blue-400/10 to-transparent pointer-events-none blur-[120px] dark:opacity-20"></div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Desktop */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? '280px' : '80px'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen bg-white dark:bg-[#1C1C1E] border-r border-black/5 dark:border-white/5 z-50 shadow-lg overflow-hidden"
      >
        {/* Logo */}
        <div className="relative flex items-center justify-between p-4 lg:p-6 border-b border-black/5 dark:border-white/10 flex-shrink-0">
          <div className={`flex items-center min-w-0 ${
            isSidebarOpen ? 'gap-3' : 'justify-center w-full'
          }`}>
            {/* Logo toujours visible */}
            <Logo size={32} />
            
            {/* Texte qui s'affiche/masque selon l'état */}
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white truncate">
                    ShiftPilot
                  </h1>
                  <p className="text-xs text-black/60 dark:text-white/60 truncate">Dashboard Pro</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex-shrink-0 ${
              !isSidebarOpen ? 'absolute right-2' : ''
            }`}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-black/60 dark:text-white/60" />
            ) : (
              <ChevronRight className="w-4 h-4 text-black/60 dark:text-white/60" />
            )}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
          {navigation.map((item, index) => {
            const active = isActive(item)
            const Icon = item.icon
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="block group relative"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`
                      relative flex items-center gap-3 py-3 rounded-lg transition-all duration-300
                      ${isSidebarOpen ? 'px-4' : 'px-2 justify-center'}
                      ${active
                        ? 'text-white shadow-md'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60'
                      }
                    `}
                    style={active ? {
                      backgroundColor: colors.primary,
                    } : {}}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                    </motion.div>

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
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              className={`
                                px-2 py-0.5 text-xs font-semibold rounded-full
                                ${active
                                  ? 'bg-white/20 text-white'
                                  : 'theme-primary text-white'
                                }
                              `}
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                           {/* Active indicator */}
                           {active && (
                             <motion.div
                               layoutId="activeIndicator"
                               className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                               style={{ backgroundColor: 'white' }}
                               transition={{ type: "spring", stiffness: 300, damping: 30 }}
                             />
                           )}
                  </motion.div>

                  {/* Tooltip pour sidebar collapsed */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 dark:bg-black/20 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="flex-shrink-0 p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#1C1C1E]">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 theme-primary rounded-full flex items-center justify-center text-white font-semibold shadow-md cursor-pointer"
            >
              JD
            </motion.div>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1"
              >
                <p className="text-sm font-semibold text-black dark:text-white">John Doe</p>
                <p className="text-xs text-black/60 dark:text-white/60">Manager</p>
              </motion.div>
            )}
            {isSidebarOpen && (
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-[#1C1C1E] border-r border-black/5 dark:border-white/5 z-50 shadow-xl lg:hidden"
          >
            {/* Logo Mobile */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Logo size={32} />
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white">
                    ShiftPilot
                  </h1>
                  <p className="text-xs text-black/60 dark:text-white/60">Dashboard Pro</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-black/60 dark:text-white/60" />
              </button>
            </div>

            {/* Navigation Mobile */}
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
              {navigation.map((item) => {
                const active = isActive(item)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block group relative"
                  >
                    <div
                      className={`
                        relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                        ${active
                          ? 'text-white shadow-md'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60'
                        }
                      `}
                      style={active ? {
                        backgroundColor: colors.primary,
                      } : {}}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                      <div className="flex items-center justify-between flex-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`
                              px-2 py-0.5 text-xs font-semibold rounded-full
                              ${active
                                ? 'bg-white/20 text-white'
                                : 'theme-primary text-white'
                              }
                            `}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* User Profile Mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#1C1C1E] space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 theme-primary rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black dark:text-white">John Doe</p>
                  <p className="text-xs text-black/60 dark:text-white/60">Manager</p>
                </div>
              </div>
              
              {/* Paramètres et Déconnexion */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard/employer/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Paramètres</span>
                </Link>
                
                <motion.button
                  onClick={async () => {
                    await handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400 group"
                >
                  <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">Déconnexion</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1C1C1E] border-b border-black/5 dark:border-white/5 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <span className="text-lg font-semibold tracking-tight text-black dark:text-white">ShiftPilot</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <motion.main
        className="transition-all duration-300 relative z-10 pt-16 lg:pt-0"
        style={{
          marginLeft: isDesktop ? (isSidebarOpen ? '280px' : '80px') : '0'
        }}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ColorThemeProvider>
      <EmployerDashboardContent>{children}</EmployerDashboardContent>
    </ColorThemeProvider>
  )
}
