'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Clock, TrendingUp, Plus, Sparkles, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const stats = [
  {
    title: 'Employés actifs',
    value: '12',
    icon: Users,
    color: 'purple',
    change: '+2 cette semaine',
  },
  {
    title: 'Heures totales',
    value: '320h',
    icon: Clock,
    color: 'blue',
    change: '+15% vs semaine dernière',
  },
  {
    title: 'Coût salarial',
    value: '4 800€',
    icon: TrendingUp,
    color: 'green',
    change: '-5% vs semaine dernière',
  },
  {
    title: 'Taux de couverture',
    value: '98%',
    icon: Calendar,
    color: 'orange',
    change: '+3% vs semaine dernière',
  },
]

const colorMap: { [key: string]: { bg: string; text: string } } = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-foreground"
        >
          Tableau de bord
        </motion.h1>
        <p className="text-foreground-muted mt-2">
          Bienvenue ! Voici un aperçu de votre semaine.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const colors = colorMap[stat.color] || colorMap.purple
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Générer un planning</h3>
                </div>
                <p className="text-foreground-muted mb-6">
                  Créez votre planning de la semaine en 10 secondes avec l'intelligence artificielle.
                </p>
                <Button variant="primary" href="/dashboard/planning" size="lg">
                  Générer par IA
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                href="/dashboard/employees"
                size="sm"
                className="w-full justify-start"
              >
                <Users className="w-4 h-4" />
                Ajouter un employé
              </Button>
              <Button
                variant="secondary"
                href="/dashboard/planning"
                size="sm"
                className="w-full justify-start"
              >
                <Calendar className="w-4 h-4" />
                Créer un planning
              </Button>
              <Button
                variant="secondary"
                href="/dashboard/shifts"
                size="sm"
                className="w-full justify-start"
              >
                <Clock className="w-4 h-4" />
                Voir les shifts
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Calendar Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Planning de la semaine</h3>
            <Link href="/dashboard/planning" className="text-sm text-primary hover:underline">
              Voir tout
            </Link>
          </div>
          
          {/* Calendar grid placeholder */}
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center">
                <p className="text-sm font-medium text-foreground-muted mb-2">{day}</p>
                <div className="h-16 rounded-xl bg-gray-50 border border-border-soft flex items-center justify-center">
                  <span className="text-xs text-foreground-muted">—</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
