'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionReveal, StaggerContainer } from '@/components/ui/SectionReveal'

const plans = [
  {
    name: 'Starter',
    description: 'Pour les petites équipes',
    price: '29€',
    features: [
      'Jusqu\'à 10 employés',
      'Génération automatique',
      'Export PDF',
      'Support par email',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Pour les restaurants établis',
    price: '79€',
    features: [
      'Jusqu\'à 30 employés',
      'Toutes les fonctionnalités Starter',
      'Prévisions de coûts',
      'Notifications illimitées',
    ],
    popular: true,
  },
  {
    name: 'Business',
    description: 'Pour les groupes et chaînes',
    price: '149€',
    features: [
      'Employés illimités',
      'Multi-établissements',
      'API et intégrations',
      'Manager dédié',
    ],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="tarifs" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-20">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ color: '#1a1a2e' }}
          >
            Tarifs simples et transparents
          </h2>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto font-medium">
            Choisissez la formule adaptée à la taille de votre équipe
          </p>
        </SectionReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerDelay={0.1}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-3xl p-10 border transition-all hover:shadow-[0_24px_64px_rgba(137,118,253,0.15)] shadow-premium relative ${
                plan.popular ? 'border-2 border-[#8976FD]' : 'border-indigo-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span 
                    className="px-5 py-2 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
                  >
                    Populaire
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-indigo-900">{plan.name}</h3>
                <p className="text-base text-indigo-600 font-medium">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-indigo-900">{plan.price}</span>
                  <span className="text-base text-indigo-500 ml-2 font-medium">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-base">
                    <Check className="w-6 h-6 mr-3 flex-shrink-0 text-[#8976FD]" />
                    <span className="text-indigo-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full px-6 py-4 text-base font-semibold rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] ${
                  plan.popular
                    ? 'text-white shadow-lg'
                    : 'text-indigo-700 bg-white border border-indigo-300'
                }`}
                style={plan.popular ? { background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' } : {}}
              >
                {plan.name === 'Business' ? 'Nous contacter' : 'Commencer'}
              </button>
            </motion.div>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.4} className="text-center mt-12">
          <a 
            href="#" 
            className="text-base font-semibold hover:underline bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent"
          >
            Voir les tarifs en détail →
          </a>
        </SectionReveal>
      </div>
    </section>
  )
}
