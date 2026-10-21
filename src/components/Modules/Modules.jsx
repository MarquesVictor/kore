// Seção "Módulos": cabeçalho + um card por módulo (dados em src/data/modules.js).
import { modules } from '../../data/modules.js';
import ModuleCard from '../ModuleCard/ModuleCard.jsx';
import './Modules.css';

export default function Modules() {
  return (
    <section className="section-alt" id="modulos" aria-labelledby="modulos-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Módulos</p>
          <h2 id="modulos-title">Três frentes. Uma plataforma.</h2>
          <p>
            Ative o que sua operação precisa hoje. Os módulos compartilham cadastros, alertas e
            relatórios — sem retrabalho entre eles.
          </p>
        </div>

        <div className="modules__grid">
          {modules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
