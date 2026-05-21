-- ============================================
-- WIDGET CONTROL SYSTEM - SCHEMA COMPLETO
-- ============================================

-- Criar tabela de widgets
CREATE TABLE IF NOT EXISTS widgets (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  name TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  required BOOLEAN NOT NULL DEFAULT false,
  segment TEXT NOT NULL,
  navigation JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'verify',
  missing TEXT DEFAULT '',
  bugs TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_widgets_identifier ON widgets(identifier);
CREATE INDEX IF NOT EXISTS idx_widgets_status ON widgets(status);
CREATE INDEX IF NOT EXISTS idx_widgets_segment ON widgets(segment);
CREATE INDEX IF NOT EXISTS idx_widgets_order ON widgets("order");

-- Criar tabela de melhorias
CREATE TABLE IF NOT EXISTS improvements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar índice para melhorar performance
CREATE INDEX IF NOT EXISTS idx_improvements_status ON improvements(status);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at em widgets
DROP TRIGGER IF EXISTS update_widgets_updated_at ON widgets;
CREATE TRIGGER update_widgets_updated_at
  BEFORE UPDATE ON widgets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE improvements ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (permitir tudo por enquanto - você pode ajustar depois)
DROP POLICY IF EXISTS "Permitir todas operações em widgets" ON widgets;
CREATE POLICY "Permitir todas operações em widgets" ON widgets
  FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todas operações em improvements" ON improvements;
CREATE POLICY "Permitir todas operações em improvements" ON improvements
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- POPULAR DADOS INICIAIS
-- ============================================

-- Limpar dados existentes (caso já existam)
TRUNCATE TABLE widgets CASCADE;
TRUNCATE TABLE improvements CASCADE;

-- ============================================
-- WIDGETS PRIORITÁRIOS (ordem 1-19)
-- ============================================

-- 1. Cartão PF - ✅
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('3', 'CARTOES', 'Cartão PF', 1, false, 'PF',
  '[{"text":"1. Widget","completed":true},{"text":"2. Em cada cartão","completed":true},{"text":"3. Solicitar novo cartão","completed":true}]'::jsonb,
  'ok', '', '');

-- 2. Benefícios PF - ✅
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('11', 'MEUS_BENEFICIOS', 'Benefícios PF', 2, false, 'PF',
  '[{"text":"1. Widget","completed":true},{"text":"2. Ver detalhes do benefício","completed":true},{"text":"3. Contratar benefício","completed":false}]'::jsonb,
  'ok', '', '');

-- 3. Minhas Finanças (PF) - ✅
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('5', 'MINHAS_FINANCAS', 'Minhas Finanças (PF)', 3, false, 'PF', '[]'::jsonb, 'ok', '', '');

-- 4. Agro BB - ✅
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('14', 'AGRO_BB', 'Agro BB', 4, false, 'Agro', '[]'::jsonb, 'ok', '', '');

-- 5. Ecossistema PJ - ✅
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('8', 'SOLUCOES_PARA_EMPRESAS', 'Ecossistema PJ', 5, false, 'PJ', '[]'::jsonb, 'ok', '', '');

-- 6. Minhas finanças Jovem - ✅ (Falta direcionar modularizada) ⚠️
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('16', 'MINHAS_FINANCAS_JOVEM', 'Minhas Finanças Jovem', 6, false, 'Compartilhado', '[]'::jsonb,
  'verify', 'Falta direcionar modularizada', '');

-- 7. Seguros PF - Refatorar com protótipo v3 ⚠️
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('4', 'SEGUROS', 'Seguros PF', 7, false, 'PF', '[]'::jsonb,
  'verify', 'Refatorar com protótipo v3', '');

-- 8. Clima - Corrigir navegação e tirar mock do back ⚠️
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('15', 'PREVISAO_TEMPO', 'Clima', 8, false, 'Agro', '[]'::jsonb,
  'verify', 'Tirar mock do back (quando subir correção front)', 'Corrigir navegação');

-- 9. Cotações Agro - Problema navegação ⚠️
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('17', 'COTACOES', 'Cotações Agro', 9, false, 'Agro', '[]'::jsonb,
  'verify', '', 'Problema navegação');

-- 10. DDA PJ - Testar se está ok ⚠️
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('24', 'DDA_PJ', 'DDA PJ', 10, false, 'PJ', '[]'::jsonb,
  'verify', 'Testar se está ok', '');

-- 11. Shopping BB (PF e BB Cash) - (BBCash é a mesma coisa?)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('6', 'SHOPPING_BB', 'Shopping BB (PF e BB Cash)', 11, false, 'Compartilhado', '[]'::jsonb,
  'problem', 'BBCash é a mesma coisa?', '');

-- 12. DDA PF - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('25', 'DDA_PF', 'DDA PF', 12, false, 'PF', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 13. Cartão PJ - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('9', 'CARTOES_PJ', 'Cartão PJ', 13, false, 'PJ', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 14. Crédito empresa - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('26', 'CREDITOPJ', 'Crédito Empresa', 14, false, 'PJ', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 15. Pagar e Cobrar PJ - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('27', 'PAGAR_COBRAR', 'Pagar e Cobrar PJ', 15, false, 'PJ', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 16. Investimentos PF - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('21', 'INVESTIMENTOS', 'Investimentos PF', 16, false, 'PF', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 17. Resumo Financeiro PJ (PAINEL_PJ) - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('20', 'PAINEL_PJ', 'Resumo Financeiro PJ', 17, false, 'PJ', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 18. Pix PF - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('22', 'PIX', 'Pix PF', 18, false, 'PF', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- 19. Pix PJ - (Versão Alfa)
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('28', 'PIX_PJ', 'Pix PJ', 19, false, 'PJ', '[]'::jsonb,
  'problem', 'Versão Alfa', '');

-- ============================================
-- DEMAIS WIDGETS (ordem 100+)
-- ============================================

-- Acessos Rápidos
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('1', 'CENTRAIS', 'Acessos Rápidos', 100, true, 'Todos', '[]'::jsonb, 'ok', '', '');

-- Atividades Recentes
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('2', 'ATIVIDADES_RECENTES', 'Atividades Recentes', 110, false, 'Todos', '[]'::jsonb, 'ok', '', '');

-- Agenda de Boletos
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('7', 'AGENDA_BOLETOS', 'Agenda de Boletos', 160, false, 'PJ', '[]'::jsonb, 'ok', '', '');

-- Fale Com BB
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('10', 'FALECOM_BB', 'Fale Com BB', 190, false, 'Compartilhado', '[]'::jsonb, 'ok', '', '');

-- Segurança
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('12', 'SEGURANCA', 'Segurança', 220, false, 'Home Acessibilidade', '[]'::jsonb, 'ok', '', '');

-- Facilidades
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('13', 'FACILIDADES', 'Facilidades', 240, false, 'BBCash', '[]'::jsonb, 'ok', '', '');

-- Gerentes
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('18', 'GERENTES', 'Gerentes', 280, false, 'Todos', '[]'::jsonb, 'ok', '', '');

-- Empréstimos
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('19', 'EMPRESTIMOS', 'Empréstimos', 290, false, 'Todos', '[]'::jsonb, 'ok', '', '');

-- Personalizar
INSERT INTO widgets (id, identifier, name, "order", required, segment, navigation, status, missing, bugs)
VALUES ('23', 'PERSONALIZAR', 'Personalizar', 400, false, 'Todos', '[]'::jsonb, 'ok', '', '');

-- ============================================
-- FINALIZADO
-- ============================================

-- Verificar dados inseridos
SELECT
  COUNT(*) as total_widgets,
  COUNT(CASE WHEN status = 'ok' THEN 1 END) as ok,
  COUNT(CASE WHEN status = 'verify' THEN 1 END) as verify,
  COUNT(CASE WHEN status = 'problem' THEN 1 END) as problem
FROM widgets;
