from pathlib import Path
import re

p = Path("index.html")
s = p.read_text(encoding="utf-8")

css = """
/* Ajuste visual — Minhas Cartas alinhado e simétrico */
#cartas .titleRow{grid-template-columns:minmax(0,1fr) minmax(500px,650px);gap:28px;align-items:center;margin-bottom:16px}
#cartas .controls{display:grid;grid-template-columns:minmax(0,1fr) 138px;gap:10px;align-items:stretch;min-width:0}
#cartas .search{width:100%;height:48px;padding:12px 14px}
#cartas .controls .btn{height:48px;margin:0;white-space:nowrap}
#cartas .filters{margin:10px 0 20px;min-height:0}
#cartas .content{display:grid;grid-template-columns:250px minmax(0,1fr);gap:24px;align-items:start}
#cartas .filterbox{width:100%;padding:18px;position:sticky;top:88px}
#cartas .filterbox h3{margin-bottom:16px}
#cartas .filterbox label{margin:12px 0 7px}
#cartas .count{margin:0 0 10px;font-size:12px}
#cartas #cardsGrid{grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:16px;min-width:0}
#cartas #cardsGrid>.empty{grid-column:1/-1;width:100%;min-height:176px;display:flex;align-items:center;justify-content:center;padding:32px;margin:0}
@media(max-width:1200px){#cartas .titleRow{grid-template-columns:minmax(0,1fr) minmax(420px,520px)}#cartas .content{grid-template-columns:225px minmax(0,1fr)}}
@media(max-width:1000px){#cartas .titleRow{display:block}#cartas .controls{margin-top:14px}#cartas .content{grid-template-columns:1fr}#cartas .filterbox{position:static}#cartas #cardsGrid>.empty{min-height:150px}}
@media(max-width:650px){#cartas .controls{grid-template-columns:1fr}#cartas .controls .btn{width:100%}}
"""

if "/* Ajuste visual — Minhas Cartas alinhado e simétrico */" not in s:
    s = s.replace("</style>", css + "\n</style>", 1)

nav = '''<aside class="side"><h3>MENU</h3><button class="nav" onclick="page('dashboard',this);renderDash()">🏠 Dashboard</button><button class="nav active" onclick="page('cartas',this);loadCards()">📚 Minhas Cartas</button><button class="nav" onclick="page('kanto',this);renderDex()">🔴 Pokédex Kanto</button><button class="nav" onclick="openForm()">➕ Cadastrar Carta</button><button class="nav" onclick="page('vendas',this)">💰 Vendas</button></aside>'''
s = re.sub(r'<aside class="side">.*?</aside>', nav, s, count=1, flags=re.S)

