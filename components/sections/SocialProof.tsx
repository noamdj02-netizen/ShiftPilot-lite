'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'

const stats = [
  { value: '500+', label: 'restaurants utilisent ShiftPilot' },
  { value: '4.9/5', label: 'note globale' },
  { value: '30 000', label: 'plannings générés' },
]

export function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <SectionReveal key={stat.value} delay={index * 0.1} className="text-center">
              <div 
                className="text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent"
              >
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-indigo-600">{stat.label}</div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
