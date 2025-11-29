'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const testimonials = [
  {
    id: 1,
    name: "Marie Fontaine",
    role: "Gérante",
    restaurant: "Le Comptoir Parisien",
    location: "Paris 11e",
    quote: "Avant, je passais tout mon dimanche soir sur les plannings. Maintenant, c'est fait en 10 minutes le lundi matin. J'ai retrouvé mes soirées en famille.",
    rating: 5,
    employees: 12,
    timeSaved: "4h/semaine",
  },
  {
    id: 2,
    name: "Thomas Mercier",
    role: "Directeur",
    restaurant: "Brasserie du Port",
    location: "Marseille",
    quote: "Le respect automatique du code du travail, c'est ce qui m'a convaincu. Plus de stress avec l'inspection. Et mes employés adorent recevoir leur planning par SMS.",
    rating: 5,
    employees: 18,
    timeSaved: "5h/semaine",
  },
  {
    id: 3,
    name: "Sophie Durand",
    role: "Propriétaire",
    restaurant: "Casa Nostra",
    location: "Lyon",
    quote: "Avec 3 restaurants, c'était un casse-tête permanent. Maintenant tout est centralisé, je vois qui travaille où en un coup d'œil. Un game changer.",
    rating: 5,
    employees: 35,
    timeSaved: "8h/semaine",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  
  const testimonial = testimonials[current]
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-4 border border-purple-200">
            <Star className="w-4 h-4 fill-purple-600" />
            Témoignages
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ils ont retrouvé du{' '}
            <span className="text-purple-600">temps pour eux</span>
          </h2>
        </SectionReveal>
        
        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200 flex items-center justify-center hover:border-purple-300 hover:text-purple-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200 flex items-center justify-center hover:border-purple-300 hover:text-purple-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left - Image placeholder */}
                  <div className="lg:w-1/3">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-6xl">👩‍🍳</span>
                    </div>
                    
                    {/* Stats under photo */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                        <p className="text-2xl font-bold text-purple-600">{testimonial.timeSaved}</p>
                        <p className="text-xs text-foreground-secondary">économisées</p>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-xl border border-pink-100">
                        <p className="text-2xl font-bold text-pink-600">{testimonial.employees}</p>
                        <p className="text-xs text-foreground-secondary">employés</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right - Content */}
                  <div className="lg:w-2/3">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                      <p className="text-xl lg:text-2xl text-foreground leading-relaxed pl-6">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                        <p className="text-sm text-foreground-muted">{testimonial.role}, {testimonial.restaurant}</p>
                        <p className="text-sm text-foreground-muted flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'w-8 bg-purple-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats bar */}
        <SectionReveal delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          {[
            { value: "500+", label: "Restaurants" },
            { value: "4.9/5", label: "Satisfaction" },
            { value: "15 000+", label: "Plannings créés" },
            { value: "45 000h", label: "Économisées" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-foreground-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  )
}
