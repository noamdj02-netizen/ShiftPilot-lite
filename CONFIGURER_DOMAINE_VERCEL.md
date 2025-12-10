# 🔗 Configuration du domaine shiftpilot.fr sur Vercel

## Problème
Le domaine `shiftpilot.fr` est déjà assigné à un autre projet Vercel. Il faut le configurer via le Dashboard.

## Solution : Via Dashboard Vercel

### Étape 1 : Accéder au Dashboard
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Connectez-vous avec votre compte

### Étape 2 : Sélectionner le projet
1. Trouvez et sélectionnez le projet : **shiftpilot-lite-landing**

### Étape 3 : Configurer le domaine
1. Allez dans **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez `shiftpilot.fr`
4. Si le domaine est déjà dans votre compte mais sur un autre projet :
   - Vous verrez un message indiquant que le domaine existe
   - Cliquez sur **Transfer Domain** ou **Assign to this project**
5. Vercel vous donnera des instructions DNS si nécessaire

### Étape 4 : Vérifier l'alias
Une fois le domaine ajouté :
- Vercel créera automatiquement l'alias vers le dernier déploiement de production
- Ou vous pouvez manuellement assigner le domaine au déploiement : `shiftpilot-lite-landing-pma52801b.vercel.app`

## Alternative : Retirer et réassigner le domaine

Si le domaine est sur un autre projet et que vous voulez le déplacer :

1. Allez sur le projet qui a actuellement le domaine
2. **Settings** → **Domains**
3. Supprimez `shiftpilot.fr` de ce projet
4. Retournez sur `shiftpilot-lite-landing`
5. Ajoutez le domaine

## Vérification DNS

Si vous devez configurer DNS, Vercel vous donnera ces informations :

**Pour shiftpilot.fr (domaine racine) :**
- Type: A
- Value: 76.76.21.21
- OU Type: CNAME  
- Value: cname.vercel-dns.com

**Pour www.shiftpilot.fr :**
- Type: CNAME
- Value: cname.vercel-dns.com

## Une fois configuré

1. Attendez quelques minutes pour la propagation DNS
2. Vérifiez que le statut du domaine est **Valid** dans Vercel
3. Testez : `https://shiftpilot.fr`

---

**Dernier déploiement de production :**
- URL: `https://shiftpilot-lite-landing-pma52801b.vercel.app`
- Status: ✅ Ready
- Date: Il y a 9 minutes

