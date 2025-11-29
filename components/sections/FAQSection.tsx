'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "C'est vraiment plus rapide qu'Excel ?",
    answer: "Oui ! Ce qui vous prend 3 heures le dimanche soir est fait en 2 minutes. Vous indiquez qui est dispo, on génère le planning optimal automatiquement.",
  },
  {
    question: "Mes employés doivent installer une app ?",
    answer: "Non. Ils reçoivent leur planning par SMS. S'ils veulent demander un échange, ils cliquent sur un lien dans le SMS. C'est tout.",
  },
  {
    question: "C'est conforme au code du travail ?",
    answer: "Oui, c'est automatique. On vérifie les 11h de repos, les 48h max par semaine, les jours de repos obligatoires... Vous n'avez plus à y penser.",
  },
  {
    question: "Je peux essayer avant de payer ?",
    answer: "Oui, 14 jours gratuits sans donner votre carte bancaire. Si ça ne vous convient pas, vous partez sans rien payer.",
  },
  {
    question: "Comment ça se passe si je veux arrêter ?",
    answer: "Un clic dans les paramètres et c'est fait. Pas de préavis, pas de frais cachés, pas de piège. Vos données restent disponibles 30 jours.",
  },
  {
    question: "J'ai plusieurs restaurants, ça marche ?",
    answer: "Oui, avec l'offre Business vous gérez tous vos établissements depuis une seule interface. Chaque resto a son planning, mais vous voyez tout.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-4 border border-purple-200">
            <MessageCircle className="w-4 h-4" />
            Questions fréquentes
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Vous avez des questions ?
          </h2>
        </motion.div>
        
        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full bg-white rounded-2xl p-6 text-left transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] border ${
                  openIndex === index ? 'ring-2 ring-purple-200 border-purple-300' : 'border-gray-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-semibold text-lg ${
                    openIndex === index ? 'text-purple-600' : 'text-foreground'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index ? 'bg-purple-600 text-white' : 'bg-gray-100 text-foreground-muted'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-foreground-muted leading-relaxed border-t border-gray-200 mt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-foreground-muted mb-4">
            Pas trouvé votre réponse ?
          </p>
          <Link href="/contact" className="btn-secondary">
            Posez-nous la question
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
