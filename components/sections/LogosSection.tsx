'use client'

import { motion } from 'framer-motion'

const logos = [
  'Le Comptoir Parisien',
  'Brasserie du Port',
  'Casa Nostra',
  'Bistrot des Halles',
  'La Table d\'Antoine',
  'L\'Ardoise',
]

export function LogosSection() {
  return (
    <section className="py-12 lg:py-16 bg-background-secondary/30 border-y border-border/50 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs lg:text-sm font-medium text-foreground-muted mb-8 lg:mb-10 tracking-wider uppercase"
        >
          Ils nous font confiance
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-foreground-subtle hover:text-foreground-secondary transition-colors duration-300 font-medium text-sm lg:text-base"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
