#!/bin/bash

echo "🚀 Widget Control System - Push to GitHub"
echo "=========================================="
echo ""

# Verificar se já tem remote configurado
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' já configurado:"
    git remote -v
    echo ""
    read -p "Deseja fazer push? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main
    fi
else
    echo "📝 Configure o repositório remoto:"
    echo ""
    read -p "Digite a URL do repositório GitHub: " REPO_URL

    if [ -z "$REPO_URL" ]; then
        echo "❌ URL não pode estar vazia"
        exit 1
    fi

    git remote add origin "$REPO_URL"
    echo ""
    echo "✅ Remote adicionado:"
    git remote -v
    echo ""
    echo "📤 Fazendo push..."
    git push -u origin main
fi

echo ""
echo "✅ Pronto! Seu código está no GitHub!"
