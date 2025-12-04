'use client'

import { motion } from 'framer-motion'

export function TrustSection() {
  const logos = ['ACCOR', 'Sodexo', 'COMPASS', 'KORIAN', 'ELIOR']

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-[#000000] border-t border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-10">
          La référence pour les leaders du secteur
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0">
          {logos.map((logo, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-3xl font-bold font-sans text-black dark:text-white cursor-default"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

