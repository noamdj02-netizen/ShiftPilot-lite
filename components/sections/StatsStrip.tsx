'use client'

import { motion } from 'framer-motion'
import { Users, Download, Building2 } from 'lucide-react'

export function StatsStrip() {
  const stats = [
    {
      icon: Users,
      value: '15k+',
      label: 'Active user',
      color: 'primary',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Download,
      value: '30k',
      label: 'Total Download',
      color: 'primary-yellow',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Building2,
      value: '10k',
      label: 'Customer',
      color: 'state-success',
      bgColor: 'bg-green-100',
    },
  ]

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container-standard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${
                  stat.color === 'primary' ? 'text-primary' :
                  stat.color === 'primary-yellow' ? 'text-primary-yellow' :
                  'text-state-success'
                }`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-text-bright mb-1">{stat.value}</p>
                <p className="text-sm text-text-mid">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

