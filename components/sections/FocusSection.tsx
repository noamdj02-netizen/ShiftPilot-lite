'use client'

import { motion } from 'framer-motion'
import { Clock, LayoutDashboard, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function FocusSection() {
  const features = [
    {
      icon: Clock,
      title: 'Time tracking automatique',
      description: 'Suivez automatiquement les heures travaillées avec pointage GPS',
      color: 'purple',
    },
    {
      icon: LayoutDashboard,
      title: 'Dashboard complet',
      description: 'Vue d\'ensemble en temps réel de vos équipes et plannings',
      color: 'primary-yellow',
    },
    {
      icon: ShieldCheck,
      title: 'Conformité code du travail',
      description: 'Respect automatique de toutes les règles HCR et du droit du travail',
      color: 'state-success',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-50/50 via-white to-yellow-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl" />

      <div className="container-standard relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-6 leading-tight">
                Nous sommes focus sur{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-purple">
                  votre objectif
                </span>
              </h2>
              <p className="text-lg text-text-mid mb-10 leading-relaxed">
                ShiftPilot centralise la planification, la communication et le suivi de vos équipes. 
                Moins d'admin, plus de temps pour votre restaurant.
              </p>
            </motion.div>

            {/* Feature cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-pastel transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-xl ${
                    feature.color === 'purple' ? 'bg-purple-100' :
                    feature.color === 'primary-yellow' ? 'bg-yellow-100' :
                    'bg-green-100'
                  } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${
                      feature.color === 'purple' ? 'text-primary' :
                      feature.color === 'primary-yellow' ? 'text-primary-yellow' :
                      'text-state-success'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-bright mb-2">{feature.title}</h3>
                    <p className="text-text-mid leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <Button href="/features" variant="primary" size="lg">
                Découvrir toutes les fonctionnalités
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* RIGHT - Dashboard Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-pastel-lg border border-gray-100">
              {/* Fake Dashboard UI */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>

                {/* Sidebar + Content */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Sidebar */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-10 bg-gray-100 rounded-lg" />
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="col-span-3 space-y-4">
                    {/* Stats cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl" />
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary-purple/10 rounded-xl p-4">
                      <div className="h-full flex items-end justify-between gap-2">
                        {[60, 75, 90, 85, 95, 80, 70].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-secondary-purple rounded-t-lg"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Donut chart */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl flex items-center justify-center">
                        <div className="w-20 h-20 border-8 border-primary border-t-transparent rounded-full" />
                      </div>
                      <div className="h-32 bg-gradient-to-br from-green-100 to-green-50 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating illustration character */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-4xl">👋</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

