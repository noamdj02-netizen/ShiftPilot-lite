# ✅ Script d'Export Créé

## 📦 Fichiers Créés

1. **`scripts/export-files.ts`** - Version TypeScript du script
2. **`scripts/export-files.js`** - Version JavaScript (exécutable directement)
3. **`scripts/README.md`** - Documentation complète du script

## 🚀 Utilisation

### Commande NPM (Recommandé)

```bash
npm run export:files
```

### Commande Directe

```bash
node scripts/export-files.js
```

### Sauvegarder dans un Fichier

```bash
# Linux/Mac
npm run export:files > export-complete.txt

# Windows PowerShell
npm run export:files | Out-File -FilePath export-complete.txt
```

## 📋 Fonctionnalités

- ✅ Exporte tous les fichiers du projet
- ✅ Ignore automatiquement `node_modules`, `.next`, `.git`, etc.
- ✅ Découpe les fichiers volumineux en chunks de 9500 caractères
- ✅ Gère les erreurs de lecture
- ✅ Format clair avec nom de fichier et numéro de partie

## 🎯 Utilisation Recommandée

Ce script est particulièrement utile pour :

1. **Partager le code avec des outils d'IA** (ChatGPT, Claude, etc.)
2. **Créer une documentation complète** du code source
3. **Backup du code** en format texte lisible
4. **Code review** avec des outils externes

## 📝 Format de Sortie

Le script affiche chaque fichier dans ce format :

```
===== FILE: app/layout.tsx — PART 1/1 =====
[contenu du fichier]
```

Pour les fichiers volumineux, ils sont automatiquement divisés en plusieurs parties.

---

**Status** : ✅ Script prêt à utiliser !

