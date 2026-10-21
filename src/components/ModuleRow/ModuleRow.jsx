// Linha de um módulo (Frota, Logística ou SST).
// À esquerda: rótulo com a cor do pilar, nome gigante e tagline.
// À direita: as 8 funcionalidades em duas colunas.
// A classe module-row--{pillar} define a cor do pilar no CSS.
// Ao entrar na tela: a hairline do topo desenha, o nome sobe na máscara
// e as funcionalidades entram em stagger.
import { useRef } from 'react';
import { useDrawLines } from '../../animations/useDrawLines.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import { useRevealLines } from '../../animations/useRevealLines.js';
import './ModuleRow.css';

export default function ModuleRow({ module }) {
  const rowRef = useRef(null);
  useDrawLines(rowRef);
  useRevealLines(rowRef, { target: '.module-row__name', delay: 0.15 });
  useRevealItems(rowRef, { targets: '.module-row__label, .module-row__tagline', delay: 0.15 });
  useRevealItems(rowRef, { targets: '.module-row__features li', delay: 0.3, stagger: 0.06 });

  return (
    <article ref={rowRef} className={`module-row module-row--${module.pillar} hairline`}>
      <div className="module-row__intro">
        <p className="module-row__label">
          <span className="module-row__swatch" aria-hidden="true" />
          {module.letter} — {module.label}
        </p>
        <h3 className="module-row__name">{module.name}</h3>
        <p className="module-row__tagline">{module.tagline}</p>
      </div>

      <ul className="module-row__features">
        {module.features.map((feature) => (
          <li key={feature.name}>
            <strong className="module-row__feature-name">{feature.name}</strong>
            <span className="module-row__feature-desc">{feature.desc}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
