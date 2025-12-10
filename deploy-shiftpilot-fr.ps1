# Script PowerShell pour déployer shiftpilot-lite-landing sur shiftpilot.fr
# Usage: .\deploy-shiftpilot-fr.ps1

Write-Host "🚀 Déploiement ShiftPilot sur shiftpilot.fr" -ForegroundColor Cyan
Write-Host ""

# Vérifier que Vercel CLI est installé
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
    Write-Host "Installez-le avec: npm i -g vercel" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Vercel CLI détecté" -ForegroundColor Green

# Vérifier que nous sommes dans le bon répertoire
if (!(Test-Path "package.json")) {
    Write-Host "❌ package.json introuvable. Exécutez ce script depuis la racine du projet." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projet détecté" -ForegroundColor Green
Write-Host ""

# Vérifier les variables d'environnement essentielles
Write-Host "⚠️  IMPORTANT: Vérifiez que vous avez configuré les variables d'environnement dans Vercel Dashboard" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_APP_URL=https://shiftpilot.fr" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Continuer avec le déploiement? (O/N)"

if ($confirm -ne "O" -and $confirm -ne "o" -and $confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Déploiement annulé." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "📦 Déploiement en cours..." -ForegroundColor Cyan
Write-Host ""

# Déployer en production
try {
    vercel --prod --yes
    
    Write-Host ""
    Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
    Write-Host "   1. Allez sur https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   2. Sélectionnez votre projet" -ForegroundColor White
    Write-Host "   3. Settings → Domains → Add Domain" -ForegroundColor White
    Write-Host "   4. Entrez: shiftpilot.fr" -ForegroundColor White
    Write-Host "   5. Configurez les DNS selon les instructions Vercel" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Une fois les DNS configurés, votre site sera accessible sur https://shiftpilot.fr" -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "❌ Erreur lors du déploiement:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Conseils:" -ForegroundColor Yellow
    Write-Host "   - Vérifiez que vous êtes connecté: vercel login" -ForegroundColor Yellow
    Write-Host "   - Vérifiez les erreurs ci-dessus" -ForegroundColor Yellow
    exit 1
}
