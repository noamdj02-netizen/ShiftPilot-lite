'use client'

import { useEffect, useState } from 'react'

export function ServiceWorkerRegistration() {
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration.scope)
          
          // Check if app is already installed
          if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
          }

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('[PWA] New service worker available')
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error)
        })

      // Listen for controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
  }, [])

  // Handle install prompt
  useEffect(() => {
    let deferredPrompt: any

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      
      // Show install button if not already installed
      if (!isInstalled && !window.matchMedia('(display-mode: standalone)').matches) {
        // You can show a custom install button here
        console.log('[PWA] Install prompt available')
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [isInstalled])

  return null
}
