#!/bin/bash

# Script pour appliquer les migrations Supabase
# Utilisation: ./scripts/apply-migrations.sh

set -e

echo "🚀 Application des migrations Supabase pour ShiftPilot"
echo "=================================================="
echo ""

# Vérifier si Supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI n'est pas installé."
    echo "Installez-le avec: npm install -g supabase"
    echo "Ou via: brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI détecté"
echo ""

# Vérifier si le projet est lié
if [ ! -f ".supabase/config.toml" ]; then
    echo "⚠️  Le projet n'est pas lié à Supabase."
    echo "Liez-le d'abord avec: supabase link --project-ref VOTRE_PROJECT_REF"
    echo ""
    echo "Vous pouvez trouver votre project-ref dans:"
    echo "Supabase Dashboard → Settings → General → Reference ID"
    exit 1
fi

echo "✅ Projet Supabase lié"
echo ""

# Lister les migrations
echo "📋 Migrations disponibles:"
ls -1 supabase/migrations/*.sql | sort
echo ""

# Confirmer
read -p "Voulez-vous appliquer toutes les migrations? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Annulé"
    exit 1
fi

echo ""
echo "🔄 Application des migrations..."
echo ""

# Appliquer les migrations
supabase db push

echo ""
echo "✅ Migrations appliquées avec succès!"
echo ""
echo "📊 Vérification des migrations appliquées:"
supabase migration list

echo ""
echo "🎉 Terminé! Vérifiez maintenant dans Supabase Dashboard que toutes les tables sont créées."

