from pathlib import Path

p = Path("index.html")
s = p.read_text(encoding="utf-8")

css = """
/* Ajuste visual do painel — layout alinhado e navegação reorganizada */
.main{padding:16px 32px 32px;max-width:none;width:100%;margin:0}
.titleRow{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,520px);gap:24px;align-items:center;margin-bottom:16px}
.title h1{font-size:32px;line-height:1.1;margin:0 0 5px}
.title p{margin:0;line-height:1.35}
.controls{display:flex;justify-content:flex-end;align-items:center;gap:9px;min-width:0}
.search{width:100%;min-width:0}
.filters{margin:8px 0 18px}
.content{align-items:start}
.filterbox{position:sticky;top:88px}
.count{margin-bottom:8px}
@media(max-width:1000px){.main{padding:18px}.titleRow{display:block}.controls{justify-content:stretch;margin-top:14px}.filterbox{position:static}}
"""

marker = "</style>"
if "/* Ajuste visual do painel — layout alinhado e navegação reorganizada */" not in s:
    s = s.replace(marker, css + "\n" + marker, 1)

old_nav = '''<aside class="side"><h3>MENU</h3><button class="nav active" onclick="page('cartas',this);loadCards()">📚 Minha Pokédex</button><button class="nav" onclick="page('kanto',this);renderDex()">🔴 Pokédex Kanto</button><button class="nav" onclick="openForm()">➕ Cadastrar Carta</button><button class="nav" onclick="page('estoque',this);loadCards()">📦 Estoque</button><button class="nav" onclick="page('dashboard',this);renderDash()">🏠 Dashboard</button><button class="nav" onclick="page('vendas',this)">💰 Vendas</button></aside>'''
new_nav = '''<aside class="side"><h3>MENU</h3><button class="nav" onclick="page('dashboard',this);renderDash()">🏠 Dashboard</button><button class="nav active" onclick="page('cartas',this);loadCards()">📚 Minha Pokédex</button><button class="nav" onclick="page('kanto',this);renderDex()">🔴 Pokédex Kanto</button><button class="nav" onclick="openForm()">➕ Cadastrar Carta</button><button class="nav" onclick="page('estoque',this);loadCards()">📦 Estoque</button><button class="nav" onclick="page('vendas',this)">💰 Vendas</button></aside>'''

if old_nav not in s:
    raise SystemExit("Menu lateral não encontrado; nenhuma alteração aplicada.")
s = s.replace(old_nav, new_nav, 1)
p.write_text(s, encoding="utf-8")
print("Layout atualizado com sucesso.")
