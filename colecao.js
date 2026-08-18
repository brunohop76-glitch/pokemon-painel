const COLECAO_KEY='odtcg_collection_v1';
function obterColecao(){try{return JSON.parse(localStorage.getItem(COLECAO_KEY)||'[]')}catch{return[]}}
function guardarColecao(c){localStorage.setItem(COLECAO_KEY,JSON.stringify(c))}
function adicionarColecao(card){const c=obterColecao();const old=c.find(x=>x.id===card.id);if(old)old.qty++;else c.push({...card,qty:1});guardarColecao(c);return old?old.qty:1}
