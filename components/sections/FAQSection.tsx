'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const faqs = [
  {
    question: "ShiftPilot est-il adapté aux entreprises multi-sites ?",
    answer: "Absolument. ShiftPilot Enterprise offre une vue unifiée pour gérer plusieurs établissements depuis une seule interface. Comparez les performances en temps réel, centralisez la planification et respectez les contraintes légales de chaque site.",
  },
  {
    question: "Quelle est la conformité légale garantie ?",
    answer: "ShiftPilot vérifie automatiquement les règles CCN HCR : repos de 11h minimum, 48h max par semaine, jours de repos obligatoires, heures supplémentaires, etc. Notre score de conformité vous indique en temps réel votre niveau de conformité avec un risque zéro de violation.",
  },
  {
    question: "Puis-je intégrer ShiftPilot avec mon système de paie existant ?",
    answer: "Oui. ShiftPilot Enterprise propose des intégrations avec les principaux systèmes de paie (Sage, Cegid, etc.) et des connecteurs API pour synchroniser automatiquement les heures travaillées. Nous proposons également des exports standards pour faciliter l'intégration.",
  },
  {
    question: "Quel support est inclus dans les offres Enterprise ?",
    answer: "L'offre Enterprise inclut un manager dédié, un support 24/7 avec SLA garanti, des formations personnalisées pour vos équipes, et un accompagnement à la mise en place. Nous assurons également la conformité continue avec les évolutions réglementaires.",
  },
  {
    question: "Comment fonctionne l'auto-planification par IA ?",
    answer: "Notre IA analyse vos données historiques (CA, fréquentation, météo) pour prédire vos besoins en staffing. Elle génère automatiquement des plannings optimaux en respectant les contraintes légales, les disponibilités et les compétences de vos équipes. Vous gardez le contrôle final.",
  },
  {
    question: "Puis-je essayer avant de m'engager ?",
    answer: "Oui, nous proposons un essai gratuit de 14 jours sans carte bancaire. Pour les offres Enterprise, nous organisons également des démos personnalisées et des POC (Proof of Concept) pour valider l'adéquation avec vos besoins spécifiques.",
  },
  {
    question: "Quelle est la politique de sécurité des données ?",
    answer: "ShiftPilot est conforme RGPD et hébergé en France (HDS pour le secteur santé). Nous utilisons un chiffrement de bout en bout, des sauvegardes quotidiennes, et proposons le SSO (Single Sign-On) pour les entreprises. Vos données restent votre propriété.",
  },
  {
    question: "Puis-je personnaliser ShiftPilot selon mes besoins ?",
    answer: "Oui, l'offre Enterprise inclut des développements sur mesure, des intégrations personnalisées, et l'adaptation de l'interface à vos processus métier. Notre équipe travaille avec vous pour créer une solution sur mesure.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="faq" ref={ref} className="py-24 lg:py-32 bg-[#F5F5F7] dark:bg-[#000000] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-base">help</span>
            Questions fréquentes
          </span>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur ShiftPilot Enterprise
          </p>
        </motion.div>
        
        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full bg-white dark:bg-[#1C1C1E] rounded-xl p-6 text-left transition-all border ${
                  openIndex === index 
                    ? 'border-accent/50 shadow-lg shadow-accent/10' 
                    : 'border-black/5 dark:border-white/5 hover:border-accent/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-semibold text-base md:text-lg text-left ${
                    openIndex === index ? 'text-accent' : 'text-black dark:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index 
                      ? 'bg-accent text-white' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                  }`}>
                    <span className="material-symbols-outlined text-lg">
                      {openIndex === index ? 'remove' : 'add'}
                    </span>
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-black/60 dark:text-white/60 leading-relaxed border-t border-black/5 dark:border-white/5 mt-4">
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
          <p className="text-black/60 dark:text-white/60 mb-6">
            Pas trouvé votre réponse ?
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            Contactez notre équipe
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
