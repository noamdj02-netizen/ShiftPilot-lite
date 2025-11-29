'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#000000] py-12 border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-black/40 dark:text-white/40">
          © 2025 ShiftPilot Enterprise. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-sm font-medium text-black/60 dark:text-white/60">
          <Link href="/confidentialite" className="hover:text-black dark:hover:text-white transition-colors">
            Confidentialité
          </Link>
          <Link href="/cgu" className="hover:text-black dark:hover:text-white transition-colors">
            Légal
          </Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
