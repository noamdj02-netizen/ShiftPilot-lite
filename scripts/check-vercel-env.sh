#!/bin/bash

# Script pour vérifier que toutes les variables d'environnement nécessaires sont configurées
# Utilisation: ./scripts/check-vercel-env.sh

set -e

echo "🔍 Vérification des variables d'environnement pour Vercel"
echo "======================================================"
echo ""

# Variables obligatoires
REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_APP_URL"
)

# Variables optionnelles
OPTIONAL_VARS=(
    "STRIPE_SECRET_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "EMAIL_API_KEY"
)

echo "📋 Variables obligatoires:"
echo ""

MISSING_VARS=0

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ $var - MANQUANTE"
        MISSING_VARS=$((MISSING_VARS + 1))
    else
        # Masquer les valeurs sensibles
        if [[ "$var" == *"KEY"* ]] || [[ "$var" == *"SECRET"* ]]; then
            VALUE_PREVIEW="${!var:0:20}..."
            echo "✅ $var - $VALUE_PREVIEW"
        else
            echo "✅ $var - ${!var}"
        fi
    fi
done

echo ""
echo "📋 Variables optionnelles:"
echo ""

for var in "${OPTIONAL_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "⚪ $var - Non configurée (optionnelle)"
    else
        VALUE_PREVIEW="${!var:0:20}..."
        echo "✅ $var - $VALUE_PREVIEW"
    fi
done

echo ""

if [ $MISSING_VARS -gt 0 ]; then
    echo "❌ $MISSING_VARS variable(s) obligatoire(s) manquante(s)"
    echo ""
    echo "⚠️  Configurez les variables manquantes dans Vercel:"
    echo "   Settings → Environment Variables"
    echo ""
    exit 1
else
    echo "✅ Toutes les variables obligatoires sont configurées!"
    echo ""
    echo "🚀 Prêt pour le déploiement!"
fi

