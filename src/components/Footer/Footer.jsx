// Rodapé em uma linha: logo pequena, links, canais de contato e copyright em mono.
import { PRIVACY_URL, TERMS_URL } from '../../config.js';
import ContactLinks from '../ContactLinks/ContactLinks.jsx';
import Logo from '../Logo/Logo.jsx';
import './Footer.css';

const FOOTER_LINKS = [
  { href: '/#modulos', label: 'Módulos' },
  { href: '/#planos', label: 'Planos' },
  { href: PRIVACY_URL, label: 'Privacidade' },
  { href: TERMS_URL, label: 'Termos' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Logo className="footer__logo" />

        <nav aria-label="Rodapé">
          <ul className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ContactLinks />

        {/* O HTML é pré-renderizado no build: na virada do ano, o ano do build pode diferir
            do ano do visitante até o próximo deploy. suppressHydrationWarning evita que essa
            diferença faça o React descartar o HTML pré-renderizado. */}
        <p className="footer__copy" suppressHydrationWarning>
          © {year} KORE
        </p>
      </div>
    </footer>
  );
}
