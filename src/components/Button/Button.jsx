// Botão em pílula da KORE.
// - variant: 'primary' (gradiente) | 'secondary' (contorno) | 'ghost' (fundo violeta suave)
// - size: 'sm' | 'md' | 'lg'
// Com href vira um link <a>; sem href, um <button> (type="button" por padrão).
// As demais props (onClick, aria-label, type...) passam direto para o elemento.
import './Button.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = ['button', `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
