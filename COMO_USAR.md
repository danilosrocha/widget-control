# 🚀 Como Usar Este Projeto

## Você JÁ ESTÁ no projeto!

Este código está rodando no Figma Make. Para usar fora do Figma Make:

### 1️⃣ Baixar o Projeto

**Via Figma Make:**
- Procure o botão "Download" ou "Export" no Figma Make
- Ou use o menu para baixar o código fonte

**Via Git (se tiver Git configurado):**
```bash
# Inicializar repositório
git init
git add .
git commit -m "Initial commit - Widget Control System"

# Fazer push para GitHub
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

### 2️⃣ Instalar Dependências

```bash
pnpm install
# ou
npm install
```

### 3️⃣ Configurar Supabase

1. Crie conta em https://supabase.com
2. Crie novo projeto
3. Copie URL e API Key de Settings > API
4. Cole no arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

5. Execute o SQL do arquivo `supabase-schema.sql` no SQL Editor

### 4️⃣ Rodar o Projeto

```bash
pnpm dev
# ou
npm run dev
```

Acesse: http://localhost:5173

## 📁 Estrutura do Projeto

```
/code
├── src/
│   └── app/
│       ├── components/     # Componentes React
│       ├── hooks/          # Hooks customizados (Supabase)
│       ├── lib/            # Cliente Supabase
│       ├── types/          # TypeScript types
│       └── data/           # Dados iniciais
├── supabase-schema.sql     # SQL para criar tabelas
├── package.json
└── README.md               # Documentação completa
```

## ✅ O Projeto Inclui

- ✅ CRUD completo de Widgets
- ✅ Kanban de Melhorias
- ✅ Checklist de navegações
- ✅ Integração Supabase
- ✅ Fallback para dados locais
- ✅ Design System Banco do Brasil
- ✅ Material-UI
- ✅ TypeScript

