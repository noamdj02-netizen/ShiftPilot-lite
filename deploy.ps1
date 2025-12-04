# Script de déploiement PowerShell pour ShiftPilot
Write-Host "🚀 Déploiement ShiftPilot..." -ForegroundColor Green

# 1. Nettoyage
Write-Host "📦 Nettoyage..." -ForegroundColor Yellow
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
if (Test-Path node_modules\.cache) { Remove-Item -Recurse -Force node_modules\.cache }

# 2. Installation des dépendances
Write-Host "📥 Installation des dépendances..." -ForegroundColor Yellow
npm install

# 3. Build
Write-Host "🔨 Build..." -ForegroundColor Yellow
npm run build

# 4. Git
Write-Host "📝 Git..." -ForegroundColor Yellow
git add -A
git commit -m "feat: responsive mobile + login/register ready for deployment"
git push origin main

Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
Write-Host "🌐 Connectez votre repo à Vercel pour le déploiement automatique" -ForegroundColor Cyan

