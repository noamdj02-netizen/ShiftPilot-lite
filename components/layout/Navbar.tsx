'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#clients', label: 'Clients' },
  { href: '#ressources', label: 'Ressources' },
  { href: '#contact', label: 'Contact' },
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            : 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold tracking-tight" style={{ letterSpacing: '-0.05em' }}>
              <span className="bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent">
                SHIFTPILOT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                Connexion
              </button>
              <button
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
              >
                Essai gratuit
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-indigo-900" />
              ) : (
                <Menu className="w-6 h-6 text-indigo-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-indigo-100 bg-white/90 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block text-sm font-medium text-indigo-700"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 space-y-2">
                  <button className="block w-full text-left text-sm font-semibold text-indigo-700">
                    Connexion
                  </button>
                  <button
                    className="block w-full px-5 py-2 text-sm font-semibold text-white rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
                  >
                    Essai gratuit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
