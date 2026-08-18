(function(){'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function normalizeNav(){
  const side=$('.side');if(!side)return;
  $$('.nav',side).forEach(b=>{
    const t=(b.textContent||'').toLowerCase();
    if(t.includes('pokédex kanto')||t.includes('pokedex kanto')||t.trim()==='🔴 kanto'){
      b.innerHTML='🔴 Pokédex Completa';
      b.classList.add('odtcg-highlight');
      b.onclick=function(){location.href='pokedex.html';};
    }
  });
}
function addCardsNav(){
  const side=$('.side');if(!side||side.querySelector('.odtcg-cards-nav'))return;
  const buttons=$$('.nav',side);
  const minhas=buttons.find(b=>/minhas\s+cartas/i.test(b.textContent||''));
  const btn=document.createElement('button');
  btn.type='button';btn.className='nav odtcg-cards-nav';
  btn.innerHTML='🃏 Cartas TCG';
  btn.title='Abrir catálogo de cartas Pokémon TCG';
  btn.onclick=function(){location.href='cartas.html';};
  if(minhas&&minhas.parentNode)minhas.insertAdjacentElement('afterend',btn);else side.appendChild(btn);
}
function run(){normalizeNav();addCardsNav();document.documentElement.dataset.odtcgTheme='firered-gba';}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));else setTimeout(run,50);
window.addEventListener('load',()=>setTimeout(run,100));
})();