# 🚀 ShiftPilot - SaaS de Gestion de Planning pour Restaurants

**ShiftPilot** est un SaaS complet de gestion de plannings pour restaurants et groupes de restauration, avec support multi-établissements, IA de génération de planning, et conformité HCR.

## ✨ Fonctionnalités

- 📅 **Gestion de plannings** avec génération IA
- 👥 **Multi-établissements** (franchises, groupes)
- 🔐 **Sécurité multi-tenant** avec RLS Supabase
- 📱 **PWA installable** (desktop + mobile)
- 💬 **Messagerie interne** en temps réel
- 📊 **Analytics** et exports (PDF/Excel)
- ⚖️ **Conformité HCR** automatique
- 🔔 **Notifications** push et email
- 👤 **2 interfaces** : Employeur (desktop) + Employé (mobile-first)

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion
- **Backend** : Next.js API Routes, Supabase (PostgreSQL + Auth + RLS)
- **State** : Zustand, React Query
- **UI** : Radix UI, Material Symbols
- **Charts** : Recharts
- **PWA** : Service Worker, Web Manifest

## 🚀 Déploiement Rapide

### GitHub ✅

Le code est déjà sur GitHub : `https://github.com/noamdj02-netizen/ShiftPilot-lite.git`

### Vercel

1. **Aller sur [vercel.com/new](https://vercel.com/new)**
2. **Importer** le repo GitHub `ShiftPilot-lite`
3. **Configurer les variables d'environnement** :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
4. **Déployer** → C'est fait ! 🎉

📖 **Guide détaillé** : Voir `DEPLOYMENT_QUICKSTART.md` ou `docs/DEPLOYMENT_VERCEL.md`

## 📦 Installation Locale

```bash
# 1. Cloner
git clone https://github.com/noamdj02-netizen/ShiftPilot-lite.git
cd shiftpilot-lite-landing

# 2. Installer
npm install

# 3. Configurer
cp env.example .env.local
# Éditer .env.local avec vos clés Supabase

# 4. Appliquer migrations Supabase
# Dans Supabase Dashboard → SQL Editor
# Exécuter: supabase/migrations/001_complete_schema.sql

# 5. Lancer
npm run dev
```

## 📚 Documentation

- **Guide Technique** : `docs/TECHNICAL_GUIDE.md`
- **Design System** : `docs/DESIGN_SYSTEM.md`
- **Plan de Refonte** : `docs/REFACTOR_PLAN.md`
- **Progression** : `docs/PROGRESS.md`
- **Déploiement** : `docs/DEPLOYMENT_VERCEL.md`

## 🏗️ Architecture

### Schéma Supabase

- **Multi-tenant** : Isolation par `organization_id`
- **RLS** : Row Level Security sur toutes les tables
- **Tables principales** :
  - `organizations`, `locations`, `profiles`, `employees`
  - `schedules`, `shifts`
  - `time_off_requests`, `messages`, `notifications`
  - `labor_rules`, `audit_logs`

### Routes API

- `POST /api/auth/onboarding-employer` - Création organisation
- `GET /api/dashboard/overview` - KPIs dashboard
- `POST /api/schedules` - Créer planning
- `GET /api/schedules` - Liste plannings
- `PATCH /api/schedules/:id/status` - Publier planning
- `POST /api/shifts` - Créer shifts
- `POST /api/time-off` - Demande congé
- `GET /api/employee/me/schedule` - Planning employé

## 🎨 Design System

- **Couleurs** : Dark mode par défaut (#0A0A0B, #1C1C1E, #6C63FF)
- **Typography** : Inter, IBM Plex Sans
- **Icons** : Material Symbols Outlined
- **Responsive** : Mobile-first (sm: 640px, md: 768px, lg: 1024px)

Voir `docs/DESIGN_SYSTEM.md` pour les détails complets.

## 🔐 Sécurité

- **Auth** : Supabase Auth (email/password, OAuth)
- **RLS** : Row Level Security sur toutes les tables
- **Permissions** : Role-based (OWNER, MANAGER, HR, EMPLOYEE)
- **Multi-tenant** : Isolation complète par organisation

## 📱 PWA

- **Installable** sur desktop (Chrome, Edge) et mobile (Android, iOS)
- **Offline** : Service Worker pour cache
- **Manifest** : `public/manifest.webmanifest`

## 🧪 Tests

```bash
# Tests manuels recommandés :
# 1. Onboarding employeur
# 2. Création planning
# 3. Publication planning
# 4. Vue employé
# 5. Demande congé
```

## 📝 Scripts

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Démarrer production
npm run lint         # Linter
npm run db:generate  # Générer types TypeScript depuis Supabase
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Propriétaire - Tous droits réservés

## 👥 Équipe

Développé avec ❤️ pour les restaurants français

---

**Status** : 🚀 Production-ready (fondations complètes)

**Dernière mise à jour** : 2024
