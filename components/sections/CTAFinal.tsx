'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { SectionShell } from '@/components/ui/SectionShell'
import { Button } from '@/components/ui/Button'

const benefits = [
  { text: 'Configuration en 10 min' },
  { text: '100% conforme légalement' },
  { text: 'Économisez 3h/semaine' },
]

export function CTAFinal() {
  return (
    <SectionShell className="section-padding bg-gradient-to-br from-primary via-secondary to-purple-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm font-medium text-white">
              Rejoignez 500+ restaurants déjà satisfaits
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Prêt à arrêter les plannings Excel ?
          </h2>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Crée ton compte en 2 minutes, teste ShiftPilot 14 jours gratuitement.
            <span className="text-white font-semibold"> Sans carte bancaire.</span>
          </p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <Check className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="primary"
              href="/register"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-framer-lg"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-white/80 mt-6"
          >
            14 jours d'essai • Sans carte bancaire • Annulation en 1 clic
          </motion.p>
        </motion.div>
      </div>
    </SectionShell>
  )
}

