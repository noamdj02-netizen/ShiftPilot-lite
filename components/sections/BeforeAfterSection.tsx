'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<'employeur' | 'employe'>('employeur')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const beforeContent = {
    employeur: {
      title: "Avant : Excel et fichiers dispersés",
      description: "3 heures par semaine à créer des plannings, vérifier la conformité manuellement, gérer les échanges par SMS...",
      items: [
        "Planning créé manuellement dans Excel",
        "Vérification de conformité à la main",
        "Échanges de shifts par SMS/WhatsApp",
        "Pas de vue d'ensemble multi-sites",
        "Risque d'erreurs et de non-conformité",
      ],
      mockup: (
        <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 border-2 border-dashed border-slate-400 dark:border-slate-600">
          <div className="bg-white dark:bg-slate-900 rounded p-3 space-y-2">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className="h-12 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700"></div>
              ))}
            </div>
            <div className="h-3 bg-red-200 dark:bg-red-900/30 rounded w-1/2"></div>
          </div>
        </div>
      ),
    },
    employe: {
      title: "Avant : Planning reçu par SMS",
      description: "Planning reçu tardivement, difficile à consulter, pas de visibilité sur les disponibilités des collègues...",
      items: [
        "Planning reçu par SMS le dimanche soir",
        "Format difficile à lire",
        "Pas de visibilité sur les shifts disponibles",
        "Échanges compliqués avec les collègues",
        "Pas d'historique des plannings",
      ],
      mockup: (
        <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 border-2 border-dashed border-slate-400 dark:border-slate-600">
          <div className="bg-white dark:bg-slate-900 rounded p-3 space-y-2">
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
            <div className="h-8 bg-red-200 dark:bg-red-900/30 rounded mt-2"></div>
          </div>
        </div>
      ),
    },
  }

  const afterContent = {
    employeur: {
      title: "Après : Dashboard unifié ShiftPilot",
      description: "Planification automatisée, conformité garantie, vue multi-sites en temps réel, économie de 10h/semaine.",
      items: [
        "Planning généré automatiquement par IA",
        "Conformité légale vérifiée en temps réel",
        "Vue d'ensemble multi-sites centralisée",
        "Alertes proactives sur les risques",
        "Export automatique vers la paie",
      ],
      mockup: (
        <div className="bg-white dark:bg-surface-dark rounded-lg p-4 border border-steel-dark/30 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-accent/20 rounded w-1/3"></div>
              <div className="h-6 w-6 rounded-full bg-accent"></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'CA', val: '4,200€', delta: '+8.5%' },
                { label: 'Couverts', val: '156', delta: '+12%' },
                { label: 'Factures', val: '98', delta: '+5' },
                { label: 'Product.', val: '84€', delta: '+5%' },
              ].map((stat, i) => (
                <div key={i} className="h-16 bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30 p-2">
                  <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-2/3 mb-1 text-[8px] text-slate-500">{stat.label}</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{stat.val}</div>
                  <div className="text-[9px] text-success">{stat.delta}</div>
                </div>
              ))}
            </div>
            <div className="h-32 bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30 p-3">
              <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-2 text-[9px] text-slate-500">Couverts par heure</div>
              <div className="flex gap-1 h-20 items-end">
                {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30 p-2">
              <div className="text-[9px] text-slate-500 mb-1">Employés actifs: 8/12</div>
              <div className="flex -space-x-1">
                {['LD', 'JP', 'CM', 'ML', 'SM'].map((init, i) => (
                  <div key={i} className="size-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-[8px] font-bold text-accent">
                    {init}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    employe: {
      title: "Après : Application mobile intuitive",
      description: "Planning consultable 24/7, échanges de shifts en un clic, notifications en temps réel, tout au même endroit.",
      items: [
        "Planning consultable sur mobile/web",
        "Échanges de shifts en un clic",
        "Notifications push en temps réel",
        "Historique complet des plannings",
        "Demande de congés intégrée",
      ],
      mockup: (
        <div className="bg-white dark:bg-surface-dark rounded-lg p-4 border border-steel-dark/30 shadow-lg">
          <div className="space-y-3">
            <div className="h-6 bg-accent/20 rounded w-2/3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-50 dark:bg-background-dark rounded border border-steel-dark/30 p-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/30"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-8 bg-accent text-white rounded flex items-center justify-center">
              <div className="h-2 bg-white/30 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ),
    },
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#000000] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-base">compare_arrows</span>
            Transformation
          </span>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Avant. Après. <span className="text-black/40 dark:text-white/40">ShiftPilot.</span>
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Découvrez la différence entre l'ancien système et ShiftPilot Enterprise
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 dark:bg-surface-dark rounded-lg p-1 border border-steel-dark/30">
            <button
              onClick={() => setActiveTab('employeur')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'employeur'
                  ? 'bg-white dark:bg-background-dark text-accent shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base align-middle mr-2">business</span>
              Vue Employeur
            </button>
            <button
              onClick={() => setActiveTab('employe')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'employe'
                  ? 'bg-white dark:bg-background-dark text-accent shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base align-middle mr-2">person</span>
              Vue Employé
            </button>
          </div>
        </div>

        {/* Before/After Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold">
                  AVANT
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {beforeContent[activeTab].title}
                </h3>
              </div>
              <p className="text-black/60 dark:text-white/60 mb-4">
                {beforeContent[activeTab].description}
              </p>
              <ul className="space-y-2">
                {beforeContent[activeTab].items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70">
                    <span className="material-symbols-outlined text-red-500 text-lg">close</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              {beforeContent[activeTab].mockup}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                  APRÈS
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {afterContent[activeTab].title}
                </h3>
              </div>
              <p className="text-black/60 dark:text-white/60 mb-4">
                {afterContent[activeTab].description}
              </p>
              <ul className="space-y-2">
                {afterContent[activeTab].items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70">
                    <span className="material-symbols-outlined text-success text-lg">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              {afterContent[activeTab].mockup}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Temps économisé", value: "10h/semaine", icon: "schedule" },
            { label: "Conformité", value: "100%", icon: "verified" },
            { label: "Satisfaction", value: "98%", icon: "favorite" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-steel-dark/30 text-center">
              <span className="material-symbols-outlined text-3xl text-accent mb-3">{stat.icon}</span>
              <div className="text-3xl font-bold text-black dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-black/60 dark:text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

