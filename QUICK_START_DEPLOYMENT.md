# ⚡ Quick Start - Déploiement ShiftPilot

## 🚀 Déploiement Rapide en 4 Étapes

### Étape 1 : Migrations Supabase (5 minutes)

⚠️ **IMPORTANT** : Vous devez copier le **CONTENU** des fichiers SQL, pas leur nom !

#### Migration 001
1. **Ouvrir** le fichier `supabase/migrations/001_complete_schema.sql` dans votre éditeur
2. **Sélectionner tout** (`Ctrl+A`) puis **Copier** (`Ctrl+C`)
3. **Supabase Dashboard** → **SQL Editor** → **New query**
4. **Coller** le contenu (`Ctrl+V`) → **Run**

#### Migration 002
1. **Ouvrir** le fichier `supabase/migrations/002_consolidate_schema_fixes.sql`
2. **Sélectionner tout** (`Ctrl+A`) puis **Copier** (`Ctrl+C`)
3. **Supabase SQL Editor** → **New query**
4. **Coller** le contenu (`Ctrl+V`) → **Run**

#### Migration 003
1. **Ouvrir** le fichier `supabase/migrations/003_enhance_rls_policies.sql`
2. **Sélectionner tout** (`Ctrl+A`) puis **Copier** (`Ctrl+C`)
3. **Supabase SQL Editor** → **New query**
4. **Coller** le contenu (`Ctrl+V`) → **Run**

✅ **Vérifier** : 12 tables créées (voir liste dans DEPLOYMENT_COMPLETE_GUIDE.md)

💡 **Astuce** : Vérifiez que le contenu copié commence par `--` ou `CREATE` (c'est du SQL, pas un nom de fichier !)

---

### Étape 2 : Variables Vercel (5 minutes)

**Supabase Dashboard** → **Settings** → **API** :
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (⚠️ SECRÈTE)

**Vercel** → **Settings** → **Environment Variables** :
- Ajouter les 3 variables ci-dessus
- `NEXT_PUBLIC_APP_URL` = `https://votre-app.vercel.app` (à mettre à jour après)

---

### Étape 3 : Déploiement Vercel (2 minutes)

1. [vercel.com/new](https://vercel.com/new) → Importer repo GitHub
2. Configurer variables d'environnement
3. Cliquer sur **Deploy**
4. Attendre 2-5 minutes

---

### Étape 4 : Mise à Jour URL (1 minute)

1. Copier l'URL de production Vercel
2. Vercel → **Settings** → **Environment Variables**
3. Mettre à jour `NEXT_PUBLIC_APP_URL` avec l'URL réelle
4. **Redeployer**

---

## ✅ Vérification Rapide

- [ ] Site accessible : `https://votre-app.vercel.app`
- [ ] Login fonctionne : `/login/employer`
- [ ] Dashboard accessible : `/dashboard`
- [ ] Pas d'erreurs console (F12)

---

## 📖 Guide Complet

Pour plus de détails, voir : **`DEPLOYMENT_COMPLETE_GUIDE.md`**

---

**⏱️ Temps total estimé** : 15-20 minutes

