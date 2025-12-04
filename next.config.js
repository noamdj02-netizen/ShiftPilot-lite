/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour Vercel
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuration pour les images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Configuration webpack pour Three.js et autres dépendances
  webpack: (config, { isServer, webpack }) => {
    // Configuration pour Three.js (client-side only)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    
    // Exclure Three.js du SSR pour améliorer les performances
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'three': 'commonjs three',
        '@react-three/fiber': 'commonjs @react-three/fiber',
        '@react-three/drei': 'commonjs @react-three/drei',
      })
    }

    // Ignorer les modules Node.js qui ne sont pas disponibles dans Edge Runtime
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    return config
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

