// Seção "Planos": cabeçalho editorial, uma linha de tabela por plano (src/data/plans.js)
// e o aviso obrigatório de valores de lançamento.
import { plans } from '../../data/plans.js';
import PlanRow from '../PlanRow/PlanRow.jsx';
import './Pricing.css';

export default function Pricing() {
  return (
    <section className="pricing" id="planos" aria-labelledby="planos-title">
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
