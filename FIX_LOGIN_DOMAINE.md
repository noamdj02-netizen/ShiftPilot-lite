# 🔧 Correction du Login sur le Domaine

## 🎯 Problème
Le login ne fonctionne pas sur votre domaine (ex: shiftpilot.fr)

## ✅ Solution en 3 étapes

### 1️⃣ Configurer les Redirect URLs dans Supabase

**C'est la cause principale du problème !**

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **URL Configuration**
4. Dans **Redirect URLs**, ajoutez **TOUTES** ces URLs :

```
https://shiftpilot.fr/auth/callback
https://shiftpilot.fr/**
https://www.shiftpilot.fr/auth/callback
https://www.shiftpilot.fr/**
https://shiftpilot-lite-landing-ij7aegjbi.vercel.app/auth/callback
https://shiftpilot-lite-landing-ij7aegjbi.vercel.app/**
```

**Important :**
- Ajoutez **chaque URL sur une ligne séparée**
- Cliquez **Save** après avoir ajouté toutes les URLs

### 2️⃣ Mettre à jour NEXT_PUBLIC_APP_URL dans Vercel

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `shiftpilot-lite-landing`
3. **Settings** → **Environment Variables**
4. Trouvez `NEXT_PUBLIC_APP_URL`
5. Modifiez la valeur pour :
   ```
   https://shiftpilot.fr
   ```
   (ou votre domaine réel)
6. Cliquez **Save**

### 3️⃣ Redéployer sur Vercel

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Sélectionnez **Redeploy**
4. Attendez la fin du déploiement

---

## 🔍 Vérification

Après avoir fait ces 3 étapes, testez :

1. Allez sur `https://shiftpilot.fr/login`
2. Essayez de vous connecter
3. Vérifiez que vous êtes redirigé vers `/dashboard/employer`

---

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier les variables d'environnement

Assurez-vous que ces variables sont configurées dans Vercel :

- ✅ `NEXT_PUBLIC_SUPABASE_URL` = `https://otuybbxfzjeuxppfihvv.supabase.co`
- ✅ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` = `sb_publishable_XH6CjSHU-PCUvm-o_8xmIg_srdDxlor`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = (votre clé service_role)
- ✅ `NEXT_PUBLIC_APP_URL` = `https://shiftpilot.fr`

### Vérifier les logs Vercel

1. Allez dans **Deployments** → Cliquez sur le dernier déploiement
2. Allez dans **Functions** → Regardez les logs
3. Cherchez les erreurs liées à Supabase ou à l'authentification

### Vérifier la console du navigateur

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet **Console**
3. Essayez de vous connecter
4. Regardez les erreurs affichées

---

## 📝 Checklist

- [ ] Redirect URLs configurées dans Supabase (toutes les URLs listées ci-dessus)
- [ ] `NEXT_PUBLIC_APP_URL` mis à jour avec votre domaine dans Vercel
- [ ] Redéploiement effectué après les modifications
- [ ] Test de connexion effectué
- [ ] Vérification des logs en cas d'erreur

---

## ⚠️ Important

**Les Redirect URLs dans Supabase sont OBLIGATOIRES** pour que l'authentification fonctionne sur votre domaine. Sans elles, Supabase rejettera les tentatives de connexion depuis votre domaine.

