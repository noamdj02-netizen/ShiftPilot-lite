import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "LITE",
      price: "19€",
      period: "mois",
      description: "Parfait pour les petits restaurants",
      features: [
        "Jusqu'à 10 employés",
        "Planning hebdomadaire",
        "Export PDF",
        "Support email",
      ],
      bgColor: "bg-bg",
      borderColor: "border-border",
      cta: "Commencer",
      ctaVariant: "outline" as const,
    },
    {
      name: "PRO",
      price: "29€",
      period: "mois",
      description: "Pour les restaurants en croissance",
      features: [
        "Jusqu'à 25 employés",
        "Tout LITE +",
        "Notifications SMS",
        "Échanges de shifts",
        "Dashboard analytics",
      ],
      bgColor: "bg-yellow-soft",
      borderColor: "border-yellow-soft",
      cta: "Commencer",
      ctaVariant: "primary" as const,
      popular: true,
    },
    {
      name: "BUSINESS",
      price: "49€",
      period: "mois",
      description: "Pour les groupes et chaînes",
      features: [
        "Employés illimités",
        "Tout PRO +",
        "Multi-établissements",
        "API access",
        "Support prioritaire",
      ],
      bgColor: "bg-bg",
      borderColor: "border-border",
      cta: "Commencer",
      ctaVariant: "outline" as const,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-text-main mb-6">
            Choisissez le plan adapté à votre restaurant
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            14 jours d'essai gratuit • Sans engagement • Annulation en 1 clic
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${plan.bgColor} rounded-3xl p-8 border-2 ${plan.borderColor} relative ${
                plan.popular ? "shadow-landing-card" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-navy text-white px-4 py-1 rounded-full text-sm font-medium">
                    POPULAIRE
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-text-main mb-2">{plan.name}</h3>
                <p className="text-text-muted text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-text-main">{plan.price}</span>
                  <span className="text-text-muted">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-success/20 rounded-full flex-shrink-0">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-text-main text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all ${
                  plan.ctaVariant === "primary"
                    ? "bg-navy text-white hover:bg-opacity-90 hover:scale-105"
                    : "bg-white border-2 border-border text-navy hover:bg-bg-soft"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-main mb-4">
            Questions fréquentes
          </h2>
          <p className="text-text-muted mb-8">
            Des questions ?{" "}
            <Link href="#contact" className="text-navy hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

