import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TestimonialsStrip } from "@/components/marketing/TestimonialsStrip";
import { CoverageCTA } from "@/components/marketing/CoverageCTA";
import { Check } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Génération automatique des plannings",
      description:
        "Créez et gérez vos shifts avec une interface intuitive. Attribution automatique des employés selon disponibilités et compétences.",
      icon: "📅",
    },
    {
      title: "Notifications en temps réel",
      description:
        "Tenez votre équipe informée avec des notifications instantanées pour changements de shifts, échanges et mises à jour importantes.",
      icon: "🔔",
    },
    {
      title: "Dashboard analytics",
      description:
        "Suivez les coûts de main-d'œuvre, taux de couverture et performance des employés avec un tableau de bord complet.",
      icon: "📊",
    },
    {
      title: "SMS et WhatsApp",
      description:
        "Envoyez les plannings directement par SMS ou WhatsApp. Vos employés reçoivent leurs shifts instantanément.",
      icon: "📱",
    },
    {
      title: "Pointage intégré",
      description:
        "Pointage intégré avec badgeage entrée/sortie et calculs automatiques pour la paie.",
      icon: "⏰",
    },
    {
      title: "Échanges de shifts",
      description:
        "Laissez vos employés consulter leurs horaires, demander des congés et échanger leurs shifts directement depuis leur mobile.",
      icon: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Tout ce dont vous avez besoin pour gérer votre équipe
          </h1>
          <p className="text-lg lg:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Des fonctionnalités puissantes conçues pour simplifier la planification, réduire les coûts de main-d'œuvre et améliorer la communication avec votre équipe.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-32 bg-background-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 lg:p-8 border border-border hover:border-border-light transition-all duration-300 hover:shadow-lg hover:shadow-background/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 leading-tight">{feature.title}</h3>
                <p className="text-foreground-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reused Components */}
      <TemplateShowcase />
      <HowItWorks />
      <TestimonialsStrip />
      <CoverageCTA />
    </div>
  );
}

