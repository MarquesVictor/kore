// Header fixo: logo, links de navegação, toggle de tema, CTAs e menu mobile.
// Abaixo de 860px os links somem e aparece o botão de menu, que abre um painel.
// O painel fecha ao clicar num link, ao apertar Esc ou ao alargar a tela.
import { useEffect, useRef, useState } from 'react';
import { APP_URL, LOGIN_URL } from '../../config.js';
import Logo from '../Logo/Logo.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';
import { CloseIcon, MenuIcon } from '../icons/Icons.jsx';
import './Header.css';

// Com "/" na frente, os links também funcionam a partir das páginas de Privacidade e Termos.
// Na home, o navegador só rola até a âncora (não recarrega a página).
const NAV_LINKS = [
  { href: '/#modulos', label: 'Módulos' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#planos', label: 'Planos' },
];

const MOBILE_MENU_ID = 'menu-mobile';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  // Listeners só existem enquanto o menu está aberto
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus(); // devolve o foco para o botão que abriu o menu
      }
    }

    // Se a tela passar do breakpoint (ex.: girar o tablet), o painel não faz mais sentido
    const desktop = window.matchMedia('(min-width: 861px)');
    function handleResize(event) {
      if (event.matches) setMenuOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', handleResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__bar">
        <a href="/#inicio" className="header__brand" aria-label="KORE — voltar ao início">
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Principal">
          <ul className="header__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <ThemeToggle />
          <a href={LOGIN_URL} className="btn btn-ghost header__cta">
            Entrar
          </a>
          <a href={APP_URL} className="btn btn-primary header__cta">
            Começar agora
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="header__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Painel do menu mobile. "hidden" tira os links da tela e da ordem de tab. */}
      <nav id={MOBILE_MENU_ID} className="header__mobile" aria-label="Menu" hidden={!menuOpen}>
        <ul className="header__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Em telas muito estreitas os CTAs saem da barra e aparecem aqui */}
        <div className="header__mobile-cta">
          <a href={LOGIN_URL} className="btn btn-secondary" onClick={closeMenu}>
            Entrar
          </a>
          <a href={APP_URL} className="btn btn-primary" onClick={closeMenu}>
            Começar agora
          </a>
        </div>
      </nav>
    </header>
  );
}
