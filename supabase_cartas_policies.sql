-- CORREÇÃO DO CRUD DA TABELA public.cartas
-- O painel usa a chave publishable/anon diretamente no navegador.
-- Por isso a tabela precisa permitir SELECT/INSERT/UPDATE/DELETE para o papel anon.
-- Execute este arquivo no Supabase > SQL Editor.

ALTER TABLE public.cartas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cartas_select_public" ON public.cartas;
DROP POLICY IF EXISTS "cartas_insert_public" ON public.cartas;
DROP POLICY IF EXISTS "cartas_update_public" ON public.cartas;
DROP POLICY IF EXISTS "cartas_delete_public" ON public.cartas;

CREATE POLICY "cartas_select_public"
ON public.cartas
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "cartas_insert_public"
ON public.cartas
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "cartas_update_public"
ON public.cartas
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "cartas_delete_public"
ON public.cartas
FOR DELETE
TO anon, authenticated
USING (true);

-- IMPORTANTE:
-- Este painel atualmente não possui autenticação de usuário.
-- Portanto, estas políticas deixam o CRUD público para qualquer pessoa
-- que consiga acessar o painel. Quando houver login, substitua estas
-- políticas por regras baseadas em auth.uid().
