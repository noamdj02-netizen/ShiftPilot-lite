# 🚀 Configuration Vercel - ShiftPilot

## ✅ Identifiants Vercel Reçus

### Project ID
```
prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6
```

### API Token / Verification Token
```
vck_8P7aM4mYP72EFPAVUerFhLAu7rPmnohqhMDfqDy1kaARNTMrTd0QWntW
```

---

## 📝 Configuration du Projet Vercel

### Option 1 : Via Dashboard Vercel (Recommandé)

1. **Aller sur [vercel.com/new](https://vercel.com/new)**
2. **Importer le repo GitHub** ShiftPilot
3. **Configurer les variables d'environnement** (voir `VERCEL_ENV_VARIABLES_PRETE.md`)
4. **Déployer**

### Option 2 : Via CLI Vercel

Si vous voulez utiliser la ligne de commande :

```bash
# Installer Vercel CLI (si pas déjà installé)
npm i -g vercel

# Se connecter (utiliser le token ci-dessus si demandé)
vercel login

# Lier le projet
vercel link

# Déployer
vercel --prod
```

---

## 🔐 Variables d'Environnement à Configurer

Consultez le fichier `VERCEL_ENV_VARIABLES_PRETE.md` pour la liste complète avec vos valeurs Supabase.

### Variables Obligatoires :

1. `NEXT_PUBLIC_SUPABASE_URL` = `https://otuybbxfzjeuxppfihvv.supabase.co`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (voir VERCEL_ENV_VARIABLES_PRETE.md)
3. `SUPABASE_SERVICE_ROLE_KEY` = (à récupérer depuis Supabase Dashboard)
4. `NEXT_PUBLIC_APP_URL` = (sera mis à jour après le premier déploiement)

---

## ✅ Prochaines Étapes

1. ✅ **Variables d'environnement configurées** → Voir `VERCEL_ENV_VARIABLES_PRETE.md`
2. ⏳ **Déployer sur Vercel** → Via Dashboard ou CLI
3. ⏳ **Tester l'application** → Vérifier que tout fonctionne
4. ⏳ **Mettre à jour NEXT_PUBLIC_APP_URL** → Avec l'URL de production réelle

---

**⚠️ Note de Sécurité :** 
- Ne commitez JAMAIS ces tokens dans Git
- Les fichiers `.vercel` sont déjà dans `.gitignore`
- Gardez ces valeurs privées

---

**Status** : ✅ Identifiants Vercel reçus - Prêt pour le déploiement !

