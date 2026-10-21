// Define o tema antes do primeiro paint (carregado no <head> do index.html).
// Ordem de decisão: preferência salva → preferência do sistema → claro.
// A chave "kore-theme" precisa ser a mesma usada em src/hooks/useTheme.js.
(function () {
  var prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = prefersDark ? 'dark' : 'light';

  // localStorage pode lançar erro (modo privado, cookies bloqueados etc.)
  try {
    var saved = localStorage.getItem('kore-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    // Sem acesso ao storage: fica com a preferência do sistema.
  }

  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();
