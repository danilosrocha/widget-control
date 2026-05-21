User: Me ajude a montar uma planilha para colocar os IDs de cada widget pra gente conferir a navagecao se está correta e colocar o status deles
loadWidgets(opts: HCWidgetLoaderOptions): HCWidgetEntry[] {
    return [
      {
        identifier: 'CENTRAIS',
        required: true,
        order: 1,
        name: '',
      },
      { identifier: 'ATIVIDADES_RECENTES', required: false, name: 'Atividades Recentes', order: 2 },

      // { identifier: 'CARD_INFO', required: false, name: 'Card Info', order: 10 },
      { identifier: 'CARTOES', required: false, name: 'Cartões', order: 20 },
      // { identifier: 'CARTOES_BBCASH', required: false, name: 'Cartões BB Cash', order: 30 },
      { identifier: 'SEGUROS', required: false, name: 'Seguros', order: 40 },
      { identifier: 'MINHAS_FINANCAS', required: false, name: 'Minhas Finanças', order: 50 },
      // { identifier: 'MINHAS_FINANCAS_DINAMICO', required: false, name: 'Minhas Finanças Dinâmico', order: 60 },
      // { identifier: 'EMPRESTIMOS', required: false, name: 'Empréstimos', order: 70 },
      { identifier: 'SHOPPING_BB', required: false, name: 'Shopping BB', order: 80 },
      // { identifier: 'BANNERS', required: false, name: 'Banners', order: 90 },
      // Exclusivos PJ
      // { identifier: 'QUARENTENA', required: false, name: 'Quarentena', order: 110 },
      // { identifier: 'PENDENCIAS', required: false, name: 'Pendências', order: 120 },
      // { identifier: 'FALECOM_BB_PJ', required: false, name: 'Fale Com BB PJ', order: 140 },
      // { identifier: 'CREDITOPJ', required: false, name: 'Crédito PJ', order: 150 },
      { identifier: 'AGENDA_BOLETOS', required: false, name: 'Agenda de Boletos', order: 160 },
      { identifier: 'SOLUCOES_PARA_EMPRESAS', required: false, name: 'Soluções para Empresas', order: 170 },
      { identifier: 'CARTOES_PJ', required: false, name: 'Cartões PJ', order: 180 },
      // Compartilhados
      { identifier: 'MINHAS_FINANCAS_JOVEM', required: false, name: 'Minhas Finanças Jovem', order: 280 },
      { identifier: 'FALECOM_BB', required: false, name: 'Fale Com BB', order: 190 },
      { identifier: 'MEUS_BENEFICIOS', required: false, name: 'Meus Benefícios', order: 200 },
      // Exclusivos NC
      // { identifier: 'CARTOES_NC', required: false, name: 'Cartões NC', order: 210 },
      // Exclusivos Home Acessibilidade
      { identifier: 'SEGURANCA', required: false, name: 'Segurança', order: 220 },
      // { identifier: 'SEGURANCA_1', required: false, name: 'Segurança V2', order: 230 },
      // Exclusivos BBCash
      { identifier: 'FACILIDADES', required: false, name: 'Facilidades', order: 240 },
      // Exclusivos Agro
      // { identifier: 'CARROSSEL_BROTO', required: false, name: 'Agro Broto', order: 250 },
      { identifier: 'AGRO_BB', required: false, name: 'Agro BB', order: 260 },
      { identifier: 'PREVISAO_TEMPO', required: false, name: 'Clima Hoje', order: 270 },
      { identifier: 'COTACOES', required: false, name: 'Cotações', order: 280 },
      // { identifier: 'VENCIMENTOS_FUTUROS', required: false, name: 'Vencimentos Futuros', order: 290 },

      { identifier: 'GERENTES', required: false, name: 'Gerentes', order: 280 },
      { identifier: 'EMPRESTIMOS', required: false, name: 'Empréstimos', order: 280 },
      { identifier: 'PAINEL_PJ', required: false, name: 'Painel PJ', order: 280 },
      { identifier: 'INVESTIMENTOS', required: false, name: 'Investimentos', order: 280 },
      { identifier: 'PIX', required: false, name: 'Pix', order: 280 },

      {
        identifier: 'PERSONALIZAR',
        required: false,
        order: 400,
        name: '',
      },
    ];
  }

GitHub Copilot: # Planilha de Widgets — `loadWidgets`

Aqui está a planilha em formato Markdown para conferência. Você pode copiar para o Excel/Google Sheets substituindo `|` por tabulação.

---

## Widgets Ativos

