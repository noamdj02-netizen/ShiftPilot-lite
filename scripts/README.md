# 📦 Scripts Utilitaires

## Export de Fichiers

### Description

Script pour exporter tous les fichiers du projet en format texte, utile pour :
- Partager le code avec des outils d'IA
- Générer une documentation complète
- Backup du code source

### Utilisation

```bash
npm run export:files
```

Ou directement :

```bash
node scripts/export-files.js
```

### Fonctionnalités

- ✅ Ignore automatiquement les dossiers inutiles (`node_modules`, `.next`, `.git`, etc.)
- ✅ Découpe les fichiers volumineux en chunks de 9500 caractères
- ✅ Affiche chaque fichier avec son chemin complet
- ✅ Gère les erreurs de lecture de fichiers

### Fichiers Ignorés

- `node_modules/`
- `.next/`
- `.git/`
- `.turbo/`
- `.env*`
- `.DS_Store`
- `dist/`
- `build/`
- `coverage/`
- `.vercel/`
- `.cache/`

### Format de Sortie

```
===== EXPORT BEGIN =====

===== FILE: app/layout.tsx — PART 1/1 =====
[contenu du fichier]

===== FILE: app/page.tsx — PART 1/2 =====
[première partie du fichier]

===== FILE: app/page.tsx — PART 2/2 =====
[deuxième partie du fichier]

...

===== EXPORT COMPLETE =====
```

### Redirection vers un Fichier

Pour sauvegarder l'export dans un fichier :

```bash
npm run export:files > export-complete.txt
```

Ou sur Windows PowerShell :

```powershell
npm run export:files | Out-File -FilePath export-complete.txt
```

