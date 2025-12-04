# 🚀 Déploiement Vercel Final - ShiftPilot

## ✅ Configuration Complète

### Identifiants Vercel
- **Project ID**: `prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`
- **Token**: `vck_8P7aM4mYP72EFPAVUerFhLAu7rPmnohqhMDfqDy1kaARNTMrTd0QWntW`

### Identifiants Supabase
- **URL**: `https://otuybbxfzjeuxppfihvv.supabase.co`
- **Anon Key**: (voir `VERCEL_ENV_VARIABLES_PRETE.md`)

---

## 📋 Checklist Complète de Déploiement

### Phase 1 : Configuration Vercel

- [ ] Projet Vercel créé/linké (Project ID: `prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`)
- [ ] Repo GitHub connecté à Vercel
- [ ] Variables d'environnement configurées (voir ci-dessous)

### Phase 2 : Variables d'Environnement OBLIGATOIRES

Dans Vercel Dashboard → Settings → Environment Variables, ajouter :

#### ✅ Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
SUPABASE_SERVICE_ROLE_KEY=[À récupérer depuis Supabase Dashboard → Settings → API → service_role]
```

#### ✅ Application
```
NEXT_PUBLIC_APP_URL=https://shiftpilot.vercel.app
```
⚠️ **Important** : Mettre à jour après le premier déploiement avec l'URL réelle.

### Phase 3 : Déploiement

- [ ] Cliquer sur **Deploy** dans Vercel
- [ ] Attendre la fin du build (2-5 minutes)
- [ ] Vérifier qu'il n'y a pas d'erreur

### Phase 4 : Post-Déploiement

- [ ] Copier l'URL de production (ex: `https://shiftpilot-xxxxx.vercel.app`)
- [ ] Mettre à jour `NEXT_PUBLIC_APP_URL` avec cette URL
- [ ] Redeployer

### Phase 5 : Tests

- [ ] ✅ Page d'accueil charge
- [ ] ✅ Connexion fonctionne
- [ ] ✅ Dashboard s'affiche
- [ ] ✅ Plannings fonctionnent
- [ ] ✅ Messagerie fonctionne
- [ ] ✅ Gestion des congés fonctionne

---

## 🎯 Guide Détaillé

### Pour les Variables d'Environnement
👉 Voir `VERCEL_ENV_VARIABLES_PRETE.md`

### Pour la Configuration Vercel
👉 Voir `VERCEL_IDENTIFIERS.md`

### Pour le Résumé Global
👉 Voir `DEPLOYMENT_READY_SUMMARY.md`

---

## 📝 Notes Importantes

1. **SERVICE_ROLE_KEY** : Récupérer depuis Supabase Dashboard (c'est un secret sensible)
2. **NEXT_PUBLIC_APP_URL** : Mettre à jour après le premier déploiement
3. **Project ID** : Déjà configuré (`prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`)
4. **Token** : Déjà configuré (pour CLI si nécessaire)

---

**Status** : ✅ **PRÊT POUR DÉPLOIEMENT**

Toutes les informations sont maintenant documentées. Vous pouvez déployer ! 🚀

