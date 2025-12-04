# 📋 Variables Vercel - Copier-Coller Direct

## 🚀 Configuration Rapide pour Vercel Dashboard

Copiez chaque variable ci-dessous dans **Vercel Dashboard → Settings → Environment Variables**

Sélectionnez les environnements : ✅ Production, ✅ Preview, ✅ Development

---

## ✅ Variables OBLIGATOIRES

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://otuybbxfzjeuxppfihvv.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
```

### 3. SUPABASE_SERVICE_ROLE_KEY
```
⚠️ À récupérer depuis Supabase Dashboard → Settings → API → service_role key
```

**🔍 Comment récupérer :**
1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Dans **Project API keys**, copiez la clé **service_role** (commence par `eyJ...`)

### 4. NEXT_PUBLIC_APP_URL
```
https://shiftpilot.vercel.app
```

**⚠️ Important :** Mettre à jour après le premier déploiement avec l'URL réelle de Vercel.

---

## 📝 Instructions pour Vercel Dashboard

### Étape par Étape

1. **Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)**
2. **Sélectionner votre projet** (Project ID: `prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`)
3. **Cliquer sur Settings** (menu gauche)
4. **Cliquer sur Environment Variables**
5. **Pour chaque variable :**
   - Cliquer sur **Add New**
   - Entrer le **Key** (nom de la variable)
   - Coller la **Value** (valeur ci-dessus)
   - Cocher : ✅ Production, ✅ Preview, ✅ Development
   - Cliquer sur **Save**

---

## ✅ Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` ajoutée
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ajoutée
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ajoutée (récupérer depuis Supabase)
- [ ] `NEXT_PUBLIC_APP_URL` ajoutée (temporaire)
- [ ] Toutes les variables configurées pour Production + Preview + Development

---

## 🚀 Après Configuration

1. ✅ Cliquer sur **Deploy** dans Vercel
2. ✅ Attendre la fin du build
3. ✅ Copier l'URL de production
4. ✅ Mettre à jour `NEXT_PUBLIC_APP_URL`
5. ✅ Redeployer

---

**Status** : ✅ Prêt à copier-coller dans Vercel !

