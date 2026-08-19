(() => {
  const frame = document.getElementById('pokedexFrame');
  if (!frame) return;

  const inject = () => {
    try {
      const doc = frame.contentDocument;
      if (!doc || doc.getElementById('odtcg-redesign-css')) return;

      const link = doc.createElement('link');
      link.id = 'odtcg-redesign-css';
      link.rel = 'stylesheet';
      link.href = 'pokedex-redesign.css?v=20260819-1';
      doc.head.appendChild(link);

      doc.documentElement.style.scrollBehavior = 'smooth';

      // Atalhos de teclado úteis sem alterar a lógica existente.
      doc.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          const close = doc.getElementById('close');
          if (close) close.click();
        }
        if (event.key === '/' && !['INPUT','SELECT','TEXTAREA'].includes(doc.activeElement?.tagName)) {
          event.preventDefault();
          doc.getElementById('q')?.focus();
        }
      });

      // Enter no campo de busca aplica o filtro imediatamente.
      doc.getElementById('q')?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') doc.getElementById('refresh')?.click();
      });
    } catch (error) {
      console.warn('Redesign da Pokédex não pôde ser aplicado.', error);
    }
  };

  frame.addEventListener('load', inject);
  if (frame.contentDocument?.readyState === 'complete') inject();
})();
