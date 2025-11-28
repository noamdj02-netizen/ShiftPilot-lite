'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star, Play, Pause } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Fontaine',
    role: 'Gérante',
    restaurant: 'Le Comptoir Parisien',
    location: 'Paris 11e',
    avatar: '/avatars/marie.jpg',
    rating: 5,
    quote: "Avant ShiftPilot, je passais mon dimanche soir à faire les plannings sur Excel. Maintenant c'est réglé en 10 minutes le lundi matin. J'ai récupéré ma vie de famille !",
    metrics: { timeSaved: '4h', employees: 12 },
    gradient: 'from-accent to-cyan',
  },
  {
    id: 2,
    name: 'Lucas Mercier',
    role: 'Directeur',
    restaurant: 'Brasserie du Port',
    location: 'Marseille',
    avatar: '/avatars/lucas.jpg',
    rating: 5,
    quote: "Le respect automatique du code du travail, c'est ce qui m'a convaincu. Plus de stress avec l'inspection du travail, tout est carré. Et mes employés adorent recevoir leur planning par SMS.",
    metrics: { timeSaved: '5h', employees: 18 },
    gradient: 'from-cyan to-violet',
  },
  {
    id: 3,
    name: 'Sophie Durand',
    role: 'Propriétaire',
    restaurant: 'Casa Nostra',
    location: 'Lyon',
    avatar: '/avatars/sophie.jpg',
    rating: 5,
    quote: "J'ai 3 restaurants et je gérais les plannings sur 3 fichiers Excel différents. Avec ShiftPilot Business, tout est centralisé. Je vois en un coup d'œil qui travaille où et quand.",
    metrics: { timeSaved: '8h', employees: 35 },
    gradient: 'from-violet to-accent',
  },
  {
    id: 4,
    name: 'Thomas Bernard',
    role: 'Manager',
    restaurant: 'Le Bistrot des Halles',
    location: 'Bordeaux',
    avatar: '/avatars/thomas.jpg',
    rating: 5,
    quote: "Les échanges de shifts entre employés, c'est génial. Avant j'avais 10 messages WhatsApp par jour pour gérer ça. Maintenant ils se débrouillent entre eux sur l'app.",
    metrics: { timeSaved: '3h', employees: 8 },
    gradient: 'from-success to-cyan',
  },
  {
    id: 5,
    name: 'Emma Lefevre',
    role: 'Co-gérante',
    restaurant: 'La Table d\'Antoine',
    location: 'Nantes',
    avatar: '/avatars/emma.jpg',
    rating: 5,
    quote: "On a testé Combo et Skello avant. ShiftPilot est beaucoup plus simple à utiliser et moins cher. L'essai gratuit m'a convaincue en 2 jours.",
    metrics: { timeSaved: '4h', employees: 14 },
    gradient: 'from-warning to-accent',
  },
]

const stats = [
  { value: '500+', label: 'Restaurants', suffix: '' },
  { value: '4.9', label: 'Satisfaction', suffix: '/5' },
  { value: '15K', label: 'Plannings générés', suffix: '+' },
  { value: '45K', label: 'Heures économisées', suffix: 'h' },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const paginate = (newDirection: number) => {
    setIsAutoPlaying(false)
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) return (prev + 1) % testimonials.length
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const currentTestimonial = testimonials[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6">
            <Star className="w-4 h-4 fill-accent" />
            Témoignages
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ils ont transformé leur{' '}
            <span className="gradient-text">gestion d'équipe</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Plus de 500 restaurateurs nous font confiance au quotidien.
          </p>
        </motion.div>

        {/* Main testimonial */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 rounded-full glass border-border hover:border-accent/50 flex items-center justify-center transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-foreground-secondary group-hover:text-accent" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 rounded-full glass border-border hover:border-accent/50 flex items-center justify-center transition-all group"
          >
            <ChevronRight className="w-5 h-5 text-foreground-secondary group-hover:text-accent" />
          </button>

          {/* Autoplay control */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute -top-12 right-0 p-2 rounded-lg glass border-border hover:border-accent/50 transition-all"
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 text-foreground-secondary" />
            ) : (
              <Play className="w-4 h-4 text-foreground-secondary" />
            )}
          </button>

          {/* Card */}
          <div className="relative">
            {/* Glow background */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${currentTestimonial.gradient} opacity-10 blur-3xl rounded-3xl transition-all duration-500`} />
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative glass rounded-3xl p-8 lg:p-12 border-border"
              >
                {/* Quote icon */}
                <div className={`absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-gradient-to-r ${currentTestimonial.gradient} flex items-center justify-center shadow-lg`}>
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left: Content */}
                  <div className="flex-1">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8 font-light">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} p-[2px]`}>
                        <div className="w-full h-full rounded-full bg-background-elevated flex items-center justify-center">
                          <span className="text-2xl">
                            {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                        <p className="text-sm text-foreground-muted">
                          {currentTestimonial.role} · {currentTestimonial.restaurant}
                        </p>
                        <p className="text-xs text-foreground-subtle">{currentTestimonial.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="lg:w-48 flex flex-row lg:flex-col gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 glass rounded-2xl p-6 text-center border-border"
                    >
                      <p className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${currentTestimonial.gradient} bg-clip-text text-transparent`}>
                        {currentTestimonial.metrics.timeSaved}
                      </p>
                      <p className="text-sm text-foreground-muted mt-1">économisées/sem</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex-1 glass rounded-2xl p-6 text-center border-border"
                    >
                      <p className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${currentTestimonial.gradient} bg-clip-text text-transparent`}>
                        {currentTestimonial.metrics.employees}
                      </p>
                      <p className="text-sm text-foreground-muted mt-1">employés</p>
                    </motion.div>
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
                onClick={() => {
                  setIsAutoPlaying(false)
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-border hover:bg-border-light'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border-border hover:border-accent/30 transition-colors group"
            >
              <p className="text-3xl lg:text-4xl font-bold text-foreground group-hover:text-accent transition-colors">
                {stat.value}
                <span className="text-foreground-muted">{stat.suffix}</span>
              </p>
              <p className="text-sm text-foreground-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

