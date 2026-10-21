// Linha de um plano: nome + descrição, preço gigante, itens separados por "·" e botão.
// Com plan.featured = true, a linha ganha fundo --surface-2, preço violeta e botão primário.
import { APP_URL } from '../../config.js';
import Button from '../Button/Button.jsx';
import './PlanRow.css';

export default function PlanRow({ plan }) {
  const classes = ['plan-row', plan.featured && 'plan-row--featured'].filter(Boolean).join(' ');

  return (
    <li className={classes}>
      <div className="plan-row__head">
        <h3 className="plan-row__name">{plan.name}</h3>
        <p className="plan-row__desc">{plan.desc}</p>
      </div>

      <p className="plan-row__price">
        {plan.price}
        <span className="plan-row__period"> {plan.period}</span>
      </p>

      <p className="plan-row__items">{plan.items.join(' · ')}</p>

      {/* aria-label diferencia os três "Começar agora" para leitores de tela */}
      <Button
        variant={plan.featured ? 'primary' : 'secondary'}
        href={APP_URL}
        className="plan-row__button"
        aria-label={`Começar agora com o plano ${plan.name}`}
      >
        Começar agora
      </Button>
    </li>
  );
}
