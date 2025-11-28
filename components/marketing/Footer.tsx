'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Heart
} from 'lucide-react'

const footerLinks = {
  product: {
    title: 'Produit',
    links: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Tarifs', href: '#pricing' },
      { name: 'Intégrations', href: '/integrations' },
      { name: 'Changelog', href: '/changelog' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
  },
  resources: {
    title: 'Ressources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Centre d\'aide', href: '/help' },
      { name: 'API', href: '/api' },
      { name: 'Statut', href: '/status' },
    ],
  },
  company: {
    title: 'Entreprise',
    links: [
      { name: 'À propos', href: '/about' },
      { name: 'Recrutement', href: '/careers', badge: 'On recrute' },
      { name: 'Partenaires', href: '/partners' },
      { name: 'Presse', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    title: 'Légal',
    links: [
      { name: 'Confidentialité', href: '/privacy' },
      { name: 'CGU', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Mentions légales', href: '/legal' },
      { name: 'RGPD', href: '/gdpr' },
    ],
  },
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shiftpilot' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/shiftpilot' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shiftpilot' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@shiftpilot' },
]

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Shift<span className="text-accent">Pilot</span>
              </span>
            </Link>

            <p className="text-foreground-secondary mb-6 max-w-xs leading-relaxed">
              La solution de planification intelligente pour restaurants. 
              Simple, rapide, conforme.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:contact@shiftpilot.fr"
                className="flex items-center gap-3 text-foreground-muted hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-background-elevated flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">contact@shiftpilot.fr</span>
              </a>
              
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-foreground-muted hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-background-elevated flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">01 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-foreground-muted">
                <div className="w-8 h-8 rounded-lg bg-background-elevated flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Paris, France 🇫🇷</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass border-border hover:border-accent/30 flex items-center justify-center text-foreground-muted hover:text-accent transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                      {'badge' in link && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent">
                          {link.badge}
                        </span>
                      )}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-foreground-muted text-sm flex items-center gap-1">
              © {new Date().getFullYear()} ShiftPilot. Fait avec 
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
              à Paris.
            </p>

            {/* Status & Language */}
            <div className="flex items-center gap-6">
              {/* System status */}
              <Link
                href="/status"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Tous les systèmes opérationnels
              </Link>

              {/* Language */}
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <span>🇫🇷</span>
                <span>Français</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
