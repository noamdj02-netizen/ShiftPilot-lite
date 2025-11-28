'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react'

const faqs = [
  {
    question: "Est-ce vraiment plus rapide qu'Excel ?",
    answer: "Oui, radicalement. Là où vous passiez 3-5 heures par semaine sur vos plannings, ShiftPilot génère un planning optimisé en moins de 10 secondes. L'algorithme prend en compte les disponibilités, compétences et contraintes légales automatiquement.",
    category: 'general',
  },
  {
    question: "Comment mes employés reçoivent le planning ?",
    answer: "Par SMS, WhatsApp ou email — vous choisissez. Dès que vous publiez le planning, chaque employé reçoit ses shifts personnalisés avec les horaires et le poste. Plus besoin de l'afficher dans le local ou d'envoyer des photos floues sur le groupe WhatsApp.",
    category: 'features',
  },
  {
    question: "Est-ce conforme au code du travail français ?",
    answer: "C'est même notre spécialité. ShiftPilot intègre toutes les règles de la convention HCR : 11h de repos minimum entre deux shifts, 48h maximum par semaine, 1 jour de repos obligatoire, temps de pause... Tout est vérifié automatiquement avant publication.",
    category: 'legal',
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer: "Absolument. Pas d'engagement, pas de préavis. Vous pouvez annuler en un clic depuis votre espace client. On vous rembourse même au prorata si vous partez en cours de mois. Vos données restent exportables pendant 30 jours après annulation.",
    category: 'billing',
  },
  {
    question: "Combien de temps pour démarrer ?",
    answer: "10 minutes chrono. Vous créez votre compte, ajoutez vos employés (import CSV possible), définissez vos postes, et vous pouvez générer votre premier planning immédiatement. Pas de formation nécessaire, l'interface est intuitive.",
    category: 'general',
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer: "Oui, 14 jours gratuits sans carte bancaire. Vous testez toutes les fonctionnalités du plan Pro, incluant les notifications SMS et les analytics. À la fin de l'essai, vous choisissez le plan qui vous convient ou vous partez sans rien payer.",
    category: 'billing',
  },
  {
    question: "Comment fonctionnent les échanges de shifts ?",
    answer: "Un employé qui ne peut pas assurer son shift peut proposer un échange via l'app. Les collègues disponibles et qualifiés reçoivent une notification et peuvent accepter. Vous validez l'échange en un clic, ou configurez la validation automatique.",
    category: 'features',
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Vos données sont hébergées en France sur des serveurs certifiés ISO 27001. Nous sommes conformes RGPD, avec chiffrement AES-256 au repos et TLS 1.3 en transit. Vous pouvez exporter ou supprimer vos données à tout moment.",
    category: 'legal',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background-secondary relative overflow-hidden"
      id="faq"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6">
            <MessageCircle className="w-4 h-4" />
            FAQ
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Questions fréquentes
          </h2>
          
          <p className="text-lg text-foreground-secondary">
            Tout ce que vous devez savoir pour démarrer avec ShiftPilot.
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group"
            >
              <div
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'border-accent/30 shadow-glow-sm' 
                    : 'border-border hover:border-border-light'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-semibold pr-8 transition-colors ${
                    openIndex === index ? 'text-accent' : 'text-foreground'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index 
                      ? 'bg-accent text-white rotate-0' 
                      : 'bg-background-elevated text-foreground-secondary group-hover:bg-accent/10 group-hover:text-accent'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-border mb-4" />
                        <p className="text-foreground-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-foreground-secondary mb-4">
            Vous ne trouvez pas votre réponse ?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-xl font-medium text-foreground group"
          >
            Contactez-nous
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
