import { Newspaper, Calendar, Tag } from 'lucide-react'

export default function BlogPage() {
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
            <Newspaper className="w-4 h-4" />
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Actualités et{' '}
            <span className="gradient-text">conseils</span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Découvrez nos articles sur la gestion d'équipe, les meilleures pratiques et les actualités ShiftPilot.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-foreground-secondary">Articles à venir prochainement...</p>
          </div>
        </div>
      </section>
    </div>
  )
}

