'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Twitter, Facebook } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const footerLinks = {
  product: {
    title: 'Produit',
    links: [
      { name: 'Fonctionnalités', href: '#fonctionnalites' },
      { name: 'Tarifs', href: '#tarifs' },
      { name: 'Démo', href: '#' },
      { name: 'Intégrations', href: '#' },
    ],
  },
  resources: {
    title: 'Ressources',
    links: [
      { name: 'Blog', href: '#' },
      { name: 'Guide', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'API', href: '#' },
    ],
  },
  legal: {
    title: 'Légal',
    links: [
      { name: 'Confidentialité', href: '#' },
      { name: 'CGU', href: '#' },
      { name: 'Mentions légales', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  },
}

const socialLinks = [
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Facebook, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-indigo-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <SectionReveal className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-0.05em' }}>
              <span className="bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent">
                SHIFTPILOT
              </span>
            </div>
            <p className="text-sm text-indigo-600 font-medium mb-6 leading-relaxed">
              La solution de planning intelligente pour restaurants
            </p>
          </SectionReveal>

          {Object.entries(footerLinks).map(([key, section], index) => (
            <SectionReveal key={key} delay={index * 0.1}>
              <div>
                <h4 className="text-sm font-bold mb-5 text-indigo-900">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-sm text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4} className="pt-8 border-t border-indigo-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-indigo-600 font-medium">© 2024 ShiftPilot. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.icon.name}
                  href={social.href}
                  className="text-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  <social.icon className="w-5 h-5 transition-transform hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </footer>
  )
}
