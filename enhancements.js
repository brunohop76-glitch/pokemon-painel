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
      --retro-bg:#160603;
      --retro-bg2:#2b0d05;
      --retro-panel:#431807;
      --retro-panel2:#250b05;
      --retro-orange:#ef5a18;
      --retro-orange2:#ff8a1c;
      --retro-gold:#ffd22e;
      --retro-red:#c93418;
      --retro-cream:#fff0c8;
      --retro-muted:#d7aa70;
    }

    html,body{background:#160603!important;color:var(--retro-cream)!important;font-family:Arial,Helvetica,sans-serif!important}
    body{background-image:radial-gradient(circle at 20% 15%,rgba(255,126,25,.16),transparent 22%),radial-gradient(circle at 90% 80%,rgba(190,42,12,.18),transparent 26%)!important}
    .app{min-height:100vh!important;background:
      radial-gradient(circle at 75% 0,rgba(239,90,24,.22),transparent 25%),
      radial-gradient(circle at 10% 100%,rgba(255,191,35,.08),transparent 28%),
      repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0,rgba(255,255,255,.018) 1px,transparent 1px,transparent 4px),
      linear-gradient(135deg,#160603 0%,#351006 48%,#1b0703 100%)!important;
    }

    .top{height:68px!important;background:linear-gradient(180deg,#321006,#210803)!important;border-bottom:3px solid var(--retro-gold)!important;box-shadow:0 3px 0 #8f2e0d,0 7px 20px #0009!important;padding:0 22px!important}
    .brand{font-family:Arial Black,Arial,sans-serif!important;font-weight:900!important;letter-spacing:-.5px!important;color:#fff7df!important;text-shadow:2px 2px 0 #7c260d,0 0 8px rgba(255,184,40,.18)!important}
    .brand span{color:var(--retro-gold)!important;text-shadow:2px 2px 0 #9b350d!important}
    .pill{background:#2a0c05!important;border:2px solid #b75a16!important;color:#ffe7b5!important;box-shadow:inset 0 0 0 1px #4d1808!important}

    .side{background:linear-gradient(180deg,#3b1307 0%,#240a04 55%,#190603 100%)!important;border-right:3px solid var(--retro-gold)!important;box-shadow:8px 0 24px #0007!important}
    .side h3{color:#ffc75c!important;text-shadow:1px 1px #6d230b!important}
    .nav{color:#ffe7bd!important;font-weight:900!important;text-shadow:1px 1px #571a08!important;transition:transform .12s,background .12s!important}
    .nav:hover{transform:translateX(2px)!important;background:linear-gradient(90deg,#7e250d,#bd3916)!important;color:#fff!important;border-left:4px solid var(--retro-gold)!important}
    .nav.active{background:linear-gradient(90deg,#c53c16,#e85a18)!important;color:#fff!important;border-left:4px solid var(--retro-gold)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 5px 14px #0006!important}

    .main{background:transparent!important}
    .title h1,.titleRow h1,.pokeHero h1{color:#fff6df!important;text-shadow:3px 3px 0 #6d210a!important;letter-spacing:-.5px!important}
    .title p,.meta,.count,.pokeHero p,.pokeStatus{color:var(--retro-muted)!important}

    .search,.pokeTools input,.filterbox select,.field input,.field select,.field textarea,.lookupTop input{
      background:#1e0804!important;color:#fff1d2!important;border:2px solid #9f4b13!important;border-radius:9px!important;box-shadow:inset 0 2px 7px #0008!important
    }
    .search::placeholder,.pokeTools input::placeholder,.lookupTop input::placeholder{color:#ad7b50!important}
    .search:focus,.pokeTools input:focus,.filterbox select:focus,.field input:focus,.field select:focus,.field textarea:focus{outline:none!important;border-color:var(--retro-gold)!important;box-shadow:0 0 0 2px #ffbf2240,inset 0 2px 7px #0008!important}

    .btn{background:linear-gradient(180deg,#f2761a,#c63a14)!important;border:2px solid var(--retro-gold)!important;color:#fff8e9!important;border-radius:9px!important;box-shadow:inset 0 1px 0 #ffffff44,0 5px 12px #0007!important;text-shadow:1px 1px #762008!important}
    .btn:hover{filter:brightness(1.08)!important;transform:translateY(-1px)!important}
    .btn.dark{background:#2a0c05!important;border-color:#9d4b15!important;color:#ffe5b5!important;box-shadow:none!important}
    .btn.danger{background:linear-gradient(180deg,#db321d,#99160e)!important;border-color:#ff7131!important}

    .filters{gap:8px!important}
    .chip,.pokeTools button{background:linear-gradient(180deg,#351006,#230a04)!important;border:2px solid #9d4a13!important;color:#ffe1ac!important;box-shadow:inset 0 1px 0 #ffffff16!important}
    .chip:hover,.pokeTools button:hover{border-color:var(--retro-gold)!important;color:#fff!important}
    .chip.active,.pokeTools button.active{background:linear-gradient(180deg,#e05a18,#b92c12)!important;border-color:var(--retro-gold)!important;color:#fff!important;box-shadow:0 4px 10px #0007!important}

    .filterbox,.card,.pokeCard,.modal,.lookup,.empty,.odtcg-section{
      background:linear-gradient(180deg,rgba(67,24,8,.98),rgba(35,10,4,.98))!important;border:2px solid #994713!important;border-radius:13px!important;box-shadow:0 8px 22px #0008,inset 0 1px 0 #ffffff12!important
    }
    .filterbox h3{color:#ffd98d!important}
    .filterbox label{color:#f0c995!important}
    .card:hover,.pokeCard:hover{border-color:var(--retro-gold)!important;box-shadow:0 10px 24px #0009,0 0 0 1px #ffbf2233!important}
    .cardImg{background:linear-gradient(135deg,#ead6b8,#fff0d5)!important}
    .tag{background:linear-gradient(180deg,#e45b19,#b92c12)!important;border:1px solid var(--retro-gold)!important}
    .price{color:#fff1cf!important}.stock{color:#8fe69a!important}
    .empty{color:#d9aa73!important}

    .drawer{background:rgba(16,3,1,.9)!important}
    .modal{border-color:#b25517!important}
    .modalHead{border-bottom:2px solid #8e4210!important}
    .lookup{background:#2b0c05!important}
    .preview,.marketBox{background:#1d0703!important;border:2px solid #8c4110!important}
    .marketBox small{color:#d0a06a!important}
    .msg.ok{background:#18391d!important;color:#a7ffb9!important}.msg.err{background:#4a120d!important;color:#ffb4a1!important}

    .pokeHero{background:linear-gradient(135deg,#692207,#351006)!important;border:2px solid #a94e14!important;box-shadow:0 8px 24px #0008!important}
    .progress{background:#210804!important}.progress span{background:linear-gradient(90deg,#d64015,#ffbf25)!important}
    .pokeImg{background:radial-gradient(circle,#8a3510,#210804 72%)!important}
    .pokeCard.owned{border-color:#e7ad25!important}.pokeCheck{background:#5d9c28!important}
    .pokeBody button{background:#321006!important;border-color:#934411!important;color:#ffe3af!important}
    .pokeCard.owned .pokeBody button{background:#243b16!important;border-color:#67983a!important;color:#e0ffc7!important}

    .pokemon-ambient img{opacity:.14!important;filter:drop-shadow(0 8px 14px #0009)!important}
    .pokemon-ambient:after{content:'POKÉMON TCG  •  O DIÁRIO TCG';position:absolute;left:50%;bottom:10px;transform:translateX(-50%);font-size:10px;letter-spacing:3px;color:#d88b4c;opacity:.22;white-space:nowrap;font-weight:900}

    /* detalhes visuais inspirados na era GBA/anos 2000 */
    .main:before{content:'';position:absolute;left:0;right:0;top:0;height:7px;background:repeating-linear-gradient(90deg,#ffbf22 0,#ffbf22 18px,#c33b13 18px,#c33b13 36px,#351006 36px,#351006 54px);opacity:.5;pointer-events:none}
    .titleRow,.content,.filters,.pokeTools,.pokeGrid,.grid{position:relative}
    .titleRow:after{content:'★';position:absolute;right:8px;top:-8px;color:#ffbf22;font-size:18px;opacity:.28;pointer-events:none}

    @media(max-width:1000px){
      .layout{display:flex!important;flex-direction:column!important;min-height:0!important}
      .side{order:0!important;position:relative!important;top:auto!important;width:100%!important;height:auto!important;min-height:0!important;padding:7px 8px!important;border-right:0!important;border-bottom:3px solid var(--retro-gold)!important;overflow-x:auto!important;white-space:nowrap!important}
      .side h3{display:none!important}.nav{display:inline-flex!important;width:auto!important;align-items:center!important;margin:0 3px!important;padding:9px 11px!important}
      .nav:hover,.nav.active{padding-left:11px!important;border-left:0!important;border-bottom:3px solid var(--retro-gold)!important}
      .main{order:1!important;width:100%!important;min-width:0!important;padding:18px 15px 32px!important}
    }
    @media(max-width:650px){
      .top{height:58px!important;padding:0 10px!important}.brand{font-size:16px!important}.main{padding:14px 10px 28px!important}
      .topActions .pill{padding:7px 9px!important;font-size:10px!important}.topActions .btn{font-size:0!important;padding:9px 12px!important}.topActions .btn:before{content:'＋';font-size:18px!important}
      .titleRow{display:block!important}.title h1{font-size:27px!important}.controls{display:flex!important;flex-direction:column!important;align-items:stretch!important;margin-top:12px!important}.controls .btn{width:100%!important}
      .content{display:flex!important;flex-direction:column!important}.filterbox{position:static!important;width:100%!important}.grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}.cardImg{height:205px!important}
      .pokeGrid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}.pokeImg{height:100px!important}.pokeImg img{width:90px!important;height:90px!important}.pokeName{font-size:10px!important}
    }
  `;
  document.head.appendChild(style);
}

function normalizeNav(){
  const side=$('.side'); if(!side)return;
  $$('.nav',side).forEach(b=>{
    const t=(b.textContent||'').toLowerCase();
    if(t.includes('pokédex kanto')||t.includes('pokedex kanto')||t.trim()==='🔴 kanto'){
      b.innerHTML='🔴 Pokédex Completa';b.classList.add('odtcg-highlight');b.onclick=function(){location.href='pokedex.html';};
    }
  });
}

function addCardsNav(){
  const side=$('.side');if(!side||side.querySelector('.odtcg-cards-nav'))return;
  const buttons=$$('.nav',side);const minhas=buttons.find(b=>/minhas\s+cartas/i.test(b.textContent||''));
  const btn=document.createElement('button');btn.type='button';btn.className='nav odtcg-cards-nav';btn.innerHTML='🃏 Cartas TCG';btn.title='Abrir catálogo de cartas Pokémon TCG';btn.onclick=function(){location.href='cartas.html';};
  if(minhas&&minhas.parentNode)minhas.insertAdjacentElement('afterend',btn);else side.appendChild(btn);
}

function run(){addRetroTheme();normalizeNav();addCardsNav();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));else setTimeout(run,50);
window.addEventListener('load',()=>setTimeout(run,100));
})();