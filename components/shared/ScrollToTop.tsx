'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Auto scroll to top on route change
 * This ensures smooth navigation between pages
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}
