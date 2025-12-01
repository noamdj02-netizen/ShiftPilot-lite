# ⚠️ NOTE IMPORTANTE - TYPES SUPABASE

## Problème

Les types TypeScript générés dans `types/database.ts` ne correspondent pas encore au nouveau schéma défini dans `supabase/migrations/001_complete_schema.sql`.

Les nouvelles tables suivantes ne sont **pas encore** dans les types :
- `schedules`
- `employees` 
- `locations`
- `time_off_requests`
- `message_channels`
- `messages`
- `labor_rules`
- `audit_logs` (existe mais structure différente)

## Solution temporaire

J'ai ajouté des assertions de type `as any` dans les routes API pour contourner les erreurs TypeScript lors du build.

**Exemple** :
```typescript
await supabase
  .from('organizations')
  .insert({
    name: businessName,
    brand_name: brandName, // Colonne qui n'existe pas dans les types actuels
    // ...
  } as any)
```

## Solution définitive

**Après avoir appliqué la migration `001_complete_schema.sql` dans Supabase** :

1. Régénérer les types :
   ```bash
   npm run db:generate
   ```

2. Retirer les `as any` des routes API

3. Vérifier que tout compile sans erreurs

## Fichiers concernés

- `app/api/auth/onboarding-employer/route.ts`
- `app/api/schedules/route.ts`
- `app/api/schedules/[id]/status/route.ts`
- `app/api/dashboard/overview/route.ts`
- (et autres routes utilisant les nouvelles tables)

## Status

✅ **Build fonctionne** avec les assertions `as any`
⏳ **Types à régénérer** après application de la migration

