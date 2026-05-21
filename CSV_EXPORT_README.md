# 📊 Exportação CSV dos Widgets

Foram criados 2 arquivos CSV para você importar no Excel:

## 📁 Arquivos Disponíveis

### 1. `widgets_export.csv` (Com emojis)
Formato visual com emojis e símbolos:
- ✅ OK
- 🟡 A verificar  
- ❌ Problema
- ✓ Navegação completa
- ✗ Navegação incompleta

**Melhor para:** Visualização rápida no Excel com formatação visual

### 2. `widgets_export_simple.csv` (Sem emojis)
Formato simples apenas com texto:
- Navegações separadas em colunas individuais
- Cada navegação tem sua coluna "OK" (Sim/Não)
- Sem emojis (melhor compatibilidade)

**Melhor para:** Manipulação de dados, filtros, e compatibilidade máxima

## 📥 Como Importar no Excel

### Método 1: Abrir diretamente
1. Clique duas vezes no arquivo `.csv`
2. O Excel abrirá automaticamente

### Método 2: Importar como dados
1. Abra o Excel
2. **Dados** → **De Texto/CSV**
3. Selecione o arquivo `.csv`
4. Escolha a codificação: **UTF-8**
5. Clique em **Carregar**

## 📋 Estrutura dos Dados

### Colunas principais:

| Coluna | Descrição |
|--------|-----------|
| **Order** | Ordem de exibição (1-19 prioritários, 100+ demais) |
| **ID** | ID único do widget |
| **Identifier** | Identificador técnico (ex: CARTOES, PIX) |
| **Nome** | Nome amigável do widget |
| **Segmento** | PF, PJ, Agro, Todos, etc. |
| **Obrigatório** | Sim/Não |
| **Status** | OK, A verificar, Problema |
| **Navegação** | Itens de navegação com status |
| **O que falta** | Pendências do widget |
| **Bugs** | Bugs conhecidos |

## 📊 Resumo dos Dados

- **Total de widgets:** 28
- **Prioritários (1-19):** 19 widgets
- **Demais (100+):** 9 widgets

**Por status:**
- ✅ OK: 14 widgets
- 🟡 A verificar: 5 widgets
- ❌ Problema: 9 widgets

**Por segmento:**
- PF: 9 widgets
- PJ: 8 widgets
- Agro: 3 widgets
- Todos: 5 widgets
- Outros: 3 widgets

## 💡 Dicas de Uso no Excel

### Filtrar por status
1. Selecione a coluna **Status**
2. Clique no ícone de filtro
3. Escolha: OK, A verificar ou Problema

### Criar gráfico de status
1. Selecione coluna **Status**
2. **Inserir** → **Gráfico de Pizza**

### Contar widgets por segmento
```
=CONT.SE(E:E;"PF")
```

### Destacar problemas
1. Selecione a coluna **Status**
2. **Página Inicial** → **Formatação Condicional**
3. Regra: Se contém "Problema" → cor vermelha

## 🔄 Atualização

Para obter uma versão atualizada:
1. Acesse o sistema web
2. Exporte novamente os dados
3. Ou execute o script de exportação no projeto

---

**Última atualização:** 21/05/2026
**Fonte:** Widget Control System - Banco do Brasil
