(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  function addRetroTheme(){
    if($('#odtcg-retro-theme')) return;
    const style=document.createElement('style');
    style.id='odtcg-retro-theme';
    style.textContent=`
      :root{
        --retro-bg:#160702;
        --retro-bg2:#2a0e04;
        --retro-panel:#3a1608;
        --retro-panel2:#251006;
        --retro-orange:#f07818;
        --retro-gold:#ffbf27;
        --retro-red:#d83a1e;
        --retro-text:#fff2d6;
        --retro-muted:#d6a875;
      }

      html,body{background:var(--retro-bg)!important;color:var(--retro-text)!important}
      body{font-family:Arial,Inter,sans-serif!important}
      .app{
        min-height:100vh!important;
        background:
          radial-gradient(circle at 70% 5%,rgba(255,126,22,.22),transparent 28%),
          radial-gradient(circle at 15% 90%,rgba(198,54,18,.16),transparent 32%),
          linear-gradient(135deg,#1a0702 0%,#321106 48%,#160502 100%)!important;
      }

      .top{
        height:70px!important;
        background:rgba(29,8,3,.97)!important;
        border-bottom:3px solid var(--retro-gold)!important;
        box-shadow:0 3px 0 #7c2b0b,0 8px 25px #0008!important;
        padding:0 24px!important;
      }
      .brand{font-family:Arial,sans-serif!important;color:#fff4dc!important;text-shadow:2px 2px #7b260b!important}
      .brand span{color:var(--retro-gold)!important}
      .pill{border-color:#b9671d!important;background:#2a1007!important;color:#ffe9c5!important}

      .side{
        background:linear-gradient(180deg,rgba(55,19,7,.98),rgba(28,9,4,.98))!important;
        border-right:3px solid var(--retro-gold)!important;
        box-shadow:8px 0 25px #0005!important;
      }
      .side h3{color:#ffc95c!important}
      .nav{color:#ffe7c4!important;font-weight:800!important}
      .nav:hover,.nav.active{
        background:linear-gradient(90deg,#a72e12,#d8461e)!important;
        color:#fff!important;
        border-left:4px solid #ffd22f!important;
        box-shadow:0 4px 12px #0006!important;
      }
      .nav.odtcg-highlight{border-left-color:#ffd22f!important}

      .main{background:transparent!important}
      .title h1,.pokeHero h1{color:#fff7e7!important;text-shadow:2px 2px #692207!important}
      .title p,.meta,.count,.pokeHero p,.pokeStatus{color:var(--retro-muted)!important}

      .search,.pokeTools input,.filterbox select,.field input,.field select,.field textarea,.lookupTop input{
        background:#210a04!important;
        color:#fff4df!important;
        border:2px solid #9b4b17!important;
      }
      .search:focus,.pokeTools input:focus,.filterbox select:focus,.field input:focus,.field select:focus,.field textarea:focus{
        outline:none!important;border-color:var(--retro-gold)!important;box-shadow:0 0 0 2px #ffbf2730!important;
      }

      .btn{background:linear-gradient(135deg,#d83b1e,#f07818)!important;border:2px solid #ffb51e!important;color:#fff8e9!important;box-shadow:0 5px 16px #0006!important}
      .btn.dark{background:#2a1007!important;border-color:#9b4b17!important;color:#ffe8c7!important}
      .btn.danger{background:#a71913!important;border-color:#ff6b31!important}
      .chip{border:2px solid #8f4517!important;background:#251006!important;color:#ffdcae!important}
      .chip:hover,.chip.active{border-color:#ffbf27!important}
      .chip.active{background:linear-gradient(135deg,#d83b1e,#a92612)!important;color:#fff!important}

      .content{gap:18px!important}
      .filterbox,.card,.pokeCard,.modal,.lookup,.empty,.odtcg-section{
        background:linear-gradient(180deg,#3a1608,#230b05)!important;
        border:2px solid #934714!important;
        box-shadow:0 8px 22px #0007!important;
      }
      .filterbox h3{color:#ffd78f!important}
      .card:hover,.pokeCard:hover{border-color:#ffbf27!important}
      .cardImg{background:linear-gradient(135deg,#e9d6b8,#f8ead2)!important}
      .tag{background:#d83b1e!important;border:1px solid #ffb51e!important}
      .stock{color:#7dffad!important}
      .price{color:#fff1cf!important}
      .empty{color:#d6a875!important}

      .drawer{background:#160501e8!important}
      .modalHead{border-bottom:2px solid #8e4517!important}
      .modalBody{color:#ffe8c7!important}
      .lookup{background:#2a1007!important}
      .preview{background:#241006!important;border:2px solid #8e4517!important}
      .marketBox{background:#1c0804!important;border:1px solid #8e4517!important}
      .marketBox small{color:#d6a875!important}
      .msg.ok{background:#173c20!important;color:#9dffbd!important}
      .msg.err{background:#4a120f!important;color:#ffb0a0!important}

      .pokeHero{background:linear-gradient(135deg,#542008,#8b3210)!important;border:2px solid #a95118!important;box-shadow:0 8px 25px #0006!important}
      .progress{background:#2a1007!important}.progress span{background:linear-gradient(90deg,#d83b1e,#ffbf27)!important}
      .pokeTools button{border:2px solid #8f4517!important;background:#251006!important;color:#ffdcae!important}
      .pokeTools button.active{background:#d83b1e!important;border-color:#ffbf27!important;color:#fff!important}
      .pokeImg{background:radial-gradient(circle,#7b2d0d,#1c0804 72%)!important}
      .pokeBody button{border-color:#934714!important;background:#2b1006!important;color:#ffe5bd!important}
      .pokeCard.owned{border-color:#e5a629!important}
      .pokeCard.owned .pokeBody button{background:#263715!important;border-color:#6d8c25!important;color:#dfffab!important}

      .odtcg-section h2{color:#fff0d2!important}.odtcg-section p{color:#d6a875!important}
      .odtcg-nav-badge{background:#d83b1e!important;border:1px solid #ffbf27!important}

      @media(max-width:1000px){
        .layout{display:flex!important;flex-direction:column!important;min-height:0!important}
        .side{
          order:0!important;position:relative!important;top:auto!important;height:auto!important;min-height:0!important;
          width:100%!important;padding:7px 8px!important;border-right:0!important;border-bottom:3px solid var(--retro-gold)!important;
          overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;
          -webkit-overflow-scrolling:touch!important;
        }
        .side h3{display:none!important}
        .nav{display:inline-flex!important;width:auto!important;align-items:center!important;vertical-align:middle!important;margin:0 3px!important;padding:9px 11px!important}
        .nav:hover,.nav.active{padding-left:11px!important;border-left:0!important;border-bottom:3px solid #ffd22f!important}
        .main{order:1!important;width:100%!important;padding:18px 15px 32px!important;min-width:0!important}
      }

      @media(max-width:650px){
        .top{height:58px!important;padding:0 10px!important}
        .brand{font-size:16px!important;max-width:55vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .topActions{gap:5px!important}.topActions .pill{padding:7px 9px!important;font-size:10px!important}
        .topActions .btn{font-size:0!important;padding:9px 12px!important;min-width:42px!important}
        .topActions .btn:before{content:'＋';font-size:18px!important}
        .main{padding:14px 10px 28px!important}
        .titleRow{display:block!important;margin-bottom:12px!important}
        .title h1{font-size:27px!important;line-height:1.15!important}
        .title p{font-size:12px!important}
        .controls{display:flex!important;flex-direction:column!important;align-items:stretch!important;margin-top:12px!important;gap:8px!important}
        .controls .search{width:100%!important;min-width:0!important}
        .controls .btn{width:100%!important}
        .filters{overflow-x:auto!important;flex-wrap:nowrap!important;padding-bottom:4px!important}
        .chip{white-space:nowrap!important}
        .content{display:flex!important;flex-direction:column!important;gap:12px!important}
        .filterbox{position:static!important;width:100%!important}
        .grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}
        .cardImg{height:205px!important}
        .card .body{padding:9px!important}
        .formGrid,.preview{grid-template-columns:1fr!important}
        .preview img{width:100%!important;height:260px!important}
        .pokeGrid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}
        .pokeImg{height:100px!important}.pokeImg img{width:90px!important;height:90px!important}
        .pokeName{font-size:10px!important}.pokeHero{padding:16px!important}
        .lookupTop{flex-direction:column!important}.modal{width:100%!important;max-height:94vh!important}.modalBody{padding:13px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeNav(){
    const side=$('.side');
    if(!side) return;
    $$('.nav',side).forEach(b=>{
      const t=(b.textContent||'').toLowerCase();
      if(t.includes('pokédex kanto')||t.includes('pokedex kanto')||t.trim()==='🔴 kanto'){
        b.innerHTML='🔴 Pokédex Completa';
        b.classList.add('odtcg-highlight');
        b.onclick=function(){ location.href='pokedex.html'; };
      }
    });
  }

  function addCardsNav(){
    const side=$('.side');
    if(!side || side.querySelector('.odtcg-cards-nav')) return;
    const buttons=$$('.nav',side);
    const minhas=buttons.find(b=>/minhas\s+cartas/i.test(b.textContent||''));
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='nav odtcg-cards-nav';
    btn.innerHTML='🃏 Cartas TCG';
    btn.title='Abrir catálogo de cartas Pokémon TCG';
    btn.onclick=function(){ location.href='cartas.html'; };
    if(minhas && minhas.parentNode){
      minhas.insertAdjacentElement('afterend',btn);
    }else{
      side.appendChild(btn);
    }
  }

  function run(){
    addRetroTheme();
    normalizeNav();
    addCardsNav();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));
  else setTimeout(run,50);
  window.addEventListener('load',()=>setTimeout(run,100));
})();