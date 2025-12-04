# 🚀 Instructions de Déploiement - ShiftPilot

## ✅ État actuel

### Pages Login/Register
- ✅ `/login` - Page de connexion fonctionnelle (`app/(auth)/login/page.tsx`)
- ✅ `/register` - Page d'inscription fonctionnelle (`app/(auth)/register/page.tsx`)
- ✅ Redirection vers `/portal` après authentification

### Responsive Mobile
- ✅ Layout dashboard avec menu mobile (drawer)
- ✅ Sidebar responsive (cachée sur mobile, drawer animé)
- ✅ Toutes les pages optimisées pour mobile
- ✅ Graphiques responsive (recharts)
- ✅ Navigation mobile fonctionnelle

### Corrections
- ✅ Erreur TypeScript dans `absences/page.tsx` (photo optionnelle)
- ✅ Erreur `useEffect` dans `layout.tsx` (import ajouté)
- ✅ Page `offline/page.tsx` corrigée (`'use client'` ajouté)

## 📦 Déploiement GitHub

```bash
# 1. Ajouter tous les fichiers
git add -A

# 2. Commit
git commit -m "feat: responsive mobile + login/register pages ready for deployment"

# 3. Push vers GitHub
git push origin main
```

## 🌐 Déploiement Vercel

### Option 1 : Via l'interface Vercel
1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repo GitHub `ShiftPilot-lite`
3. Configurer les variables d'environnement (voir ci-dessous)
4. Cliquer sur "Deploy"

### Option 2 : Via CLI Vercel
```bash
npm i -g vercel
vercel
```

## 🔐 Variables d'environnement Vercel

Dans les paramètres du projet Vercel, ajouter :

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 📱 Test sur iPhone

Une fois déployé sur Vercel :
1. Obtenir l'URL de déploiement (ex: `https://shiftpilot.vercel.app`)
2. Ouvrir l'URL sur votre iPhone
3. Tester le responsive mobile
4. Tester les pages `/login` et `/register`

## 🧹 Nettoyage (optionnel)

Si vous voulez nettoyer les fichiers de documentation :
```bash
# Supprimer les fichiers .md de documentation (optionnel)
rm -f *.md docs/*.md
# Ou garder seulement README.md
```

## ✅ Checklist finale

- [ ] Code commité sur GitHub
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Déploiement réussi sur Vercel
- [ ] Test sur iPhone effectué
- [ ] Pages login/register fonctionnelles
- [ ] Responsive mobile vérifié

## 🎉 C'est prêt !

Une fois déployé, votre SaaS sera accessible depuis n'importe quel appareil, y compris votre iPhone.

