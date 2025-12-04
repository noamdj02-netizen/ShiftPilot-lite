import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShiftPilot - Gestion de planning professionnel',
    short_name: 'ShiftPilot',
    description: 'Planification intelligente pour la restauration - Gérez vos équipes et planning en temps réel',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#0D1B2A',
    theme_color: '#6C63FF',
    orientation: 'any',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Planning',
        short_name: 'Planning',
        description: 'Voir mon planning',
        url: '/dashboard/planning',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
      {
        name: 'Messages',
        short_name: 'Messages',
        description: 'Voir mes messages',
        url: '/dashboard/messages',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
    ],
  }
}

