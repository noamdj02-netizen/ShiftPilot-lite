'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container-standard relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-pastel-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-bright mb-4">
              Abonnez-vous à notre newsletter &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                recevez un code promo
              </span>
            </h2>
            <p className="text-lg text-text-mid">
              Recevez nos meilleurs conseils et offres exclusives directement dans votre boîte mail
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-text-bright placeholder:text-text-mid transition-all duration-300"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-primary-yellow to-primary-yellow/80 hover:shadow-pastel-lg whitespace-nowrap"
            >
              S'abonner
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-text-mid mt-6">
            En vous abonnant, vous acceptez de recevoir nos emails. Vous pouvez vous désabonner à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

