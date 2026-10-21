// Linha de um módulo (Frota, Logística ou SST).
// À esquerda: rótulo com a cor do pilar, nome gigante e tagline.
// À direita: as 8 funcionalidades em duas colunas.
// A classe module-row--{pillar} define a cor do pilar no CSS.
import './ModuleRow.css';

export default function ModuleRow({ module }) {
  return (
    <article className={`module-row module-row--${module.pillar}`}>
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
