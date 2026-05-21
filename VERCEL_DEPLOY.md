# 🚀 Deploy na Vercel - Guia Completo

## ✅ Arquivos Criados para Deploy

Os seguintes arquivos foram adicionados para permitir o deploy na Vercel:

- ✅ `index.html` - Página HTML principal
- ✅ `src/main.tsx` - Entry point do React
- ✅ `vite.config.ts` - Configuração de build atualizada
- ✅ `.gitignore` - Ignorar arquivos de build

## 📋 Passo a Passo do Deploy

### 1. Obter Credenciais do Supabase

As credenciais que você forneceu estão **incorretas**. Para obter as credenciais corretas:

1. Acesse seu projeto no Supabase: https://supabase.com/dashboard
2. Vá em **Project Settings** (ícone de engrenagem)
3. Clique em **API** no menu lateral
4. Copie as seguintes informações:

**Project URL:**
```
https://hmfjxkarrgiikljmiajo.supabase.co
```

**anon/public key:** (deve ser algo assim)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZmp4a2FycmdpaWtsam1pYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NjcyMDAsImV4cCI6MTk5OTQ0MzIwMH0.EXEMPLO_TOKEN_MUITO_LONGO
```

⚠️ **IMPORTANTE**: A chave `anon` é um JWT token **muito longo** (200+ caracteres) que começa com `eyJ`. Se sua chave for curta ou começar com `sb_publishable_`, ela está incorreta.

### 2. Executar o SQL no Supabase

Antes de configurar as variáveis de ambiente:

1. Vá em **SQL Editor** no Supabase
2. Abra o arquivo `supabase-schema.sql` deste projeto
3. Copie **TODO** o conteúdo
4. Cole no SQL Editor e clique em **Run**

Isso irá:
- Criar as tabelas `widgets` e `improvements`
- Inserir todos os 28 widgets com seus dados
- Configurar índices e triggers

### 3. Configurar Variáveis de Ambiente na Vercel

1. Vá no seu projeto na Vercel: https://vercel.com/dashboard
2. Clique em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

**Nome:** `VITE_SUPABASE_URL`
**Valor:** `https://hmfjxkarrgiikljmiajo.supabase.co`

**Nome:** `VITE_SUPABASE_ANON_KEY`
**Valor:** `eyJhbGci... (a chave LONGA que você copiou do Supabase)`

4. Clique em **Save**

### 4. Fazer Redeploy

Após configurar as variáveis de ambiente:

1. Vá em **Deployments**
2. Clique nos **três pontos** do último deploy
3. Clique em **Redeploy**

Ou simplesmente faça um novo push:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

## 🔍 Como Verificar se Está Funcionando

Após o deploy:

1. Abra o site da Vercel
2. Abra o **Console do navegador** (F12)
3. Recarregue a página

**Se estiver funcionando:**
- Você verá os widgets carregados do banco de dados
- Nenhum erro no console

**Se ainda houver erro:**
- Verifique o console para ver a mensagem de erro exata
- Confirme que as variáveis de ambiente estão corretas na Vercel
- Verifique se você executou o SQL no Supabase

## 🔧 Troubleshooting

### Erro: "Failed to fetch"
- ✅ Verifique se a `VITE_SUPABASE_ANON_KEY` é um JWT longo começando com `eyJ`
- ✅ Verifique se a URL está correta (sem barra no final)
- ✅ Confirme que executou o SQL para criar as tabelas

### Erro: "relation 'widgets' does not exist"
- ✅ Execute o arquivo `supabase-schema.sql` no SQL Editor do Supabase

### Erro: "Invalid API key"
- ✅ Copie novamente a chave anon do dashboard do Supabase
- ✅ Certifique-se de copiar a chave **anon/public**, não a **service_role**

### Variáveis de ambiente não funcionam
- ✅ Variáveis devem começar com `VITE_` para serem acessíveis no frontend
- ✅ Após adicionar variáveis, você DEVE fazer um redeploy
- ✅ Limpe o cache do navegador (Ctrl+Shift+R)

## 📦 Estrutura do Projeto

```
widget-control/
├── index.html              ← Entry point HTML
├── src/
│   ├── main.tsx           ← Entry point React
│   └── app/
│       ├── App.tsx        ← Componente principal
│       └── ...
├── supabase-schema.sql    ← SQL para criar banco
└── vite.config.ts         ← Configuração de build
```

## 🎯 Próximos Passos

Após o deploy funcionar:

1. ✅ Teste adicionar/editar/excluir widgets
2. ✅ Teste o Kanban de melhorias
3. ✅ Verifique se os dados persistem após recarregar
4. ✅ Configure um domínio customizado (opcional)

## 💡 Dicas

- Use o modo de fallback: se o Supabase não estiver configurado, o app usa dados locais
- As variáveis de ambiente são injetadas em tempo de build
- Para debug, adicione `console.log` em `src/app/lib/supabase.ts`
