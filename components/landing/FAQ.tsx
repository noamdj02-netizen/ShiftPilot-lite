'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "C'est vraiment plus rapide qu'Excel ?",
    answer:
      "Oui, radicalement ! Ce qui vous prend 3 heures le dimanche soir est fait en moins de 2 minutes. L'IA analyse les disponibilités, compétences et contraintes légales de votre équipe pour générer un planning optimal automatiquement.",
  },
  {
    question: 'Comment mes employés reçoivent le planning ?',
    answer:
      "Par SMS, WhatsApp ou email — vous choisissez. Dès que vous publiez le planning, chaque employé reçoit ses horaires personnalisés avec le poste assigné. Plus besoin de l'afficher dans le local ou d'envoyer des photos floues sur le groupe WhatsApp.",
  },
  {
    question: "C'est conforme au code du travail français ?",
    answer:
      "Absolument, c'est même notre spécialité. ShiftPilot intègre automatiquement toutes les règles de la convention HCR : 11h de repos minimum entre deux shifts, 48h maximum par semaine, 1 jour de repos obligatoire, temps de pause... Tout est vérifié avant publication.",
  },
  {
    question: 'Je peux essayer avant de payer ?',
    answer:
      "Oui, 14 jours gratuits sans donner votre carte bancaire. Vous testez toutes les fonctionnalités du plan Pro, incluant les notifications SMS et les analytics. À la fin de l'essai, vous choisissez le plan qui vous convient ou vous partez sans rien payer.",
  },
  {
    question: "Comment ça se passe si je veux arrêter ?",
    answer:
      "Un clic dans les paramètres et c'est fait. Pas d'engagement, pas de préavis, pas de frais cachés. On vous rembourse même au prorata si vous partez en cours de mois. Vos données restent exportables pendant 30 jours après annulation.",
  },
  {
    question: "J'ai plusieurs restaurants, ça marche ?",
    answer:
      "Oui, avec l'offre Business vous gérez tous vos établissements depuis une seule interface. Chaque restaurant a son planning indépendant, mais vous avez une vue globale de tous vos employés et pouvez même déplacer du personnel d'un site à l'autre.",
  },
  {
    question: 'Comment fonctionnent les échanges de shifts ?',
    answer:
      "Un employé qui ne peut pas assurer son shift propose un échange via l'app. Les collègues disponibles et qualifiés pour le poste reçoivent une notification et peuvent accepter. Vous validez l'échange en un clic, ou configurez la validation automatique pour les échanges équivalents.",
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer:
      "Vos données sont hébergées en France sur des serveurs certifiés ISO 27001. Nous sommes conformes RGPD, avec chiffrement AES-256 au repos et TLS 1.3 en transit. Vous pouvez exporter ou supprimer vos données à tout moment depuis les paramètres.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="faq" className="section bg-background-secondary">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="badge-primary mb-4">
            <MessageCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Questions fréquentes
          </h2>
          <p className="text-lg text-foreground-secondary">
            Tout ce que vous devez savoir pour démarrer avec ShiftPilot.
          </p>
        </motion.div>

        {/* FAQ Items */}
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
                className={`w-full card text-left transition-all ${
                  openIndex === index ? 'ring-2 ring-primary/20 border-primary/30' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`font-semibold text-lg ${
                      openIndex === index ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      openIndex === index
                        ? 'bg-primary text-white'
                        : 'bg-background-secondary text-foreground-muted'
                    }`}
                  >
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
                      <p className="pt-4 text-foreground-secondary leading-relaxed border-t border-border mt-4">
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
          <p className="text-foreground-secondary mb-4">
            Vous ne trouvez pas votre réponse ?
          </p>
          <Link href="/contact" className="btn-secondary">
            Contactez-nous
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

