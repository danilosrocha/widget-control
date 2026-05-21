#!/bin/bash

echo "🚀 Widget Control System - Quick Push Script"
echo "============================================="
echo ""
echo "Este script vai fazer push para:"
echo "https://github.com/danilosrocha/widget-control"
echo ""

# Verificar se está em um repositório Git
if [ ! -d .git ]; then
    echo "❌ Erro: Não é um repositório Git"
    echo "Execute 'git init' primeiro"
    exit 1
fi

# Verificar se tem remote origin
if ! git remote | grep -q origin; then
    echo "📝 Adicionando remote origin..."
    git remote add origin https://github.com/danilosrocha/widget-control.git
else
    echo "✅ Remote origin já configurado"
fi

echo ""
echo "📊 Status atual:"
git log --oneline -1
echo ""

echo "📤 Fazendo push para o GitHub..."
echo ""
echo "⚠️  Você precisará fornecer suas credenciais:"
echo "   Username: danilosrocha"
echo "   Password: [Use um Personal Access Token, não a senha]"
echo ""
echo "   🔑 Crie um token em: https://github.com/settings/tokens"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push realizado com sucesso!"
    echo "🌐 Veja em: https://github.com/danilosrocha/widget-control"
else
    echo ""
    echo "❌ Erro no push. Verifique:"
    echo "   1. Se você tem permissão no repositório"
    echo "   2. Se usou Personal Access Token (não senha)"
    echo "   3. Se o token tem permissão 'repo'"
    echo ""
    echo "📖 Veja PUSH_INSTRUCTIONS.md para mais detalhes"
fi
