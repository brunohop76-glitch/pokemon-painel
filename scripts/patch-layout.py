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

p.write_text(s, encoding="utf-8")
print("Alinhamento de Minhas Cartas aplicado com sucesso.")
