export interface NavigationItem {
  text: string;
  completed: boolean;
}

export interface Widget {
  id: string;
  identifier: string;
  name: string;
  order: number;
  required: boolean;
  segment: string;
  navigation: NavigationItem[];
  status: 'ok' | 'problem' | 'verify' | 'disabled' | 'unknown';
  missing: string;
  bugs: string;
}

export const STATUS_OPTIONS = [
  { value: 'ok', label: '✅ OK', color: '#4caf50' },
  { value: 'problem', label: '❌ Problema', color: '#f44336' },
  { value: 'verify', label: '🟡 A verificar', color: '#ff9800' },
  { value: 'disabled', label: '🚫 Desativado', color: '#9e9e9e' },
  { value: 'unknown', label: '❓ Desconhecido', color: '#607d8b' },
];

export const SEGMENT_OPTIONS = [
  'Todos',
  'PF',
  'PJ',
  'Agro',
  'BBCash',
  'NC',
  'Compartilhado',
  'Home Acessibilidade',
];

export enum HomeCustomWidgetsIds {
  // todos os públicos
  /** novo acesso rápido unificado (todos os clientes) */
  AcessosRapidos = 'CENTRAIS',
  CardInfo = 'CARD_INFO',
  Cartoes = 'CARTOES',
  CartoesBBCash = 'CARTOES_BBCASH',
  Seguros = 'SEGUROS',
  MinhasFinancas = 'MINHAS_FINANCAS',
  MinhasFinancasDinamico = 'MINHAS_FINANCAS_DINAMICO',
  MinhasFinancasJovem = 'MINHAS_FINANCAS_JOVEM',
  Emprestimos = 'EMPRESTIMOS',
  /** Shopping BB para PF */
  ShoppingBB = 'SHOPPING_BB',
  Banners = 'BANNERS',
  Personalize = 'PERSONALIZAR',
  Investimentos = 'INVESTIMENTOS',
  Pix = 'PIX',

  // exclusivos de PF
  DDAPF = 'DDA_PF',

  // exclusivos de PJ
  /** saldo PJ */
  Quarentena = 'QUARENTENA',
  Pendencias = 'PENDENCIAS',
  PagarCobrar = 'PAGAR_COBRAR',
  /** @deprecated fazer utilizar o FaleCom unificado */
  FaleComBBPJ = 'FALECOM_BB_PJ',
  CreditoPJ = 'CREDITOPJ',
  AgendaBoletos = 'AGENDA_BOLETOS',
  SolucoesParaEmpresas = 'SOLUCOES_PARA_EMPRESAS',
  CartoesPJ = 'CARTOES_PJ',
  DDAPJ = 'DDA_PJ',
  PainelPJ = 'PAINEL_PJ',
  PixPJ = 'PIX_PJ',

  FaleComBB = 'FALECOM_BB',
  MeusBeneficios = 'MEUS_BENEFICIOS',

  // exclusivos não correntista
  /** @deprecated widget antigo de cartões só em caso de dar problema o novo widget na home NC */
  CartoesNC = 'CARTOES_NC',

  // exclusivos Home Acessibilidade
  Seguranca = 'SEGURANCA',
  /** novo widget de segurança */
  SegurancaV2 = 'SEGURANCA_1',

  // exclusivos BBCash
  Facilidades = 'FACILIDADES',

  // exclusivos Agro
  /** carrousel Home Agro */
  AgroBroto = 'CARROSSEL_BROTO',
  /** novo carrousel Home Agro */
  AgroBrotoV2 = 'AGRO_BB',
  /** widget clima */
  Clima = 'PREVISAO_TEMPO',
  /** widget cotações */
  Cotacoes = 'COTACOES',
  /** widget vencimentos futuros do agro */
  VencimentosFuturos = 'VENCIMENTOS_FUTUROS',
  RecentActivities = 'ATIVIDADES_RECENTES',

  // exclusivos para uso interno
  Retry = '_retry',
}
