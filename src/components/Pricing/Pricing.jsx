// Seção "Planos": cabeçalho editorial, uma linha de tabela por plano (src/data/plans.js)
// e o aviso obrigatório de valores de lançamento.
// Ao entrar na tela: título por linha, linhas da tabela em stagger e o preço
// do plano em destaque contando até o valor.
import { useRef } from 'react';
import { plans } from '../../data/plans.js';
import { useCountUp } from '../../animations/useCountUp.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import { useRevealLines } from '../../animations/useRevealLines.js';
import PlanRow from '../PlanRow/PlanRow.jsx';
import './Pricing.css';

export default function Pricing() {
  const sectionRef = useRef(null);
  // Cabeçalho
  useRevealLines(sectionRef, { target: '.display' });
  useRevealItems(sectionRef, { targets: '.section-intro__text', delay: 0.2 });
  // Tabela: dispara quando a lista entra na tela
  useRevealItems(sectionRef, { targets: '.plan-row, .pricing__note', trigger: '.pricing__list', y: 24 });
  useCountUp(sectionRef, { targets: '.plan-row--featured .plan-row__amount', trigger: '.pricing__list', delay: 0.15 });

  return (
    <section ref={sectionRef} className="pricing" id="planos" aria-labelledby="planos-title">
      <div className="wrap">
        <div className="section-intro pricing__intro">
          <h2 id="planos-title" className="display">
            Pague pelo
            <br />
            que usa.
          </h2>
          <p className="section-intro__text">
            <span className="label">(03) Planos</span>
            Valor base por módulo ativo, mais um valor por veículo. Sem taxa de implantação.
          </p>
        </div>

        <ul className="pricing__list">
          {plans.map((plan) => (
            <PlanRow key={plan.id} plan={plan} />
          ))}
        </ul>

        <p className="pricing__note">
          *Valores de lançamento, sujeitos a validação de mercado. Veículo adicional cobrado à
          parte.
        </p>
      </div>
    </section>
  );
}
