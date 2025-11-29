'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie Clavet',
    role: 'Le Bistrot Parisien',
    initials: 'MC',
    gradient: 'from-primary to-secondary',
    quote: 'ShiftPilot nous a fait gagner un temps précieux. Ce qui prenait 3 heures par semaine se fait maintenant en 5 minutes. L\'outil est intuitif et la conformité légale est garantie.',
  },
  {
    name: 'Julien Dufour',
    role: 'Brasserie Le Central',
    initials: 'JD',
    gradient: 'from-secondary to-accent',
    quote: 'Excellent outil qui simplifie vraiment la gestion d\'équipe. Les employés apprécient la transparence et moi je peux enfin contrôler ma masse salariale en temps réel.',
  },
  {
    name: 'Sophie Leroux',
    role: 'Café des Arts',
    initials: 'SL',
    gradient: 'from-accent to-primary',
    quote: 'Interface claire et fonctionnalités puissantes. La génération automatique est impressionnante et l\'équipe support est très réactive. Je recommande vivement.',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="temoignages" className="section bg-background">
      <div className="container-default">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-foreground-secondary">
            Découvrez ce que nos clients disent de ShiftPilot
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-padding card-hover"
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-lg font-bold text-white mr-4`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-base text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-foreground-muted font-medium">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-base text-foreground-secondary leading-relaxed mb-6 font-medium">
                {testimonial.quote}
              </p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

