(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  function addStyle(){
    if($('#odtcg-enhancements-style')) return;
    const style=document.createElement('style');
    style.id='odtcg-enhancements-style';
    style.textContent=`
      :root{--od-orange:#ff7a00;--od-orange-2:#ffb000}
      .odtcg-section{margin-top:22px;padding:18px;border:1px solid #29457f;border-radius:16px;background:linear-gradient(180deg,#0d1830,#080e1c)}
      .odtcg-section h2{margin:0 0 6px;font-size:18px}.odtcg-section p{margin:0;color:#9fb1d8;font-size:12px}
      .odtcg-nav-badge{margin-left:auto;font-size:9px;padding:3px 6px;border-radius:99px;background:#ff7a00;color:#fff;font-weight:900}
      .nav.odtcg-highlight{border-left-color:#ff7a00!important}
      .nav.odtcg-highlight:hover,.nav.odtcg-highlight.active{background:linear-gradient(90deg,#6b2b00,#3a1b08)!important}
      .btn.odtcg-orange{background:linear-gradient(135deg,#ff7a00,#ffb000);box-shadow:0 5px 18px #ff7a0040}
      @media(max-width:650px){.odtcg-section{padding:14px}}
    `;
    document.head.appendChild(style);
  }

  function navButton(label, icon, onClick, highlight){
    const b=document.createElement('button');
    b.className='nav'+(highlight?' odtcg-highlight':'');
    b.type='button';
    b.innerHTML=icon+' '+label;
    b.addEventListener('click',onClick);
    return b;
  }

  function normalizeNav(){
    const side=$('.side');
    if(!side) return;
    const buttons=$$('.nav',side);
    buttons.forEach(b=>{
      const t=(b.textContent||'').toLowerCase();
      if(t.includes('kanto')||t.includes('pokédex kanto')||t.includes('pokedex kanto')){
        b.innerHTML='🔴 Pokédex Completa <span class="odtcg-nav-badge">NOVA</span>';
        b.classList.add('odtcg-highlight');
        b.onclick=function(){ location.href='pokedex.html'; };
      }
    });

    if(!buttons.some(b=>(b.textContent||'').toLowerCase().includes('catálogo'))){
      const catalog=navButton('Catálogo','🗂️',function(){
        if(typeof window.page==='function') window.page('catalogo',this); else location.href='app.html#catalogo';
        if(typeof window.loadSets==='function') window.loadSets();
      },false);
      const insertAfter=buttons.find(b=>(b.textContent||'').toLowerCase().includes('minhas cartas'));
      if(insertAfter && insertAfter.parentNode) insertAfter.parentNode.insertBefore(catalog,insertAfter.nextSibling);
    }
  }

  function addQuickLinks(){
    const dash=$('#dashboard');
    if(!dash || $('#odtcg-quicklinks')) return;
    const box=document.createElement('div');
    box.id='odtcg-quicklinks';
    box.className='odtcg-section';
    box.innerHTML='<h2>Acesso rápido</h2><p>Gerencie sua coleção e consulte a Pokédex sem sair do painel.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn odtcg-orange" type="button" id="odtcg-pokedex">🔴 Pokédex Completa</button><button class="btn dark" type="button" id="odtcg-catalogo">🗂️ Catálogo de Sets</button></div>';
    dash.appendChild(box);
    $('#odtcg-pokedex',box).onclick=()=>location.href='pokedex.html';
    $('#odtcg-catalogo',box).onclick=()=>{if(typeof window.page==='function')window.page('catalogo');};
  }

  function cleanLegacy(){
    $$('.nav').forEach(b=>{
      if((b.textContent||'').trim()==='🔴 Pokédex Kanto') b.remove();
    });
  }

  function run(){
    addStyle();
    cleanLegacy();
    normalizeNav();
    addQuickLinks();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(run,80));
  else setTimeout(run,80);
  window.addEventListener('load',()=>setTimeout(run,120));
})();
