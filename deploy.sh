#!/bin/bash

# Script de déploiement pour ShiftPilot
echo "🚀 Déploiement ShiftPilot..."

# 1. Nettoyage
echo "📦 Nettoyage..."
rm -rf .next
rm -rf node_modules/.cache

# 2. Installation des dépendances
echo "📥 Installation des dépendances..."
npm install

# 3. Build
echo "🔨 Build..."
npm run build

# 4. Git
echo "📝 Git..."
git add -A
git commit -m "feat: responsive mobile + login/register ready for deployment"
git push origin main

echo "✅ Déploiement terminé !"
echo "🌐 Connectez votre repo à Vercel pour le déploiement automatique"

