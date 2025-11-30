import { Book, Search, FileText, Video } from 'lucide-react'

export default function DocsPage() {
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
            <Book className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Guides et{' '}
            <span className="gradient-text">tutoriels</span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Tout ce dont vous avez besoin pour démarrer avec ShiftPilot et optimiser votre utilisation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: FileText,
                title: 'Guide de démarrage',
                description: 'Apprenez à configurer votre compte et créer votre premier planning en 10 minutes.',
                color: 'accent',
              },
              {
                icon: Video,
                title: 'Tutoriels vidéo',
                description: 'Des vidéos courtes pour maîtriser toutes les fonctionnalités de ShiftPilot.',
                color: 'cyan',
              },
              {
                icon: Search,
                title: 'FAQ',
                description: 'Réponses aux questions les plus fréquentes sur l\'utilisation de ShiftPilot.',
                color: 'violet',
              },
            ].map((item, i) => {
              const colorMap: { [key: string]: { bg: string; border: string; text: string } } = {
                accent: { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent' },
                cyan: { bg: 'bg-cyan/10', border: 'border-cyan/20', text: 'text-cyan' },
                violet: { bg: 'bg-violet/10', border: 'border-violet/20', text: 'text-violet' },
              }
              const colors = colorMap[item.color] || colorMap.accent
              
              return (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 lg:p-8 border border-border hover:border-border-light transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colors.text}`} />
                  </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground-secondary leading-relaxed">{item.description}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

