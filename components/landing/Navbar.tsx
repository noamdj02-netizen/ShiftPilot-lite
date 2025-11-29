'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Fonctionnalités', href: '#fonctionnalites' },
  { name: 'Tarifs', href: '#tarifs' },
  { name: 'Témoignages', href: '#temoignages' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-default">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo size="md" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault()
                      handleLinkClick(item.href)
                    }
                  }}
                  className="px-4 py-2 text-foreground-secondary hover:text-foreground font-medium rounded-xl hover:bg-background-secondary transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-foreground-secondary hover:text-foreground font-medium transition-colors"
              >
                Connexion
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Essai gratuit
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-background-secondary transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-soft-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Logo size="md" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-background-secondary"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-1 p-4 overflow-y-auto">
                  <ul className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (item.href.startsWith('#')) {
                              e.preventDefault()
                              handleLinkClick(item.href)
                            }
                          }}
                          className="block px-4 py-3 text-foreground font-medium rounded-xl hover:bg-background-secondary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t border-border space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-foreground font-medium rounded-xl border-2 border-border hover:bg-background-secondary transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl"
                  >
                    Essai gratuit - 14 jours
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

