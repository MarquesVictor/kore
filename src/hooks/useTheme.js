// Hook de tema claro/escuro.
// - Aplica data-theme="dark" no <html> (o CSS em tokens.css troca as variáveis).
// - Ordem de decisão: preferência salva → preferência do sistema → claro.
// - O mesmo cálculo roda antes em public/theme-init.js para evitar o "piscar".
import { useCallback, useEffect, useState } from 'react';

// Precisa ser a mesma chave usada em public/theme-init.js
const STORAGE_KEY = 'kore-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null; // storage bloqueado (modo privado, política do navegador etc.)
  }
}

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function getInitialTheme() {
  return readSavedTheme() ?? getSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Sincroniza o atributo do <html> sempre que o tema muda
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  // Enquanto o usuário não escolher um tema, acompanha mudanças do sistema
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    function handleChange(event) {
      if (!readSavedTheme()) setTheme(event.matches ? 'dark' : 'light');
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
