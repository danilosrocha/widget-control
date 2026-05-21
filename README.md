# Sistema de Controle de Widgets - Banco do Brasil

Sistema completo de CRUD para gerenciamento de widgets com backend Supabase.

## 🚀 Características

✅ **CRUD Completo de Widgets**
- Gerenciamento de status (OK, A Verificar, Problema)
- Checklist de navegações com acompanhamento visual
- Filtros por status, segmento e busca
- Visualização detalhada de cada widget

✅ **Kanban de Melhorias**
- Backlog → Em Andamento → Concluído
- Cards com título e descrição
- Drag-free (mudança de status por edição)

✅ **Backend Supabase**
- Persistência automática no cloud
- Sincronização em tempo real
- Backup automático dos dados
- Fallback para dados locais em caso de erro

✅ **Design System**
- Cores oficiais do Banco do Brasil
- Interface responsiva
- Material-UI components

## 📦 Tecnologias

- React + TypeScript
- Material-UI
- Supabase (PostgreSQL)
- Vite
- Lucide Icons

## 🔧 Configuração

### 1. Conectar ao Supabase

Você já deve ter recebido o card de conexão do Supabase no chat. Siga os passos:

1. Clique em "Connect to Supabase"
2. Faça login na sua conta Supabase
3. Selecione ou crie um projeto
4. As credenciais serão configuradas automaticamente

### 2. Criar as Tabelas no Banco

Após conectar, execute o SQL no Supabase Dashboard:

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Copie **TODO** o conteúdo do arquivo `supabase-schema.sql`
5. Cole no editor e clique em **Run**

Isso criará:
- Tabela `widgets` (dados dos widgets)
- Tabela `improvements` (Kanban de melhorias)
- Índices para performance
- Triggers automáticos
- Políticas de segurança (RLS)

### 3. Verificar Funcionamento

1. Recarregue a aplicação
2. Os dados iniciais serão carregados automaticamente
3. Teste criar, editar e deletar widgets
4. Verifique no Supabase Dashboard → Table Editor se os dados estão sendo salvos

## 📖 Como Usar

### Widgets

1. **Visualizar**: Clique em qualquer linha da tabela para ver detalhes
2. **Criar**: Botão "Novo Widget" no canto superior direito
3. **Editar**: Clique no ícone de lápis ou edite nos detalhes
4. **Deletar**: Clique no ícone de lixeira
5. **Filtrar**: Use os filtros de status, segmento e busca

### Navegações (Checklist)

Ao editar um widget:
1. Clique em "Adicionar" na seção Navegações
2. Digite a navegação (ex: "1. Widget")
3. Marque o checkbox se estiver completa
4. Repita para adicionar mais navegações

Na tabela, verá um badge colorido:
- 🟢 Verde: todas completas
- 🟠 Laranja: algumas completas
- 🔴 Vermelho: nenhuma completa

### Melhorias (Kanban)

1. Clique na aba "Melhorias"
2. Use o botão "Adicionar" em cada coluna
3. Clique em um card para editar
4. Mude o status para mover entre colunas

## 🔒 Segurança

As tabelas estão configuradas com Row Level Security (RLS) permitindo todas as operações por padrão. Para produção, considere:

1. Criar políticas específicas por usuário
2. Adicionar autenticação
3. Restringir operações por role

Veja documentação: https://supabase.com/docs/guides/auth

## 📊 Estrutura do Banco

### Tabela: widgets
```sql
- id (TEXT, PK)
- identifier (TEXT) - Ex: CARTOES, MEUS_BENEFICIOS
- name (TEXT)
- order (INTEGER)
- required (BOOLEAN)
- segment (TEXT) - PF, PJ, Agro, etc
- navigation (JSONB) - Array de {text, completed}
- status (TEXT) - ok, problem, verify, disabled, unknown
- missing (TEXT)
- bugs (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: improvements
```sql
- id (TEXT, PK)
- title (TEXT)
- description (TEXT)
- status (TEXT) - backlog, in-progress, completed
- created_at (TIMESTAMP)
```

## 🐛 Troubleshooting

### Erro ao conectar ao Supabase
- Verifique se executou o `supabase-schema.sql`
- Confirme que as credenciais estão corretas
- A aplicação usa dados locais como fallback

### Dados não aparecem
- Verifique se as tabelas foram criadas corretamente
- Olhe o console do navegador (F12) para erros
- Verifique as políticas RLS no Supabase Dashboard

### Performance lenta
- Os índices foram criados automaticamente
- Considere adicionar mais índices se necessário
- Verifique a região do Supabase (idealmente mesma região dos usuários)

## 📝 Próximos Passos

- [ ] Adicionar autenticação de usuários
- [ ] Implementar permissões granulares
- [ ] Adicionar sincronização em tempo real (realtime subscriptions)
- [ ] Exportar/importar dados em CSV
- [ ] Histórico de mudanças
- [ ] Notificações push

## 📞 Suporte

Documentação Supabase: https://supabase.com/docs
