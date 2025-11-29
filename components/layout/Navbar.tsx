'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'

const navLinks = [
  { href: '#overview', label: "Vue d'ensemble" },
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#entreprise', label: 'Entreprise' },
  { href: '#tarifs', label: 'Tarifs' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsMobileMenuOpen(false)
      }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 bg-[#F5F5F7]/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 transition-colors duration-500`}
      >
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-black dark:text-white text-[22px]">grid_view</span>
            <span className="text-lg font-semibold tracking-tight text-black dark:text-white">ShiftPilot</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-black/80 dark:text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Link
              href="/login"
              className="text-[12px] bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Connexion
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-black dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-black/5 dark:border-white/10 bg-[#F5F5F7]/95 dark:bg-[#000000]/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block text-sm font-medium text-black/80 dark:text-white/80"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 space-y-2">
                  <Link
                    href="/login"
                    className="block w-full text-center text-[12px] bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full font-medium"
                  >
                    Connexion
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