| # | Identifier | Nome | Order | Required | Segmento | Navegação | Status |
|---|-----------|------|-------|----------|----------|-----------|--------|
| 1 | `CENTRAIS` | — | 1 | ✅ Sim | Todos | — | 🟡 A verificar |
| 2 | `ATIVIDADES_RECENTES` | Atividades Recentes | 2 | ❌ Não | Todos | — | 🟡 A verificar |
| 3 | `CARTOES` | Cartões | 20 | ❌ Não | PF | — | 🟡 A verificar |
| 4 | `SEGUROS` | Seguros | 40 | ❌ Não | PF | — | 🟡 A verificar |
| 5 | `MINHAS_FINANCAS` | Minhas Finanças | 50 | ❌ Não | PF | — | 🟡 A verificar |
| 6 | `SHOPPING_BB` | Shopping BB | 80 | ❌ Não | PF | — | 🟡 A verificar |
| 7 | `AGENDA_BOLETOS` | Agenda de Boletos | 160 | ❌ Não | PJ | — | 🟡 A verificar |
| 8 | `SOLUCOES_PARA_EMPRESAS` | Soluções para Empresas | 170 | ❌ Não | PJ | — | 🟡 A verificar |
| 9 | `CARTOES_PJ` | Cartões PJ | 180 | ❌ Não | PJ | — | 🟡 A verificar |
| 10 | `FALECOM_BB` | Fale Com BB | 190 | ❌ Não | Compartilhado | — | 🟡 A verificar |
| 11 | `MEUS_BENEFICIOS` | Meus Benefícios | 200 | ❌ Não | Compartilhado | — | 🟡 A verificar |
| 12 | `SEGURANCA` | Segurança | 220 | ❌ Não | Home Acessibilidade | — | 🟡 A verificar |
| 13 | `FACILIDADES` | Facilidades | 240 | ❌ Não | BBCash | — | 🟡 A verificar |
| 14 | `AGRO_BB` | Agro BB | 260 | ❌ Não | Agro | — | 🟡 A verificar |
| 15 | `PREVISAO_TEMPO` | Clima Hoje | 270 | ❌ Não | Agro | — | 🟡 A verificar |
| 16 | `MINHAS_FINANCAS_JOVEM` | Minhas Finanças Jovem | 280 | ❌ Não | Compartilhado | — | 🟡 A verificar |
| 17 | `COTACOES` | Cotações | 280 | ❌ Não | Agro | — | 🟡 A verificar |
| 18 | `GERENTES` | Gerentes | 280 | ❌ Não | — | — | 🟡 A verificar |
| 19 | `EMPRESTIMOS` | Empréstimos | 280 | ❌ Não | — | — | 🟡 A verificar |
| 20 | `PAINEL_PJ` | Painel PJ | 280 | ❌ Não | PJ | — | 🟡 A verificar |
| 21 | `INVESTIMENTOS` | Investimentos | 280 | ❌ Não | — | — | 🟡 A verificar |
| 22 | `PIX` | Pix | 280 | ❌ Não | — | — | 🟡 A verificar |
| 23 | `PERSONALIZAR` | — | 400 | ❌ Não | Todos | — | 🟡 A verificar |

---

## Widgets Comentados (Desativados)

| Identifier | Nome | Order | Segmento | Motivo Desativado |
|-----------|------|-------|----------|-------------------|
| `CARD_INFO` | Card Info | 10 | — | — |
| `CARTOES_BBCASH` | Cartões BB Cash | 30 | BBCash | — |
| `MINHAS_FINANCAS_DINAMICO` | Minhas Finanças Dinâmico | 60 | — | — |
| `EMPRESTIMOS` (v1) | Empréstimos | 70 | — | Substituído? Order 280 ativo |
| `BANNERS` | Banners | 90 | — | — |
| `QUARENTENA` | Quarentena | 110 | PJ | — |
| `PENDENCIAS` | Pendências | 120 | PJ | — |
| `FALECOM_BB_PJ` | Fale Com BB PJ | 140 | PJ | — |
| `CREDITOPJ` | Crédito PJ | 150 | PJ | — |
| `CARTOES_NC` | Cartões NC | 210 | NC | — |
| `SEGURANCA_1` | Segurança V2 | 230 | — | — |
| `CARROSSEL_BROTO` | Agro Broto | 250 | Agro | — |
| `VENCIMENTOS_FUTUROS` | Vencimentos Futuros | 290 | — | — |

---

## ⚠️ Problema Identificado

Vários widgets possuem `order: 280` duplicado:

> `MINHAS_FINANCAS_JOVEM`, `COTACOES`, `GERENTES`, `EMPRESTIMOS`, `PAINEL_PJ`, `INVESTIMENTOS`, `PIX`

Isso pode causar **ordenação inconsistente** dependendo do algoritmo de sort usado. Recomendo revisar e atribuir `order` únicos.

---

## Legenda de Status Sugerida

| Ícone | Significado |
|-------|-------------|
| ✅ | Navegação verificada e OK |
| ❌ | Navegação com problema |
| 🟡 | A verificar |
| 🚫 | Desativado intencionalmente |
| ❓ | Motivo desconhecido |