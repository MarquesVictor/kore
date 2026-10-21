// Hook de tema claro/escuro.
// - O escuro é o padrão (:root em tokens.css); o claro aplica data-theme="light" no <html>.
// - Ordem de decisão: preferência salva → preferência do sistema → escuro.
// - O mesmo cálculo roda antes em public/theme-init.js para evitar o "piscar".
import { useCallback, useEffect, useState } from 'react';

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

function getSystemTheme() {
  // Sem preferência declarada pelo sistema, fica no escuro
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark';
}

function getInitialTheme() {
  return readSavedTheme() ?? getSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Sincroniza o atributo do <html> sempre que o tema muda
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  // Enquanto o usuário não escolher um tema, acompanha mudanças do sistema
  useEffect(() => {
    const media = window.matchMedia(LIGHT_QUERY);
    function handleChange(event) {
      if (!readSavedTheme()) setTheme(event.matches ? 'light' : 'dark');
    }
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Alterna e salva a escolha para as próximas visitas
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem storage: o tema vale só para esta visita.
    }
  }, [theme]);

  return { theme, toggleTheme };
}
