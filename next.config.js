/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Configuration pour Three.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    // Exclure Three.js du SSR
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'three': 'commonjs three',
        '@react-three/fiber': 'commonjs @react-three/fiber',
        '@react-three/drei': 'commonjs @react-three/drei',
      })
    }
    
    return config
  },
}

module.exports = nextConfig

