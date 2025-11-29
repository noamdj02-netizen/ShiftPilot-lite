'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionReveal, StaggerContainer } from '@/components/ui/SectionReveal'

const testimonials = [
  {
    initials: 'MC',
    name: 'Marie Clavet',
    company: 'Le Bistrot Parisien',
    quote: 'ShiftPilot nous a fait gagner un temps précieux. Ce qui prenait 3 heures par semaine se fait maintenant en 5 minutes. L\'outil est intuitif et la conformité légale est garantie.',
    gradient: 'from-[#8976FD] to-[#7180FF]',
  },
  {
    initials: 'JD',
    name: 'Julien Dufour',
    company: 'Brasserie Le Central',
    quote: 'Excellent outil qui simplifie vraiment la gestion d\'équipe. Les employés apprécient la transparence et moi je peux enfin contrôler ma masse salariale en temps réel.',
    gradient: 'from-[#7180FF] to-[#6CC8FF]',
  },
  {
    initials: 'SL',
    name: 'Sophie Leroux',
    company: 'Café des Arts',
    quote: 'Interface claire et fonctionnalités puissantes. La génération automatique est impressionnante et l\'équipe support est très réactive. Je recommande vivement.',
    gradient: 'from-[#6CC8FF] to-[#FCA61F]',
  },
]

export function Testimonials() {
  return (
    <section id="clients" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-20">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ color: '#1a1a2e' }}
          >
            Ils nous font confiance
          </h2>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto font-medium">
            Découvrez ce que nos clients disent de ShiftPilot
          </p>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.initials}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 border border-indigo-100 transition-all hover:shadow-[0_24px_64px_rgba(137,118,253,0.15)] shadow-premium"
            >
              <div className="flex items-center mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white mr-4"
                  style={{ background: `linear-gradient(135deg, ${testimonial.gradient})` }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-base text-indigo-900">{testimonial.name}</div>
                  <div className="text-sm text-indigo-500 font-medium">{testimonial.company}</div>
                </div>
              </div>
              <p className="text-base text-indigo-700 leading-relaxed mb-6 font-medium">
                {testimonial.quote}
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-[#FCA61F]" />
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
