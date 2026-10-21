// URLs externas configuráveis por variável de ambiente (ver .env.example).
// Sem a variável definida, usamos um destino seguro dentro do próprio site.

// Completa "https://" quando o .env traz só o domínio (ex.: "korebr.com/login").
// Sem isso, o navegador trataria o valor como um caminho dentro do próprio site.
function withProtocol(url) {
  if (!url) return '';
  return /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`;
}

export const APP_URL = withProtocol(import.meta.env.VITE_APP_URL) || '/#planos';
export const LOGIN_URL = withProtocol(import.meta.env.VITE_LOGIN_URL) || '#';

// WhatsApp: mantém só os dígitos (aceita "+55 (11) 99999-9999" no .env).
// Sem número, wa.me abre o WhatsApp sem um contato definido.
const whatsappNumber = (import.meta.env.VITE_CONTACT_WPP || '').replace(/\D/g, '');
export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;

// Páginas internas
export const PRIVACY_URL = '/privacidade/';
export const TERMS_URL = '/termos/';
