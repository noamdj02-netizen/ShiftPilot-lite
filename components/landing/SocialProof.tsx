'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-sm bg-background border-y border-border">
      <div className="container-default">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: '500+', label: 'restaurants utilisent ShiftPilot' },
            { value: '4.9/5', label: 'note globale' },
            { value: '30 000', label: 'plannings générés' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold tracking-tight mb-2 text-gradient">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground-secondary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

