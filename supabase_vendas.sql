-- O DIÁRIO TCG — Módulo de Vendas
-- Execute no Supabase > SQL Editor.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.vendas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carta_id bigint,
  carta_nome text NOT NULL,
  carta_set text,
  quantidade integer NOT NULL CHECK (quantidade > 0),
  valor_unitario numeric(12,2) NOT NULL DEFAULT 0,
  valor_total numeric(12,2) NOT NULL DEFAULT 0,
  custo_unitario numeric(12,2) NOT NULL DEFAULT 0,
  custo_total numeric(12,2) NOT NULL DEFAULT 0,
  cliente text,
  pagamento text,
  data_venda date NOT NULL DEFAULT CURRENT_DATE,
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vendas_select_public" ON public.vendas;
DROP POLICY IF EXISTS "vendas_insert_public" ON public.vendas;
DROP POLICY IF EXISTS "vendas_update_public" ON public.vendas;
DROP POLICY IF EXISTS "vendas_delete_public" ON public.vendas;

CREATE POLICY "vendas_select_public" ON public.vendas
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "vendas_insert_public" ON public.vendas
FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "vendas_update_public" ON public.vendas
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "vendas_delete_public" ON public.vendas
FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS vendas_data_venda_idx ON public.vendas (data_venda DESC);
CREATE INDEX IF NOT EXISTS vendas_carta_id_idx ON public.vendas (carta_id);

-- O painel não possui autenticação atualmente, portanto as políticas são públicas,
-- seguindo o mesmo padrão usado pela tabela public.cartas.
