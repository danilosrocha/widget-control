# 🚀 Como Publicar no GitHub

## ✅ O que já foi feito:
- ✅ Git inicializado
- ✅ Todos os arquivos commitados
- ✅ Branch principal renomeada para `main`
- ✅ .gitignore configurado (node_modules, .env, etc.)

## 📦 Próximos Passos:

### Opção 1: Criar Repositório no GitHub (Recomendado)

**Passo 1: Criar repositório no GitHub**
1. Acesse https://github.com/new
2. Nome do repositório: `widget-control-system` (ou qualquer nome)
3. **NÃO marque** "Initialize with README" (já temos arquivos)
4. Clique em "Create repository"

**Passo 2: Conectar e fazer push**
No terminal/console, execute estes comandos:

```bash
# Adicionar o repositório remoto (substitua SEU-USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/widget-control-system.git

# Fazer push do código
git push -u origin main
```

**Se pedir autenticação:**
- Username: seu usuário do GitHub
- Password: use um **Personal Access Token** (não a senha)
  - Crie em: https://github.com/settings/tokens
  - Permissões: marque "repo"

---

### Opção 2: Clonar este Repositório Localmente

Se você tem acesso à linha de comando onde este código está:

```bash
# Clonar para sua máquina local
cd /seu/diretorio/desejado
git clone /workspaces/default/code widget-control-system
cd widget-control-system

# Instalar dependências
pnpm install

# Rodar o projeto
pnpm dev
```

---

### Opção 3: Baixar como ZIP (Sem Git)

Se preferir não usar Git agora:

```bash
# Criar um arquivo ZIP
tar -czf widget-control-system.tar.gz --exclude='node_modules' --exclude='.git' .

# O arquivo estará em: /workspaces/default/code/widget-control-system.tar.gz
```

---

## 🔧 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Criar um novo branch
git checkout -b nome-do-branch

# Fazer commit de novas alterações
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

---

## 📋 Estrutura do Repositório

```
widget-control-system/
├── src/
│   └── app/
│       ├── components/          # Componentes React
│       ├── hooks/              # Hooks do Supabase
│       ├── lib/                # Cliente Supabase
│       ├── types/              # TypeScript types
│       └── data/               # Dados iniciais
├── supabase-schema.sql         # SQL para criar tabelas
├── .env                        # Credenciais (NÃO commitado)
├── .env.example               # Template das credenciais
├── package.json
├── README.md
├── SUPABASE_SETUP.md
└── COMO_USAR.md
```

---

## ⚠️ IMPORTANTE - Segurança

O arquivo `.env` **NÃO está no Git** (protegido pelo .gitignore).

**Nunca commite:**
- Senhas
- API Keys
- Tokens
- Credenciais do Supabase

Use sempre `.env.example` como template e cada pessoa cria seu próprio `.env`.

---

## 🆘 Problemas Comuns

### "Permission denied (publickey)"
- Configure SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- Ou use HTTPS com Personal Access Token

### "Repository not found"
- Verifique se o repositório existe no GitHub
- Confirme se a URL está correta
- Verifique suas permissões

### "Failed to push"
- Certifique-se de ter permissão de escrita
- Tente fazer pull primeiro: `git pull origin main`
- Resolva conflitos se houver

---

## 📞 Precisa de Ajuda?

Qualquer dúvida, me chame! Posso ajudar com:
- Criar o repositório no GitHub
- Configurar autenticação
- Resolver problemas com Git
- Fazer o primeiro push
