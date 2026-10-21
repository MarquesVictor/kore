// Card de um módulo (Frota, Logística ou SST).
// Entra na tela com fade + subida; o atraso escalonado (index × 90ms)
// reproduz o efeito em cascata da landing.
import { useInView } from '../../hooks/useInView.js';
import { PILLAR_ICONS } from '../icons/Icons.jsx';
import './ModuleCard.css';

const STAGGER_MS = 90;

export default function ModuleCard({ module, index }) {
  const { ref, inView } = useInView({ delay: index * STAGGER_MS });
  const Icon = PILLAR_ICONS[module.id];

  // A classe module-card--{id} define a cor do pilar no CSS
  const classes = ['module-card', `module-card--${module.id}`, inView && 'in']
    .filter(Boolean)
    .join(' ');

  return (
    <article ref={ref} className={classes}>
      <div className="module-card__icon">
        <Icon />
      </div>
      <p className="module-card__tag">{module.tag}</p>
      <h3 className="module-card__title">{module.title}</h3>
      <p className="module-card__tagline">{module.tagline}</p>

      <ul className="module-card__features">
        {module.features.map((feature) => (
          <li key={feature.name} className="module-card__feature">
            <span className="module-card__feature-name">{feature.name}</span>
            <span className="module-card__feature-desc">{feature.desc}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
