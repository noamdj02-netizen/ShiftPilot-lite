# 🔍 Débogage de la page de login - shiftpilot.fr/login

## Problème identifié
La page de login ne fonctionne pas en production. Le site est accessible mais l'authentification échoue.

## Causes probables

### 1. Variables d'environnement Supabase manquantes ⚠️ (Plus probable)

Les variables d'environnement Supabase ne sont probablement pas configurées correctement dans Vercel.

**Solution :**

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez le projet **shiftpilot-lite-landing**
3. Allez dans **Settings** → **Environment Variables**
4. Vérifiez que ces variables sont présentes et correctes pour **Production** :

```env
NEXT_PUBLIC_SUPABASE_URL=https://jjscsidjqpnbgdfnhigh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2NzaWRqcXBuYmdkZm5oaWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODc1NzMsImV4cCI6MjA4MDI2MzU3M30.0h_HrpcA8hglry5K6PHwyZYEY4JGgustbz9tnpH5-dI
SUPABASE_SERVICE_ROLE_KEY=<votre-service-role-key>
NEXT_PUBLIC_APP_URL=https://shiftpilot.fr
```

5. **Redéployez** après avoir ajouté/modifié les variables :
   ```bash
   vercel --prod
   ```

### 2. Configuration Supabase - URLs de redirection

Vérifiez que les URLs de redirection sont configurées dans Supabase.

**Solution :**

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **URL Configuration**
4. Ajoutez ces URLs dans **Redirect URLs** :
   ```
   https://shiftpilot.fr/**
   https://www.shiftpilot.fr/**
   https://shiftpilot-lite-landing-*.vercel.app/**
   ```
5. Dans **Site URL**, mettez :
   ```
   https://shiftpilot.fr
   ```

### 3. Vérification des logs

**Vérifier les logs Vercel :**

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Deployments** → Sélectionnez le dernier déploiement
4. Ouvrez **Functions** pour voir les logs
5. Vérifiez s'il y a des erreurs liées à Supabase

**Vérifier la console du navigateur :**

1. Ouvrez https://shiftpilot.fr/login
2. Appuyez sur **F12** pour ouvrir les DevTools
3. Allez dans l'onglet **Console**
4. Essayez de vous connecter
5. Notez les erreurs affichées

### 4. Test de connexion manuel

Créez un compte de test pour vérifier que l'authentification fonctionne :

1. Allez sur https://shiftpilot.fr/register
2. Créez un compte
3. Vérifiez votre email pour la confirmation
4. Essayez de vous connecter

## Test rapide

Ouvrez la console du navigateur (F12) sur https://shiftpilot.fr/login et exécutez :

```javascript
// Vérifier si Supabase est configuré
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20))

// Tester la connexion Supabase
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
console.log('Supabase client:', supabase)
```

## Checklist de vérification

- [ ] Variables d'environnement configurées dans Vercel (Production)
- [ ] URLs de redirection configurées dans Supabase
- [ ] Site URL configuré dans Supabase
- [ ] Redéploiement effectué après modification des variables
- [ ] Pas d'erreurs dans les logs Vercel
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Test de connexion avec un compte valide

## Prochaines étapes

1. Vérifiez d'abord les variables d'environnement dans Vercel
2. Redéployez si nécessaire
3. Vérifiez la configuration Supabase
4. Testez la connexion
5. Consultez les logs si le problème persiste

