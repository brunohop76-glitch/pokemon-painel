/* O DIÁRIO TCG — detalhes extras da Pokédex */
(() => {
  const API='https://pokeapi.co/api/v2';
  const TYPE_CACHE='odtcg_type_relations_v1';
  const esc=s=>String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const getCache=()=>{try{return JSON.parse(localStorage.getItem(TYPE_CACHE)||'{}')}catch{return {}}};
  const setCache=v=>{try{localStorage.setItem(TYPE_CACHE,JSON.stringify(v))}catch{}};
  async function relations(type){
    const cache=getCache();
    if(cache[type]) return cache[type];
    const r=await fetch(`${API}/type/${type}`,{cache:'force-cache'});
    if(!r.ok) throw Error();
    const d=await r.json();
    const out={weak:(d.damage_relations?.double_damage_from||[]).map(x=>x.name),resist:(d.damage_relations?.half_damage_from||[]).map(x=>x.name),immune:(d.damage_relations?.no_damage_from||[]).map(x=>x.name)};
    cache[type]=out;setCache(cache);return out;
  }
  const original=window.openPokemon;
  if(typeof original!=='function') return;
  window.openPokemon=async function(id){
    await original(id);
    try{
      const root=document.getElementById('content');
      if(!root||root.querySelector('.type-relations')) return;
      const chips=[...root.querySelectorAll('.chips .chip')].map(x=>x.textContent.trim().toLowerCase());
      if(!chips.length) return;
      const rows=await Promise.all(chips.map(relations));
      const weak=[...new Set(rows.flatMap(x=>x.weak))],resist=[...new Set(rows.flatMap(x=>x.resist))],immune=[...new Set(rows.flatMap(x=>x.immune))];
      const box=document.createElement('section');box.className='type-relations';box.innerHTML=`<h3>Tipos · fraquezas e resistências</h3><p><b>Fraco contra:</b> ${weak.length?weak.map(x=>`<span class="chip">${esc(x)}</span>`).join(' '):'Nenhum'}</p><p><b>Resiste a:</b> ${resist.length?resist.map(x=>`<span class="chip">${esc(x)}</span>`).join(' '):'Nenhum'}</p><p><b>Imune a:</b> ${immune.length?immune.map(x=>`<span class="chip">${esc(x)}</span>`).join(' '):'Nenhum'}</p>`;
      root.querySelector('.detail>div')?.appendChild(box);
    }catch{}
  };
})();
