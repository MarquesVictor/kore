// Hook de tema claro/escuro.
// - O escuro é o padrão (:root em tokens.css); o claro aplica data-theme="light" no <html>.
// - Ordem de decisão: preferência salva → preferência do sistema → escuro.
// - Quem decide o tema inicial é public/theme-init.js, antes do primeiro paint.
//   Este hook só LÊ o atributo do <html> (fonte da verdade) e o altera no clique.
// - O HTML é pré-renderizado no build sem saber o tema do visitante: por isso o
//   servidor assume "dark" e, logo depois do hydrate, o React lê o tema real
//   (useSyncExternalStore faz essa troca sem erro de hydration).
import { useCallback, useEffect, useSyncExternalStore } from 'react';

// Precisa ser a mesma chave usada em public/theme-init.js
const STORAGE_KEY = 'kore-theme';
const LIGHT_QUERY = '(prefers-color-scheme: light)';

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null; // storage bloqueado (modo privado, política do navegador etc.)
  }
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// ---------- Leitura do atributo do <html> ----------
function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function getServerTheme() {
  return 'dark';
}

// Avisa o React sempre que o atributo muda (inclusive por outro botão de tema)
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  // Enquanto o usuário não escolher um tema, acompanha mudanças do sistema
  useEffect(() => {
    const media = window.matchMedia(LIGHT_QUERY);
    function handleChange(event) {
      if (!readSavedTheme()) applyTheme(event.matches ? 'light' : 'dark');
    }
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Alterna e salva a escolha para as próximas visitas
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem storage: o tema vale só para esta visita.
    }
  }, [theme]);

  return { theme, toggleTheme };
}
