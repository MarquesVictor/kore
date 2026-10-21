// Botão que alterna entre tema claro e escuro.
// Mostra o sol no tema claro e a lua no escuro, como na landing original.
import { useTheme } from '../../hooks/useTheme.js';
import { MoonIcon, SunIcon } from '../icons/Icons.jsx';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
