// Seção "Planos": cabeçalho, um card por plano (src/data/plans.js) e o aviso de valores.
import { plans } from '../../data/plans.js';
import PlanCard from '../PlanCard/PlanCard.jsx';
import './Pricing.css';

export default function Pricing() {
  return (
    <section className="section-alt" id="planos" aria-labelledby="planos-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Planos</p>
          <h2 id="planos-title">Pague pelo que usa.</h2>
          <p>Valor base por módulo ativo, mais um valor por veículo. Sem taxa de implantação.</p>
        </div>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="pricing__note">
          *Valores de lançamento, sujeitos a validação de mercado. Veículo adicional cobrado à
          parte.
        </p>
      </div>
    </section>
  );
}
