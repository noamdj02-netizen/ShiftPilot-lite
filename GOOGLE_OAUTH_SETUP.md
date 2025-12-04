# Configuration Google OAuth avec Supabase

## 📋 ID Client Google

Votre ID client Google :
```
398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com
```

## 🔧 Configuration dans Supabase Dashboard

### 1. Accéder aux paramètres d'authentification

1. Connectez-vous à [Supabase Dashboard](https://app.supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **Providers**
4. Cliquez sur **Google**

### 2. Configurer Google OAuth

Dans le formulaire de configuration Google :

1. **Enable Google provider** : Activez le toggle
2. **Client ID (for OAuth)** : 
   ```
   398816469998-gofsctocpdt9t6i49p9oluirrmrmgrg9.apps.googleusercontent.com
   ```
3. **Client Secret (for OAuth)** : 
   - Récupérez le secret depuis [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Allez dans **APIs & Services** → **Credentials**
   - Trouvez votre OAuth 2.0 Client ID
   - Copiez le **Client Secret**

### 3. Configurer les URI de redirection dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Sélectionnez votre projet
3. Allez dans **APIs & Services** → **Credentials**
4. Cliquez sur votre OAuth 2.0 Client ID
5. Dans **Authorized redirect URIs**, ajoutez :

   **Pour le développement local :**
   ```
   http://localhost:3000/auth/callback
   ```

   **Pour la production (remplacez par votre domaine) :**
   ```
   https://votre-domaine.com/auth/callback
   https://votre-domaine.vercel.app/auth/callback
   ```

   **URI Supabase (obligatoire) :**
   ```
   https://[VOTRE-PROJECT-REF].supabase.co/auth/v1/callback
   ```
   Remplacez `[VOTRE-PROJECT-REF]` par votre référence de projet Supabase (visible dans l'URL de votre dashboard Supabase).

### 4. Vérifier la configuration

Une fois configuré :

1. ✅ Le provider Google doit être **Enabled** dans Supabase
2. ✅ Les URI de redirection doivent être configurées dans Google Cloud Console
3. ✅ Le Client ID et Client Secret doivent être renseignés dans Supabase

## 🧪 Tester l'authentification Google

1. Démarrez votre application :
   ```bash
   npm run dev
   ```

2. Allez sur `/login` ou `/register`

3. Cliquez sur **"Continuer avec Google"**

4. Vous devriez être redirigé vers Google pour l'authentification

5. Après validation, vous serez redirigé vers `/auth/callback` puis vers le dashboard

## ⚠️ Notes importantes

- **Le Client ID et Secret sont stockés dans Supabase**, pas dans votre code Next.js
- **Ne commitez jamais** le Client Secret dans votre code
- Les URI de redirection doivent correspondre exactement (pas de slash final, protocole correct)
- Pour la production, ajoutez toutes les variantes de votre domaine (avec/sans www, etc.)

## 🔍 Dépannage

### Erreur : "redirect_uri_mismatch"
- Vérifiez que l'URI de redirection dans Google Cloud Console correspond exactement à celle utilisée
- N'oubliez pas d'ajouter l'URI Supabase : `https://[PROJECT-REF].supabase.co/auth/v1/callback`

### Erreur : "invalid_client"
- Vérifiez que le Client ID et Secret sont correctement renseignés dans Supabase
- Vérifiez que le Client ID correspond bien à celui de Google Cloud Console

### L'authentification fonctionne mais la redirection échoue
- Vérifiez que la route `/auth/callback` existe bien
- Vérifiez les logs du serveur pour voir les erreurs

## 📚 Ressources

- [Documentation Supabase - Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

