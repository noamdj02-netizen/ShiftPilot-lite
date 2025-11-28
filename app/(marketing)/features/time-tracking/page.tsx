import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { Clock, MapPin, Calculator, CheckCircle } from 'lucide-react'

export default function TimeTrackingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warning/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-warning/20 text-sm font-medium text-warning mb-6">
            <Clock className="w-4 h-4" />
            Pointage
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Pointage intégré avec{' '}
            <span className="gradient-text">géolocalisation</span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Badgeage entrée/sortie, géolocalisation et calculs automatiques pour la paie. Tout en un seul outil.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: MapPin,
                title: 'Géolocalisation',
                description: 'Vérification automatique que l\'employé est bien sur le lieu de travail lors du pointage.',
                color: 'warning',
              },
              {
                icon: CheckCircle,
                title: 'Badgeage simple',
                description: 'Pointage entrée/sortie en un clic depuis le mobile. Interface intuitive pour tous.',
                color: 'success',
              },
              {
                icon: Calculator,
                title: 'Calculs automatiques',
                description: 'Heures travaillées, heures supplémentaires, primes. Tout calculé automatiquement pour la paie.',
                color: 'accent',
              },
            ].map((feature, i) => {
              const colorMap: { [key: string]: { bg: string; border: string; text: string } } = {
                warning: { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning' },
                success: { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success' },
                accent: { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent' },
              }
              const colors = colorMap[feature.color] || colorMap.warning
              
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 lg:p-8 border border-border hover:border-border-light transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

