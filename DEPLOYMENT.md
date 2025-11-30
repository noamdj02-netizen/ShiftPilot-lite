# ShiftPilot SaaS - Guide de Déploiement

## 🚀 Déploiement sur Vercel

### Prérequis

1. **Compte GitHub** : Le code est déjà sur GitHub
2. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
3. **Compte Supabase** : Pour la base de données
4. **Compte Resend** (optionnel) : Pour l'envoi d'emails

### Étapes de déploiement

#### 1. Connecter GitHub à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Add New Project"**
3. Importez le repository `noamdj02-netizen/ShiftPilot-lite`
4. Vercel détectera automatiquement Next.js 14

#### 2. Configurer les variables d'environnement

Dans les paramètres du projet Vercel, ajoutez les variables suivantes :

**Obligatoires :**
```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

**Optionnelles (selon les fonctionnalités utilisées) :**
```
EMAIL_API_KEY=re_xxxxx (pour l'envoi d'emails)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxxxx (pour le billing)
STRIPE_SECRET_KEY=sk_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_APP_URL=https://votre-projet.vercel.app
```

#### 3. Configurer Supabase

1. **Créer le schéma** :
   - Ouvrez le SQL Editor dans Supabase
   - Exécutez le contenu de `lib/supabase/schema.sql`

2. **Créer le bucket de stockage** :
   - Allez dans Storage
   - Créez un bucket nommé `employee_docs` (privé)
   - Les politiques RLS sont déjà définies dans le schéma

3. **Vérifier les politiques RLS** :
   - Toutes les tables doivent avoir RLS activé
   - Les politiques sont définies dans `lib/supabase/schema.sql`

#### 4. Déployer

1. Cliquez sur **"Deploy"** dans Vercel
2. Le build se lancera automatiquement
3. Une fois terminé, vous recevrez une URL de déploiement

#### 5. Configuration post-déploiement

1. **Mettre à jour l'URL de l'app** :
   - Dans Supabase : Settings → API → Site URL
   - Ajoutez votre URL Vercel

2. **Tester les fonctionnalités** :
   - Création de compte
   - Login
   - Création d'employés
   - Génération de planning
   - Export PDF
   - Envoi d'email

### 🔄 Déploiements automatiques

Vercel déploiera automatiquement :
- À chaque push sur `main` → Production
- À chaque pull request → Preview

### 📝 Notes importantes

- **Ne jamais commiter** `.env.local` (déjà dans `.gitignore`)
- Les variables d'environnement doivent être configurées dans Vercel
- Le bucket Supabase `employee_docs` doit être créé manuellement
- Vérifiez que toutes les migrations SQL sont appliquées

### 🐛 Dépannage

**Erreur de build :**
- Vérifiez que toutes les variables d'environnement sont définies
- Vérifiez les logs de build dans Vercel

**Erreur de connexion Supabase :**
- Vérifiez les URLs et clés dans les variables d'environnement
- Vérifiez que RLS est correctement configuré

**Erreur d'upload de fichiers :**
- Vérifiez que le bucket `employee_docs` existe dans Supabase
- Vérifiez les politiques de stockage

### 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Resend](https://resend.com/docs)

