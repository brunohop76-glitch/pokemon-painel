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
# Sets: usa o dataset público mantido pela PokemonTCG no GitHub.
# Mantemos também um override independente para não depender da
# implementação antiga da API Pokémon TCG que pode retornar 401.
# ================================================================
sets_override = r'''<script>
/* SETS ONLINE OVERRIDE V2 */
(function(){
  const DATA='https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master';
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const aliases={
    'pitch black':'escuridao absoluta',
    'escuridao absoluta':'pitch black',
    'mega evolution':'megaevolucao',
    'megaevolucao':'mega evolution',
    'ascended heroes':'herois excelsos',
    'herois excelsos':'ascended heroes',
    'perfect order':'equilibrio perfeito',
    'equilibrio perfeito':'perfect order',
    'chaos rising':'caos ascendente',
    'caos ascendente':'chaos rising',
    'phantasmal flames':'fogo fantasmagorico',
    'fogo fantasmagorico':'phantasmal flames'
  };
  function setText(id,text){const el=document.getElementById(id);if(el)el.textContent=text;}
  function searchText(s){
    const base=norm(`${s.name||''} ${s.series||''} ${s.id||''} ${s.ptcgoCode||''}`);
    const extras=Object.entries(aliases).filter(([a])=>base.includes(a)).map(([,b])=>b).join(' ');
    return base+' '+norm(extras);
  }
  function safeEsc(v){return typeof esc==='function'?esc(v):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

  window.loadSetsGithub=async function(force){
    const grid=document.getElementById('setsGrid');
    if(grid)grid.innerHTML='<div class="empty">🌐 Carregando sets do catálogo oficial...</div>';
    setText('status','BUSCANDO SETS...');
    try{
      const r=await fetch(DATA+'/sets/en.json',{cache:force?'no-store':'force-cache'});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const data=await r.json();
      if(!Array.isArray(data))throw new Error('Formato inválido');
      window.__onlineSets=data;
      try{sets=data;}catch(_){window.sets=data;}
      const sf=document.getElementById('seriesFilter');
      if(sf){
        const series=[...new Set(data.map(s=>s.series).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
        sf.innerHTML='<option value="">Todas as séries</option>'+series.map(x=>`<option value="${safeEsc(x)}">${safeEsc(x)}</option>`).join('');
        sf.onchange=()=>window.renderSetsGithub();
      }
      setText('status',data.length+' SETS ONLINE');
      if(typeof fillCatalogSets==='function')fillCatalogSets();
      window.renderSetsGithub();
      if(typeof updateStats==='function')updateStats();
    }catch(e){
      console.error('Sets online:',e);
      setText('status','ERRO AO CARREGAR SETS');
      if(grid)grid.innerHTML='<div class="empty">❌ Não foi possível conectar ao catálogo online.<br><br>Verifique a conexão e clique em Atualizar.</div>';
    }
  };

  window.renderSetsGithub=function(){
    const data=window.__onlineSets||[];
    const q=norm(document.getElementById('setSearch')?.value||'');
    const sf=document.getElementById('seriesFilter')?.value||'';
    const filtered=data.filter(s=>(!q||searchText(s).includes(q))&&(!sf||s.series===sf));
    const per=24;
    const pages=Math.max(1,Math.ceil(filtered.length/per));
    if(typeof setPage!=='undefined'&&setPage>pages)try{setPage=1}catch(_){window.setPage=1;}
    const page=typeof setPage==='undefined'?1:setPage;
    const shown=filtered.slice((page-1)*per,page*per);
    const grid=document.getElementById('setsGrid');
    if(!grid)return;
    grid.innerHTML=shown.map(s=>`<div class="set">
      <img src="${safeEsc(s.images?.logo||'')}" loading="lazy" decoding="async" onerror="this.style.display='none'">
      <h3>${safeEsc(s.name)}</h3>
      <p class="mini">${safeEsc(s.series||'')} • ${safeEsc(s.ptcgoCode||s.id||'')}</p>
      <p class="mini">${s.total||s.printedTotal||0} cartas • ${safeEsc(s.releaseDate||'')}</p>
      <button class="btn small" onclick="openSetGithub('${safeEsc(s.id)}')">Ver cartas</button>
    </div>`).join('')||'<div class="empty">Nenhum set encontrado.</div>';
    const pager=document.getElementById('setsPager');
    if(pager)pager.innerHTML=pages>1?`<button class="btn small" onclick="setPage=Math.max(1,${page}-1);renderSetsGithub()">‹</button><span class="mini">Página ${page} / ${pages}</span><button class="btn small" onclick="setPage=Math.min(${pages},${page}+1);renderSetsGithub()">›</button>`:'';
    setText('setsInfo',filtered.length?`${filtered.length} sets encontrados`:'Nenhum set encontrado');
  };

  window.loadSetCardsGithub=async function(id){
    if(!id)return;
    const grid=document.getElementById('catalogGrid');
    if(grid)grid.innerHTML='<div class="empty">🔄 Carregando cartas do set...</div>';
    try{
      const r=await fetch(DATA+'/cards/en/'+encodeURIComponent(id)+'.json',{cache:'force-cache'});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const data=await r.json();
      try{catalog=Array.isArray(data)?data:[];}catch(_){window.catalog=Array.isArray(data)?data:[];}
      if(typeof prepareCatalog==='function')prepareCatalog();
      else if(grid)grid.innerHTML='<div class="empty">Cartas carregadas. Atualize o catálogo para visualizar.</div>';
    }catch(e){
      console.error('Cartas do set:',e);
      if(grid)grid.innerHTML='<div class="empty">❌ Não foi possível carregar as cartas deste set.</div>';
    }
  };

  window.openSetGithub=function(id){
    try{page('catalogo');}catch(_){
      document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
      document.getElementById('catalogo')?.classList.add('active');
    }
    const select=document.getElementById('catalogSet');
    if(select)select.value=id;
    window.loadSetCardsGithub(id);
  };

  function install(){
    try{loadSets=window.loadSetsGithub;}catch(_){window.loadSets=window.loadSetsGithub;}
    try{renderSets=window.renderSetsGithub;}catch(_){window.renderSets=window.renderSetsGithub;}
    try{loadSetCards=window.loadSetCardsGithub;}catch(_){window.loadSetCards=window.loadSetCardsGithub;}
    const search=document.getElementById('setSearch');
    if(search)search.oninput=()=>{try{setPage=1}catch(_){window.setPage=1;}window.renderSetsGithub();};
    const refresh=[...document.querySelectorAll('button')].find(b=>/atualizar/i.test(b.textContent||''));
    if(refresh)refresh.onclick=()=>window.loadSetsGithub(true);
    const setsNav=[...document.querySelectorAll('.nav')].find(b=>/sets|cole[cç]ões/i.test(b.textContent||''));
    if(setsNav)setsNav.addEventListener('click',()=>setTimeout(()=>window.loadSetsGithub(false),0),{capture:true});
    window.loadSetsGithub(false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
</script>
'''

if "/* SETS ONLINE OVERRIDE V2 */" not in s:
    s = s.replace("</body>", sets_override + "</body>", 1)

p.write_text(s, encoding="utf-8")
print("Layout e integração dos Sets corrigidos com sucesso.")
