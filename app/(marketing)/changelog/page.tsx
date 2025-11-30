import { Sparkles, Calendar, CheckCircle } from 'lucide-react'

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            Changelog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Mises à jour{' '}
            <span className="gradient-text">produit</span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Découvrez toutes les nouveautés, améliorations et corrections apportées à ShiftPilot.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {[
              {
                date: 'Décembre 2024',
                version: 'v2.0.0',
                items: [
                  'Génération IA des plannings',
                  'Interface redesign premium',
                  'Notifications WhatsApp',
                ],
              },
            ].map((release, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 lg:p-8 border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-foreground-muted" />
                  <span className="text-sm text-foreground-muted">{release.date}</span>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {release.version}
                  </span>
                </div>
                <ul className="space-y-2">
                  {release.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

