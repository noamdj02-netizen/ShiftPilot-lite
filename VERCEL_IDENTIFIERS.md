# 🚀 Identifiants Vercel - ShiftPilot

## ✅ Identifiants Reçus

### Vercel Project ID
```
prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6
```

### Vercel Token / Verification Token
```
vck_8P7aM4mYP72EFPAVUerFhLAu7rPmnohqhMDfqDy1kaARNTMrTd0QWntW
```

---

## 📝 Utilisation

Ces identifiants peuvent être utilisés pour :

1. **Lier le projet local à Vercel** via CLI
2. **Déployer via CLI** au lieu du Dashboard
3. **Configurer l'intégration CI/CD**

---

## 🔧 Configuration via CLI (Optionnel)

Si vous voulez utiliser Vercel CLI :

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter (utiliser le token ci-dessus si demandé)
vercel login

# Lier le projet existant
vercel link

# Déployer en production
vercel --prod
```

**Ou créer un nouveau projet :**
```bash
vercel --prod
# Suivre les prompts et utiliser le Project ID ci-dessus
```

---

## ⚠️ Important

- ✅ Ces identifiants sont déjà dans `.gitignore` via `.vercel/`
- ⚠️ Ne commitez JAMAIS ces tokens dans Git
- 🔒 Gardez ces valeurs privées
- 💡 Pour la plupart des cas, le Dashboard Vercel est plus simple à utiliser

---

## 🎯 Méthode Recommandée : Dashboard Vercel

Pour un déploiement simple, utilisez le Dashboard Vercel :

1. **Aller sur [vercel.com/new](https://vercel.com/new)**
2. **Importer votre repo GitHub**
3. **Configurer les variables d'environnement** (voir `VERCEL_ENV_VARIABLES_PRETE.md`)
4. **Déployer**

Les identifiants ci-dessus sont automatiquement configurés lors de l'import depuis GitHub.

---

**Status** : ✅ Identifiants Vercel documentés - Prêt pour déploiement

