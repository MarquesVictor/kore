// Os dois canais de contato: ícone do WhatsApp e botão "E-mail" (abre o formulário).
// O número do WhatsApp vem do .env (VITE_CONTACT_WPP, ver src/config.js).
import { WHATSAPP_URL } from '../../config.js';
import { openContactForm } from '../ContactDialog/ContactDialog.jsx';
import { MailIcon, WhatsAppIcon } from '../icons/Icons.jsx';
import './ContactLinks.css';

export default function ContactLinks() {
  return (
    <ul className="contact-links">
      <li>
        {/* Abre em nova aba: no computador, wa.me leva ao WhatsApp Web */}
        <a
          href={WHATSAPP_URL}
          className="contact-links__whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp (abre em nova aba)"
        >
          <WhatsAppIcon />
        </a>
      </li>
      <li>
        <button
          type="button"
          className="contact-links__email"
          onClick={openContactForm}
          aria-haspopup="dialog"
        >
          <MailIcon />
          E-mail
        </button>
      </li>
    </ul>
  );
}
