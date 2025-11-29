'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function LogosSection() {
  return (
    <section className="py-12 lg:py-16 bg-white border-y border-gray-200 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pastilles clients + Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {/* Pastilles clients */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm"
                >
                  {i}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              +500 restos nous font confiance
            </span>
          </div>
          
          {/* Rating Capterra */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              4.9/5 sur Capterra
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
