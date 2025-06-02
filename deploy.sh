#!/bin/bash

# 🚀 Script de déploiement Edgemy sur Vercel
echo "🚀 Déploiement Edgemy vers Vercel..."

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier si vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "Installer avec: npm install -g vercel"
    exit 1
fi

# Vérifier si pnpm est installé
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm n'est pas installé"
    exit 1
fi

echo "✅ Prérequis OK"

# Build local pour vérifier
echo "🔨 Build local..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build local"
    exit 1
fi

echo "✅ Build local réussi"

# Git commit et push
echo "📤 Git commit et push..."
git add .
git status

read -p "Voulez-vous commiter et pusher les changements? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Message de commit: " commit_message
    git commit -m "$commit_message"
    git push origin main
    echo "✅ Code pushé sur Git"
else
    echo "ℹ️ Pas de commit Git"
fi

# Déploiement Vercel
echo "🚀 Déploiement sur Vercel..."

read -p "Déploiement en production? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo "🎉 Déploiement en production terminé!"
    echo "🌐 Votre site est disponible sur: https://edgemy.fr"
    echo "📊 Early Access: https://edgemy.fr/early-access"
    echo "🔐 Admin: https://edgemy.fr/admin/login"
else
    vercel
    echo "🎉 Déploiement preview terminé!"
fi

echo "✅ Déploiement terminé avec succès!" 