'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Sparkles, Download, Send, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PlanningPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    alert('Planning généré avec succès !')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Créer un planning</h1>
          <p className="text-foreground-muted mt-2">
            Générez automatiquement votre planning de la semaine avec l'IA
          </p>
        </div>
      </div>

      {/* Generate Planning Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Génération par IA</h3>
                  <p className="text-sm text-foreground-muted">Créez votre planning en 10 secondes</p>
                </div>
              </div>
              <p className="text-foreground-muted mb-6">
                L'intelligence artificielle analyse vos contraintes, disponibilités et compétences pour créer le planning optimal. 100% conforme au code du travail.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-xl border border-border-soft">
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border-soft text-primary" />
                <span className="text-sm font-medium text-foreground">Semaine du</span>
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-border-soft text-foreground"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="p-4 bg-white rounded-xl border border-border-soft">
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border-soft text-primary" />
                <span className="text-sm font-medium text-foreground">Respecter les disponibilités</span>
              </label>
              <p className="text-xs text-foreground-muted">L'IA prend en compte les disponibilités de vos employés</p>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Générer le planning
              </>
            )}
          </Button>
        </Card>
      </motion.div>

      {/* Preview placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Aperçu du planning</h3>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4" />
                Exporter PDF
              </Button>
              <Button variant="secondary" size="sm">
                <Send className="w-4 h-4" />
                Envoyer par SMS
              </Button>
            </div>
          </div>
          
          {/* Calendar placeholder */}
          <div className="border border-border-soft rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                <div key={day} className="p-4 text-center border-r border-border-soft last:border-r-0">
                  <p className="text-sm font-medium text-foreground">{day}</p>
                </div>
              ))}
            </div>
            <div className="p-8 text-center text-foreground-muted">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Générez un planning pour voir l'aperçu</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
