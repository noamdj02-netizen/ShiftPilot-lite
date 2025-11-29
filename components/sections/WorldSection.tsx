'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export function WorldSection() {
  const countries = [
    { name: 'FR', flag: '🇫🇷', x: '50%', y: '35%' },
    { name: 'ES', flag: '🇪🇸', x: '48%', y: '38%' },
    { name: 'IT', flag: '🇮🇹', x: '52%', y: '40%' },
    { name: 'DE', flag: '🇩🇪', x: '52%', y: '32%' },
    { name: 'GB', flag: '🇬🇧', x: '48%', y: '30%' },
    { name: 'BE', flag: '🇧🇪', x: '50%', y: '33%' },
    { name: 'CH', flag: '🇨🇭', x: '52%', y: '36%' },
    { name: 'LU', flag: '🇱🇺', x: '51%', y: '34%' },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-standard">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-6">
            Nous supportons plus de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-purple">
              30 langues
            </span>
          </h2>
          <p className="text-lg text-text-mid leading-relaxed">
            Disponible dans toute l'Europe et bientôt partout dans le monde
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Map background with dots */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-pastel overflow-hidden">
            {/* Dotted pattern */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
              {Array.from({ length: 200 }).map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 800}
                  cy={Math.random() * 400}
                  r="2"
                  fill="#D1D5DB"
                  opacity="0.4"
                />
              ))}
            </svg>

            {/* Country flags positioned on map */}
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="absolute group cursor-pointer"
                style={{ left: country.x, top: country.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {country.flag}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="px-3 py-1 bg-white rounded-lg shadow-lg text-sm font-medium text-text-bright">
                      {country.name}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {countries.slice(0, 5).map((country, i) => {
                if (i === countries.length - 1) return null
                const nextCountry = countries[i + 1]
                return (
                  <line
                    key={i}
                    x1={`calc(${country.x} + 0px)`}
                    y1={`calc(${country.y} + 0px)`}
                    x2={`calc(${nextCountry.x} + 0px)`}
                    y2={`calc(${nextCountry.y} + 0px)`}
                    stroke="#8976FD"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                )
              })}
            </svg>
          </div>
        </motion.div>

        {/* Language list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-mid mb-4">Disponible en :</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Français', 'English', 'Español', 'Deutsch', 'Italiano', 'Nederlands', 'Português'].map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-text-bright shadow-soft border border-gray-100"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

