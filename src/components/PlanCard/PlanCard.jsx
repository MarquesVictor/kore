// Card de um plano. Com plan.featured = true, recebe o fundo violeta de destaque.
import { APP_URL } from '../../config.js';
import './PlanCard.css';

export default function PlanCard({ plan }) {
  const classes = ['plan-card', plan.featured && 'plan-card--featured'].filter(Boolean).join(' ');

  return (
    <article className={classes}>
      <h3 className="plan-card__name">{plan.name}</h3>
      <p className="plan-card__price">
        {plan.price}
        <span>{plan.period}</span>
      </p>
      <p className="plan-card__desc">{plan.desc}</p>

      <ul className="plan-card__list">
        {plan.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* aria-label diferencia os três "Começar agora" para leitores de tela */}
      <a
        href={APP_URL}
        className={`btn ${plan.featured ? 'btn-on-band' : 'btn-secondary'}`}
        aria-label={`Começar agora com o plano ${plan.name}`}
      >
        Começar agora
      </a>
    </article>
  );
}
