'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function FinalCTA() {
  return (
    <section 
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <SectionReveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
            Commencez à automatiser vos plannings dès aujourd'hui
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Rejoignez les centaines de restaurants qui gagnent du temps et optimisent leur gestion d'équipe avec ShiftPilot
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-10 py-5 text-base font-semibold bg-white rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xl"
              style={{ color: '#8976FD' }}
            >
              Créer mon compte en 2 minutes
            </button>
            <button className="px-10 py-5 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97]">
              Parler à un expert
            </button>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <p className="text-sm text-white/90 mt-8 font-medium">
            Aucune carte bancaire requise · Essai gratuit de 14 jours
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
