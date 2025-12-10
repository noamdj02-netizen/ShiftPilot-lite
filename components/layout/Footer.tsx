'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#000000] py-8 sm:py-12 border-t border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
        <p className="text-sm sm:text-base text-black/40 dark:text-white/40 text-center sm:text-left leading-relaxed">
          © 2025 ShiftPilot Enterprise. Tous droits réservés.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm sm:text-base font-medium text-black/60 dark:text-white/60">
          <Link href="/confidentialite" className="active:text-black dark:active:text-white transition-colors min-h-[44px] flex items-center touch-manipulation px-2">
            Confidentialité
          </Link>
          <Link href="/cgu" className="active:text-black dark:active:text-white transition-colors min-h-[44px] flex items-center touch-manipulation px-2">
            Légal
          </Link>
          <Link href="/contact" className="active:text-black dark:active:text-white transition-colors min-h-[44px] flex items-center touch-manipulation px-2">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
