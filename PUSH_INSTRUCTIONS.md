# 🚀 Como Fazer Push para o GitHub

## 📦 Opção 1: Clonar e Fazer Push (Recomendado)

Como você já está no Figma Make e tem acesso ao código, você pode fazer o push diretamente:

### **No seu computador local:**

```bash
# 1. Clonar este diretório ou copiar os arquivos
# Se você baixou o projeto do Figma Make, vá até a pasta

# 2. Verificar se é um repositório Git
git status

# 3. Configurar o remote (se ainda não tiver)
git remote add origin https://github.com/danilosrocha/widget-control.git

# 4. Fazer o push
git push -u origin main
```

Se pedir autenticação:
- **Username**: danilosrocha
- **Password**: Use um Personal Access Token (não a senha)
  - Crie em: https://github.com/settings/tokens
  - Selecione "Generate new token (classic)"
  - Marque a permissão "repo"
  - Copie o token e use como senha

---

## 📦 Opção 2: Usar o Bundle Git

Se você tem o arquivo `widget-control.bundle`:

```bash
# 1. Ir para onde quer criar o projeto
cd /seu/diretorio

# 2. Clonar do bundle
git clone widget-control.bundle widget-control
cd widget-control

# 3. Adicionar o remote do GitHub
git remote set-url origin https://github.com/danilosrocha/widget-control.git

# 4. Fazer push
git push -u origin main
```

---

## 📦 Opção 3: Criar Repo do Zero

```bash
# 1. Baixar/extrair os arquivos do projeto

# 2. Entrar na pasta
cd widget-control

# 3. Inicializar Git
git init

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer commit inicial
git commit -m "Initial commit: Widget Control System"

# 6. Renomear branch para main
git branch -M main

# 7. Adicionar remote
git remote add origin https://github.com/danilosrocha/widget-control.git

# 8. Fazer push
git push -u origin main
```

---

## 🔑 Configurar Autenticação (Personal Access Token)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Classic"**
3. Nome: `Widget Control System`
4. Expiration: Escolha a duração (90 dias, 1 ano, etc)
5. Marque o escopo: **`repo`** (acesso completo aos repositórios)
6. Clique em **"Generate token"**
7. **COPIE O TOKEN** (só aparece uma vez!)
8. Use como senha quando o Git pedir

---

## ✅ Verificar se Funcionou

Após o push, acesse:
https://github.com/danilosrocha/widget-control

Você deve ver todos os arquivos lá!

---

## 🆘 Problemas?

### "Authentication failed"
- Certifique-se de usar o Personal Access Token, não a senha
- Verifique se o token tem permissão "repo"

### "Repository not found"
- Confirme que o repositório existe em: https://github.com/danilosrocha/widget-control
- Verifique se você tem permissão de escrita

### "Permission denied"
- Use HTTPS, não SSH (a menos que tenha configurado SSH)
- Verifique se está logado com o usuário correto

---

## 🎯 Depois do Push

Depois que o código estiver no GitHub, outros podem clonar:

```bash
git clone https://github.com/danilosrocha/widget-control.git
cd widget-control
pnpm install
pnpm dev
```
