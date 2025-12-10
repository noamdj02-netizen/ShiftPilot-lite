# Script PowerShell pour déployer ShiftPilot sur Vercel
# Usage: .\deploy-vercel.ps1

Write-Host "🚀 Déploiement ShiftPilot sur Vercel" -ForegroundColor Cyan
Write-Host ""

# Vérifier que Vercel CLI est installé
Write-Host "📦 Vérification de Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version 2>&1
    Write-Host "✅ Vercel CLI installé: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI non trouvé. Installation..." -ForegroundColor Red
    Write-Host "Exécutez: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json non trouvé. Êtes-vous dans le bon répertoire ?" -ForegroundColor Red
    exit 1
}

# Vérifier que .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local non trouvé" -ForegroundColor Yellow
    Write-Host "Assurez-vous d'avoir configuré vos variables d'environnement" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continuer quand même ? (o/N)"
    if ($continue -ne "o" -and $continue -ne "O") {
        exit 1
    }
}

# Vérifier le build local
Write-Host ""
Write-Host "🔨 Test du build local..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Le build a échoué. Corrigez les erreurs avant de déployer." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build réussi !" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du build: $_" -ForegroundColor Red
    exit 1
}

# Afficher les instructions
Write-Host ""
Write-Host "📋 Instructions pour le déploiement:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Exécutez: vercel --prod" -ForegroundColor White
Write-Host "2. Répondez aux prompts:" -ForegroundColor White
Write-Host "   - Lier à un projet existant ? N" -ForegroundColor Gray
Write-Host "   - Nom du projet ? shiftpilot" -ForegroundColor Gray
Write-Host "   - Répertoire ? ." -ForegroundColor Gray
Write-Host "   - Override settings ? N" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Après le déploiement:" -ForegroundColor White
Write-Host "   - Configurez les variables d'environnement dans Vercel Dashboard" -ForegroundColor Gray
Write-Host "   - Ajoutez votre domaine personnalisé" -ForegroundColor Gray
Write-Host "   - Configurez les DNS" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Guide complet: DEPLOY_VERCEL_RAPIDE.md" -ForegroundColor Cyan
Write-Host ""

# Demander si l'utilisateur veut continuer
$deploy = Read-Host "Voulez-vous lancer le déploiement maintenant ? (o/N)"
if ($deploy -eq "o" -or $deploy -eq "O") {
    Write-Host ""
    Write-Host "🚀 Lancement du déploiement..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host ""
    Write-Host "Déploiement annulé. Exécutez 'vercel --prod' quand vous êtes prêt." -ForegroundColor Yellow
}
