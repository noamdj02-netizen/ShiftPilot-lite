# 🔐 Configuration Google OAuth pour ShiftPilot

## ✅ ID Client Google OAuth

**Client ID**: `398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com`

---

## 📋 Configuration dans Supabase

### 1. Accéder aux paramètres d'authentification

1. Connectez-vous à [Supabase Dashboard](https://app.supabase.com)
2. Sélectionnez votre projet ShiftPilot
3. Allez dans **Authentication** → **Providers**
4. Trouvez **Google** dans la liste des providers

### 2. Configurer Google OAuth

1. **Activez le provider Google** en cliquant sur le toggle
2. **Remplissez les champs suivants** :

   - **Client ID (for OAuth)**: 
     ```
     398816469998-gofsctocpdt9t6i49p9oluirrmrmrmgrg9.apps.googleusercontent.com
     ```

   - **Client Secret (for OAuth)**: 
     ```
     [Votre Client Secret Google - à récupérer dans Google Cloud Console]
     ```

3. **Cliquez sur "Save"**

---

## 🔧 Configuration dans Google Cloud Console

### 1. Accéder à Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Sélectionnez votre projet
3. Allez dans **APIs & Services** → **Credentials**

### 2. Vérifier/Créer les OAuth 2.0 Client IDs

Votre Client ID existe déjà : `398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com`

### 3. Configurer les Authorized redirect URIs

**IMPORTANT** : Ajoutez ces URLs dans **Authorized redirect URIs** :

```
# Développement local
http://localhost:3000/auth/callback

# Production Vercel
https://shiftpilot.vercel.app/auth/callback

# Production domaine personnalisé (si applicable)
https://shiftpilot.fr/auth/callback
https://www.shiftpilot.fr/auth/callback
```

**Comment ajouter** :
1. Cliquez sur votre OAuth 2.0 Client ID
2. Dans la section **Authorized redirect URIs**, cliquez sur **+ ADD URI**
3. Ajoutez chaque URL une par une
4. Cliquez sur **SAVE**

### 4. Récupérer le Client Secret

1. Dans la page de votre OAuth 2.0 Client ID
2. Copiez le **Client secret** (il commence généralement par `GOCSPX-...`)
3. Collez-le dans Supabase (voir section précédente)

---

## ✅ Vérification de la configuration

### Test de connexion Google OAuth

1. **Lancez l'application** :
   ```bash
   npm run dev
   ```

2. **Allez sur la page de connexion** :
   - `http://localhost:3000/login` ou
   - `http://localhost:3000/register`

3. **Cliquez sur "Continuer avec Google"**

4. **Vérifiez que** :
   - ✅ Vous êtes redirigé vers Google
   - ✅ Vous pouvez vous connecter avec votre compte Google
   - ✅ Vous êtes redirigé vers `/auth/callback`
   - ✅ Vous êtes ensuite redirigé vers le dashboard ou l'onboarding

---

## 🐛 Dépannage

### Erreur : "redirect_uri_mismatch"

**Cause** : L'URL de redirection n'est pas dans la liste des Authorized redirect URIs

**Solution** :
1. Vérifiez que toutes les URLs sont bien ajoutées dans Google Cloud Console
2. Vérifiez que l'URL dans le code correspond exactement (pas d'espace, pas de slash final)
3. Attendez quelques minutes après modification (cache Google)

### Erreur : "invalid_client"

**Cause** : Client ID ou Client Secret incorrect dans Supabase

**Solution** :
1. Vérifiez que le Client ID dans Supabase correspond exactement à celui de Google Cloud Console
2. Vérifiez que le Client Secret est correct (copié-collé sans espace)
3. Régénérez le Client Secret si nécessaire

### Erreur : "Profile not found" après connexion Google

**Cause** : Le profil n'est pas créé automatiquement

**Solution** : 
✅ **DÉJÀ CORRIGÉ** - Le code crée maintenant automatiquement le profil si il n'existe pas (voir `lib/api/auth-helper.ts`)

Si le problème persiste :
1. Vérifiez que le trigger `handle_new_user()` existe dans Supabase
2. Vérifiez les logs Supabase pour voir les erreurs éventuelles
3. Vérifiez les politiques RLS sur la table `profiles`

---

## 📝 Variables d'environnement

**Note importante** : Avec Supabase, vous n'avez **PAS besoin** de variables d'environnement pour Google OAuth dans votre application Next.js. La configuration se fait entièrement dans le dashboard Supabase.

Cependant, si vous utilisez directement l'API Google (pas via Supabase), vous pourriez avoir besoin de :

```env
# Optionnel - seulement si vous utilisez directement Google API (pas via Supabase)
GOOGLE_CLIENT_ID=398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

**Pour ShiftPilot, ces variables ne sont PAS nécessaires** car nous utilisons Supabase Auth qui gère Google OAuth.

---

## 🔒 Sécurité

### Bonnes pratiques

1. ✅ **Ne commitez JAMAIS** le Client Secret dans Git
2. ✅ **Utilisez des Client IDs différents** pour développement et production
3. ✅ **Limitez les Authorized redirect URIs** aux URLs de votre application uniquement
4. ✅ **Activez OAuth consent screen** dans Google Cloud Console
5. ✅ **Vérifiez régulièrement** les accès dans Google Cloud Console

---

## 📚 Ressources

- [Documentation Supabase Auth - Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)

---

## ✅ Checklist de configuration

- [ ] Client ID configuré dans Supabase
- [ ] Client Secret configuré dans Supabase
- [ ] Provider Google activé dans Supabase
- [ ] Authorized redirect URIs configurées dans Google Cloud Console
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://shiftpilot.vercel.app/auth/callback`
  - [ ] `https://shiftpilot.fr/auth/callback` (si applicable)
- [ ] Test de connexion Google réussi en local
- [ ] Test de connexion Google réussi en production

---

**Status** : ✅ Configuration prête - Client ID fourni : `398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com`