# ================================================================
# CORREÇÃO DOS SETS / COLEÇÕES
# Não usamos mais api.pokemontcg.io aqui, pois a API pode exigir
# chave e retornar 401. O sistema passa a usar diretamente o
# dataset público e oficial mantido pela PokemonTCG no GitHub.
# ================================================================
if "/* Fix Sets via GitHub dataset */" not in s:
    s = s.replace(
        "const API='https://api.pokemontcg.io/v2'",
        "const API='https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master'"
    )

    load_sets = r'''async function loadSets(force=false){
  if(sets.length&&!force){fillCatalogSets();renderSets();return}
  $('status').textContent='BUSCANDO SETS...';
  $('setsGrid').innerHTML='<div class="empty">🌐 Carregando catálogo oficial...</div>';
  try{
    const r=await fetch(API+'/sets/en.json',{cache:force?'no-store':'force-cache'});
    if(!r.ok)throw Error('HTTP '+r.status);
    const j=await r.json();
    sets=Array.isArray(j)?j:[];
    $('status').textContent=sets.length+' SETS ONLINE';
    const series=[...new Set(sets.map(s=>s.series).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    $('seriesFilter').innerHTML='<option value="">Todas as séries</option>'+series.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
    fillCatalogSets();
    renderSets();
    updateStats();
  }catch(e){
    console.error('Erro ao carregar sets:',e);
    $('status').textContent='ERRO AO CARREGAR';
    $('setsInfo').textContent='';
    $('setsGrid').innerHTML='<div class="empty">❌ Não foi possível carregar os sets agora.<br><br>Clique em ↻ Atualizar para tentar novamente.</div>';
  }
}'''

    render_sets = r'''function normalizeSetSearch(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function setSearchAliases(s){
  const aliases={
    'pitch black':'Escuridão Absoluta Mega Evolution Megaevolução Escuridão Absoluta',
    'escuridao absoluta':'Pitch Black Mega Evolution',
    'megaevolucao escuridao absoluta':'Pitch Black Mega Evolution',
    'ascended heroes':'Heróis Excelsos',
    'herois excelsos':'Ascended Heroes',
    'perfect order':'Equilíbrio Perfeito',
    'equilibrio perfeito':'Perfect Order',
    'chaos rising':'Caos Ascendente',
    'caos ascendente':'Chaos Rising',
    'phantasmal flames':'Fogo Fantasmagórico',
    'fogo fantasmagorico':'Phantasmal Flames',
    'mega evolution':'Megaevolução',
    'megaevolucao':'Mega Evolution'
  };
  const base=normalizeSetSearch(`${s.name||''} ${s.series||''} ${s.id||''} ${s.ptcgoCode||''}`);
  const name=normalizeSetSearch(s.name||'');
  const extra=Object.entries(aliases).filter(([k])=>base.includes(k)||name.includes(k)).map(([,v])=>v).join(' ');
  return `${base} ${normalizeSetSearch(extra)}`;
}
function renderSets(){
  const q=normalizeSetSearch($('setSearch').value||'');
  const sf=$('seriesFilter').value;
  const list=sets.filter(s=>setSearchAliases(s).includes(q)&&(!sf||s.series===sf));
  $('setsInfo').textContent=list.length?`${list.length} sets encontrados`:'Nenhum set encontrado';
  const per=24;
  const pages=Math.max(1,Math.ceil(list.length/per));
  if(setPage>pages)setPage=1;
  const shown=list.slice((setPage-1)*per,setPage*per);
  $('setsGrid').innerHTML=shown.map(s=>`<div class="set">
    <img src="${esc(s.images?.logo||'')}" loading="lazy" decoding="async" onerror="this.style.display='none'">
    <h3>${esc(s.name)}</h3>
    <p class="mini">${esc(s.series||'')} • ${esc(s.ptcgoCode||s.id)}</p>
    <p class="mini">${s.total||s.printedTotal||0} cartas • ${esc(s.releaseDate||'')}</p>
    <button class="btn small" onclick="openSet('${esc(s.id)}')">Ver cartas</button>
  </div>`).join('')||'<div class="empty">Nenhum set encontrado.</div>';
  $('setsPager').innerHTML=pages>1?`<button class="btn small" onclick="setPage=Math.max(1,setPage-1);renderSets()">‹</button><span class="mini">Página ${setPage} / ${pages}</span><button class="btn small" onclick="setPage=Math.min(${pages},setPage+1);renderSets()">›</button>`:'';
}'''

    load_cards = r'''async function loadSetCards(id){
  if(!id)return;
  catalogPage=1;
  $('catalogGrid').innerHTML='<div class="empty">🔄 Carregando cartas deste set...</div>';
  if(setCache.has(id)){catalog=setCache.get(id);prepareCatalog();return}
  try{
    const r=await fetch(`${API}/cards/en/${encodeURIComponent(id)}.json`,{cache:'force-cache'});
    if(!r.ok)throw Error('HTTP '+r.status);
    const j=await r.json();
    catalog=Array.isArray(j)?j:[];
    setCache.set(id,catalog);
    prepareCatalog();
  }catch(e){
    console.error('Erro ao carregar cartas do set:',id,e);
    $('catalogGrid').innerHTML='<div class="empty">❌ Não foi possível carregar as cartas deste set.</div>';
  }
}'''

    s = re.sub(r"async function loadSets\(force=false\)\{.*?\n\}", load_sets, s, count=1, flags=re.S)
    s = re.sub(r"function renderSets\(\)\{.*?\n\}", render_sets, s, count=1, flags=re.S)
    s = re.sub(r"async function loadSetCards\(id\)\{.*?\n\}", load_cards, s, count=1, flags=re.S)

    marker = "/* Fix Sets via GitHub dataset */"
    s = s.replace("<script>\n", "<script>\n" + marker + "\n", 1)

p.write_text(s, encoding="utf-8")
print("Layout e integração dos Sets corrigidos com sucesso.")
