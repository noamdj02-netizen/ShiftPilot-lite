'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
              >
                <span className="text-white font-bold text-xl">S</span>
              </motion.div>
              <span className="text-2xl font-bold text-foreground">
                Shift<span className="text-purple-600">Pilot</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/features"
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-gray-50 transition-all"
              >
                Fonctionnalités
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-gray-50 transition-all"
              >
                Tarifs
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-gray-50 transition-all"
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-gray-50 transition-all"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full font-medium text-foreground hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/register"
                  className="relative group px-6 py-2.5 rounded-full font-medium overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_16px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Essai gratuit</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white border-l border-gray-200 shadow-2xl lg:hidden"
            >
              <div className="p-6 pt-24 h-full overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>

                <nav className="space-y-1 mb-8">
                  {[
                    { name: 'Fonctionnalités', href: '/features' },
                    { name: 'Tarifs', href: '/pricing' },
                    { name: 'À propos', href: '/about' },
                    { name: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-foreground font-medium hover:bg-gray-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-6 border-t border-gray-200 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center rounded-full border border-gray-200 text-foreground font-medium hover:bg-gray-50 transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium shadow-[0_4px_12px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Essai gratuit
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
