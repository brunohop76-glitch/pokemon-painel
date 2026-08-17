# O DIÁRIO TCG

Painel retrô para gerenciamento, consulta e organização de uma coleção de Pokémon TCG.

## Estrutura atual

- `index.html` — ponto de entrada do GitHub Pages; encaminha para o sistema principal.
- `app.html` — sistema principal e gerenciamento da coleção.
- `pokedex.html` — Pokédex completa, com gerações, tipos, favoritos, vistos, paginação e ficha detalhada.
- `pokemon.html` — página individual de Pokémon, com dados da PokéAPI, evolução e cartas TCG relacionadas.
- `precos.html` — consulta de preços de cartas.
- `logo.svg` — identidade visual do projeto.
- `supabase_cartas_policies.sql` — políticas do Supabase para as cartas.
- `.github/` — automações do repositório.
- `.nojekyll` — configuração do GitHub Pages.

## Pokédex

A Pokédex é centralizada em uma única página. Não existem mais páginas separadas de Kanto ou Johto.

Recursos atuais:

- 1025 Pokémon
- busca por nome ou número
- filtro por geração
- filtro por tipo
- favoritos
- Pokémon já vistos
- Pokémon não vistos
- paginação
- ficha individual
- linha evolutiva
- atributos e habilidades
- cartas TCG relacionadas

## Fontes de dados

- PokéAPI para dados dos Pokémon.
- Pokémon TCG data para catálogo de sets e cartas.
- Supabase para os dados da coleção cadastrada.
- PokeTrace para consulta de preços, quando configurado pelo usuário.

## Objetivo

Manter o sistema leve, organizado e modular, evitando páginas duplicadas e carregamentos desnecessários.
