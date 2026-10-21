// Define o tema antes do primeiro paint (carregado no <head> do index.html).
// Ordem de decisão: preferência salva → preferência do sistema → escuro.
// O escuro é o padrão (:root em tokens.css); o claro aplica data-theme="light".
// A chave "kore-theme" precisa ser a mesma usada em src/hooks/useTheme.js.
(function () {
  var prefersLight =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  var theme = prefersLight ? 'light' : 'dark';

  // localStorage pode lançar erro (modo privado, cookies bloqueados etc.)
  try {
    var saved = localStorage.getItem('kore-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    // Sem acesso ao storage: fica com a preferência do sistema.
  }

  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();
