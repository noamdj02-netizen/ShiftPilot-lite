'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  Shield,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Génération IA',
    description: 'Plannings optimisés automatiquement',
    href: '/features/ai-generation',
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: 'Code du travail respecté',
    href: '/features/compliance',
    color: 'cyan',
  },
  {
    icon: MessageSquare,
    title: 'Notifications',
    description: 'SMS, WhatsApp, email',
    href: '/features/notifications',
    color: 'violet',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Tableaux de bord avancés',
    href: '/features/analytics',
    color: 'success',
  },
  {
    icon: Clock,
    title: 'Pointage',
    description: 'Géolocalisation intégrée',
    href: '/features/time-tracking',
    color: 'warning',
  },
  {
    icon: Users,
    title: 'Gestion équipes',
    description: 'Compétences et disponibilités',
    href: '/features/team-management',
    color: 'accent',
  },
]

const resources = [
  { title: 'Documentation', href: '/docs', description: 'Guides et tutoriels' },
  { title: 'Blog', href: '/blog', description: 'Actualités et conseils' },
  { title: 'Centre d\'aide', href: '/help', description: 'FAQ et support' },
  { title: 'Changelog', href: '/changelog', description: 'Mises à jour produit' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-glow-sm"
              >
                <span className="text-white font-bold text-lg">S</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-cyan opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
              </motion.div>
              <span className="text-xl font-bold text-foreground">
                Shift<span className="text-accent">Pilot</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Features dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('features')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-elevated/50 transition-all">
                  Fonctionnalités
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'features' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] p-2 rounded-2xl bg-background-elevated/95 backdrop-blur-xl border border-border shadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {features.map((feature) => (
                          <Link
                            key={feature.title}
                            href={feature.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-background-hover transition-colors group"
                          >
                            <div className={`w-10 h-10 rounded-lg bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground group-hover:text-accent transition-colors">{feature.title}</p>
                              <p className="text-sm text-foreground-muted">{feature.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-border">
                        <Link
                          href="/features"
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-background-hover transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="font-medium text-foreground">Toutes les fonctionnalités</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <Link 
                href="#pricing" 
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-elevated/50 transition-all"
              >
                Tarifs
              </Link>

              {/* Resources dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-elevated/50 transition-all">
                  Ressources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-2xl bg-background-elevated/95 backdrop-blur-xl border border-border shadow-2xl"
                    >
                      {resources.map((resource) => (
                        <Link
                          key={resource.title}
                          href={resource.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-background-hover transition-colors group"
                        >
                          <div>
                            <p className="font-medium text-foreground group-hover:text-accent transition-colors">{resource.title}</p>
                            <p className="text-sm text-foreground-muted">{resource.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <Link 
                href="/contact" 
                className="px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-elevated/50 transition-all"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                href="/login"
                className="px-4 py-2 rounded-lg font-medium text-foreground-secondary hover:text-foreground transition-colors"
              >
                Connexion
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/register"
                  className="relative group px-5 py-2.5 rounded-xl font-medium overflow-hidden"
                >
                  <span className="relative z-10 text-white">Essai gratuit</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-cyan transition-all" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-accent opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_100%] animate-gradient-shift" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background-elevated transition-colors"
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
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-background-secondary border-l border-border shadow-2xl lg:hidden"
            >
              <div className="p-6 pt-20 h-full overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-elevated transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
                
                <nav className="space-y-1 mb-8">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-3 px-4">
                    Navigation
                  </p>
                  
                  {[
                    { name: 'Fonctionnalités', href: '#features' },
                    { name: 'Tarifs', href: '#pricing' },
                    { name: 'Témoignages', href: '#testimonials' },
                    { name: 'FAQ', href: '#faq' },
                    { name: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-foreground font-medium hover:bg-background-elevated transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="space-y-1 mb-8">
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-3 px-4">
                    Ressources
                  </p>
                  {resources.map((resource) => (
                    <Link
                      key={resource.title}
                      href={resource.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-foreground-secondary hover:text-foreground hover:bg-background-elevated transition-colors"
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>

                <div className="pt-6 border-t border-border space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center rounded-xl glass border-border text-foreground font-medium hover:bg-background-elevated transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center rounded-xl bg-gradient-to-r from-accent to-cyan text-white font-medium"
                  >
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
