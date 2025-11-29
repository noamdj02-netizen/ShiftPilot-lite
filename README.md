# ShiftPilot Lite - Landing Page

Landing page moderne et responsive pour ShiftPilot, une solution de gestion de plannings pour restaurants.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **Lucide React** (icônes)

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
/app
  ├─ page.tsx          # Page principale
  ├─ layout.tsx        # Layout racine
  └─ globals.css       # Styles globaux

/components
  /layout
    ├─ Navbar.tsx      # Navigation principale
    └─ Footer.tsx      # Footer
  /sections
    ├─ Hero.tsx        # Section hero avec dashboard
    ├─ SocialProof.tsx # Preuve sociale
    ├─ Features.tsx     # Fonctionnalités
    ├─ Testimonials.tsx # Témoignages
    ├─ Pricing.tsx     # Tarifs
    └─ FinalCTA.tsx    # CTA final
  /ui
    ├─ Button.tsx      # Composant bouton
    ├─ Card.tsx        # Composant carte
    └─ SectionReveal.tsx # Animations de révélation
```

## 🎨 Design System

### Couleurs principales
- **Violet**: `#8976FD`
- **Bleu**: `#7180FF`
- **Jaune**: `#FCA61F`
- **Sky**: `#6CC8FF`
- **Dark**: `#1a1a2e`

### Animations
Toutes les animations sont gérées par **Framer Motion** avec des transitions fluides et des effets de révélation au scroll.

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre compte GitHub à [Vercel](https://vercel.com)
2. Importez le repository `ShiftPilot-lite`
3. Vercel détectera automatiquement Next.js
4. Cliquez sur "Deploy"

Le site sera déployé automatiquement à chaque push sur `main`.

### Variables d'environnement

Si nécessaire, ajoutez vos variables d'environnement dans les paramètres du projet Vercel.

## 📝 License

Propriétaire - ShiftPilot
