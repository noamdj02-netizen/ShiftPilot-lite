'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Quote, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Jean Dupont',
    role: 'Gérant',
    company: 'Le Comptoir Parisien',
    quote: 'ShiftPilot a transformé ma gestion. Je gagne 4 heures par semaine et mes employés reçoivent leur planning par SMS automatiquement.',
    avatar: '👨‍💼',
    bgColor: 'from-purple-100 to-purple-50',
  },
  {
    name: 'Sophie Martin',
    role: 'Restaurant Manager',
    company: 'Brasserie du Port',
    quote: 'Avant ShiftPilot, je passais 4 heures chaque dimanche à faire les plannings. Maintenant, c\'est automatique et mes employés reçoivent tout par SMS.',
    avatar: '👩‍💼',
    bgColor: 'from-pink-100 to-pink-50',
  },
  {
    name: 'Marc Dubois',
    role: 'Gérant',
    company: 'La Table d\'Antoine',
    quote: 'L\'outil le plus simple que j\'ai utilisé. Mes employés peuvent échanger leurs shifts entre eux, ça me fait gagner un temps fou.',
    avatar: '👨‍🍳',
    bgColor: 'from-blue-100 to-blue-50',
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      <div className="container-standard">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-yellow/10 mb-6">
            <Trophy className="w-8 h-8 text-primary-yellow" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-6">
            Découvrez nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-purple">
              success stories
            </span>
          </h2>
          <p className="text-lg text-text-mid leading-relaxed">
            Des restaurateurs qui ont transformé leur gestion d'équipe avec ShiftPilot
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${testimonials[currentIndex].bgColor} rounded-3xl p-8 lg:p-12 shadow-pastel-lg`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left - Quote */}
                <div className="flex-1">
                  <Quote className="w-12 h-12 text-primary/30 mb-6" />
                  <p className="text-xl lg:text-2xl text-text-bright mb-6 leading-relaxed font-medium">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex items-center gap-2 text-text-mid">
                    <span className="font-semibold text-text-bright">{testimonials[currentIndex].name}</span>
                    <span>•</span>
                    <span>{testimonials[currentIndex].role}</span>
                  </div>
                  <p className="text-sm text-text-mid mt-1">{testimonials[currentIndex].company}</p>
                </div>

                {/* Right - Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center text-6xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-pastel transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-pastel transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

