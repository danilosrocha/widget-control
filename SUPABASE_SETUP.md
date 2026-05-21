# Configuração do Supabase

## Passos para configurar o Supabase

### 1. Conectar projeto Supabase
Você já recebeu o card de conexão do Supabase no chat. Siga os passos para conectar seu projeto.

### 2. Criar as tabelas no banco de dados

Após conectar o Supabase, execute o SQL contido no arquivo `supabase-schema.sql` no SQL Editor do Supabase:

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Copie todo o conteúdo de `supabase-schema.sql`
4. Cole no editor e execute

Isso criará:
- Tabela `widgets` com todos os campos necessários
- Tabela `improvements` para o Kanban
- Índices para melhor performance
- Triggers automáticos para updated_at
- Políticas de segurança (RLS)

### 3. Configurar variáveis de ambiente

As credenciais já foram configuradas automaticamente pela conexão do Supabase.

Se precisar configurar manualmente:
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione as variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 4. Verificar funcionamento

Após executar o SQL:
1. Recarregue a aplicação
2. Os dados iniciais serão carregados automaticamente na primeira vez
3. Todas as mudanças serão persistidas no Supabase

## Estrutura das Tabelas

### Tabela: widgets
- `id` (TEXT): ID único do widget
- `identifier` (TEXT): Identificador do widget (ex: CARTOES, MEUS_BENEFICIOS)
- `name` (TEXT): Nome amigável do widget
- `order` (INTEGER): Ordem de exibição
- `required` (BOOLEAN): Se é obrigatório
- `segment` (TEXT): Segmento (PF, PJ, Agro, etc)
- `navigation` (JSONB): Array de navegações com status
- `status` (TEXT): Status (ok, problem, verify, etc)
- `missing` (TEXT): O que falta fazer
- `bugs` (TEXT): Bugs conhecidos
- `created_at` (TIMESTAMP): Data de criação
- `updated_at` (TIMESTAMP): Data de atualização

### Tabela: improvements
- `id` (TEXT): ID único da melhoria
- `title` (TEXT): Título da melhoria
- `description` (TEXT): Descrição detalhada
- `status` (TEXT): Status (backlog, in-progress, completed)
- `created_at` (TIMESTAMP): Data de criação

## Funcionalidades

✅ **Persistência automática**: Todos os dados são salvos automaticamente no Supabase
✅ **Sincronização**: Mudanças são refletidas em tempo real
✅ **Backup automático**: Dados seguros no cloud
✅ **Fallback local**: Se houver erro de conexão, usa dados locais temporariamente
