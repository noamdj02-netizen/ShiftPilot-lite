# 🔧 DÉPANNAGE - ERREUR ENVOI SMS

## ❌ Erreur : "Erreur lors de l'envoi des SMS"

### Causes possibles

1. **Aucun employé avec numéro de téléphone**
   - Vérifiez que vos employés ont un numéro de téléphone dans leur profil
   - Allez sur `/dashboard/employer/employees` et vérifiez les numéros

2. **Table `sms_messages` n'existe pas**
   - Exécutez la migration : `supabase/migrations/024_add_sms_tables.sql`
   - Dans Supabase Dashboard → SQL Editor

3. **Twilio non configuré**
   - Vérifiez `.env.local` contient :
     ```
     TWILIO_ACCOUNT_SID=votre_account_sid_ici
     TWILIO_AUTH_TOKEN=votre_auth_token_ici
     TWILIO_PHONE_NUMBER=+1234567890
     ```
   - ⚠️ **Important** : Remplacez les valeurs par vos vraies credentials Twilio
   - Récupérez-les depuis [Twilio Console](https://console.twilio.com) → Account → API Credentials

4. **Format de numéro invalide**
   - Les numéros doivent être au format international : `+33612345678`
   - Vérifiez les numéros dans la table `profiles`

5. **Crédits Twilio épuisés**
   - Vérifiez votre compte Twilio Dashboard
   - Ajoutez des crédits si nécessaire

### Solutions

#### Solution 1 : Vérifier les employés
```sql
-- Dans Supabase SQL Editor
SELECT id, first_name, last_name, phone 
FROM profiles 
WHERE organization_id = 'votre-org-id' 
  AND is_active = true 
  AND phone IS NOT NULL;
```

#### Solution 2 : Appliquer la migration
1. Ouvrez Supabase Dashboard → SQL Editor
2. Copiez-collez le contenu de `supabase/migrations/024_add_sms_tables.sql`
3. Exécutez le script

#### Solution 3 : Vérifier Twilio
1. Connectez-vous à [Twilio Console](https://console.twilio.com)
2. Allez dans **Phone Numbers** → **Manage** → **Active numbers**
3. Copiez votre numéro (format : `+1234567890`)
4. Ajoutez dans `.env.local` :
   ```
   TWILIO_PHONE_NUMBER=+votre-numero-ici
   ```
5. Redémarrez le serveur : `npm run dev`

#### Solution 4 : Mode simulation (pour tester)
Si Twilio n'est pas configuré, le système fonctionne en mode simulation :
- Les SMS ne sont pas réellement envoyés
- Mais ils sont loggés dans la base de données
- Parfait pour tester sans coût

### Vérification

Pour vérifier que tout fonctionne :

1. **Vérifier les logs serveur** :
   - Ouvrez la console du terminal où `npm run dev` tourne
   - Regardez les erreurs détaillées

2. **Vérifier la réponse API** :
   - Ouvrez DevTools (F12) → Network
   - Envoyez un SMS
   - Cliquez sur la requête `/api/sms/send-bulk`
   - Regardez la réponse (onglet Response)

3. **Vérifier la base de données** :
   ```sql
   SELECT * FROM sms_messages 
   ORDER BY sent_at DESC 
   LIMIT 10;
   ```

### Messages d'erreur courants

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Aucun employé avec numéro" | Pas d'employés avec téléphone | Ajoutez des numéros dans les profils |
| "Organization required" | Pas d'organisation | Complétez l'onboarding |
| "Twilio error" | Problème Twilio | Vérifiez les credentials et le numéro |
| "Failed to fetch employees" | Erreur DB | Vérifiez la connexion Supabase |

### Test rapide

Pour tester sans Twilio (mode simulation) :
1. Laissez `TWILIO_PHONE_NUMBER` vide ou commenté
2. Le système utilisera le mode simulation
3. Les SMS seront loggés mais pas envoyés

---

**Si le problème persiste**, vérifiez les logs serveur pour plus de détails.

