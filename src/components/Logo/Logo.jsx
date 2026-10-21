// Logo KORE: símbolo K oficial (com o "Núcleo" no centro) + wordmark.
// variant:
//   'auto'     → acompanha o tema do site (padrão)
//   'on-dark'  → força a versão para fundo escuro
//   'on-light' → força a versão para fundo claro
// As cores ficam em tokens.css (--logo-*); aqui só aplicamos as classes.
import { useId } from 'react';
import './Logo.css';

export default function Logo({ variant = 'auto', className = '' }) {
  // ID único por instância: o header e o footer têm cada um seu próprio gradiente.
  // useId gera ":r0:"; removemos os ":" para usar com segurança em url(#...).
  const gradientId = `kore-k-${useId().replace(/:/g, '')}`;
  const stroke = `url(#${gradientId})`;

  const classes = ['logo', variant !== 'auto' && `logo--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <svg className="logo__symbol" viewBox="-6 0 90 84" aria-hidden="true" focusable="false">
        <defs>
          {/* userSpaceOnUse: com o padrão (objectBoundingBox) a haste vertical,
              que tem largura zero, ficaria invisível */}
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="-6"
            y1="0"
            x2="84"
            y2="84"
          >
            <stop offset="0%" className="logo__stop-1" />
            <stop offset="55%" className="logo__stop-2" />
            <stop offset="100%" className="logo__stop-3" />
          </linearGradient>
        </defs>

        {/* Haste vertical e os dois braços do K */}
        <line x1="14" y1="7" x2="14" y2="77" stroke={stroke} strokeWidth="11" strokeLinecap="round" />
        <path d="M14 42 L58 9" stroke={stroke} strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M14 42 L58 75" stroke={stroke} strokeWidth="11" strokeLinecap="round" fill="none" />

        {/* Núcleo: halo, ponto de luz e centro */}
        <circle className="logo__halo" cx="14" cy="42" r="10" />
        <circle className="logo__core" cx="14" cy="42" r="6" />
        <circle className="logo__center" cx="14" cy="42" r="2.8" />
      </svg>

      {/* Wordmark: sempre Syne 800, caixa alta, espaçamento do guia */}
      <span className="logo__wordmark">KORE</span>
    </span>
  );
}
