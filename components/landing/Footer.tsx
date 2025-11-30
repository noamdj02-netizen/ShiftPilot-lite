'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  produit: [
    { name: 'Fonctionnalités', href: '#fonctionnalites' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Roadmap', href: '/roadmap' },
  ],
  ressources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Centre d\'aide', href: '/aide' },
    { name: 'API', href: '/api-docs' },
  ],
  entreprise: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Recrutement', href: '/recrutement' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/confidentialite' },
    { name: 'CGU', href: '/cgu' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/shiftpilot' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/shiftpilot' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/shiftpilot' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-default py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:opacity-80 transition-opacity">
                Shift<span className="text-primary">Pilot</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-xs">
              La solution de planification intelligente pour restaurants.
              Simple, rapide, conforme.
            </p>
            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:contact@shiftpilot.fr"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@shiftpilot.fr</span>
              </a>
              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">01 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Paris, France 🇫🇷</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center
                           text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-default py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} ShiftPilot. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {/* Status */}
              <Link
                href="/status"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                Tous les systèmes opérationnels
              </Link>
              {/* Language */}
              <span className="text-sm text-white/60">🇫🇷 Français</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
