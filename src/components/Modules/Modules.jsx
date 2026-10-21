// Seção "Módulos": cabeçalho editorial + uma linha por módulo (dados em src/data/modules.js).
// Ao entrar na tela, o título revela por linha e o texto ao lado entra em seguida.
import { useRef } from 'react';
import { modules } from '../../data/modules.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import { useRevealLines } from '../../animations/useRevealLines.js';
import ModuleRow from '../ModuleRow/ModuleRow.jsx';
import './Modules.css';

export default function Modules() {
  const sectionRef = useRef(null);
  useRevealLines(sectionRef, { target: '.display' });
  useRevealItems(sectionRef, { targets: '.section-intro__text', delay: 0.2 });

  return (
    <section ref={sectionRef} className="modules" id="modulos" aria-labelledby="modulos-title">
      <div className="wrap">
        <div className="section-intro">
          <h2 id="modulos-title" className="display">
            Três frentes.
            <br />
            <span className="display__dim">Uma plataforma.</span>
          </h2>
          <p className="section-intro__text">
            <span className="label">(01) Módulos</span>
            Ative o que sua operação precisa hoje. Os módulos compartilham cadastros, alertas e
            relatórios — sem retrabalho entre eles.
          </p>
        </div>

        <div className="modules__list">
          {modules.map((module) => (
            <ModuleRow key={module.id} module={module} />
          ))}
        </div>
      </div>
    </section>
  );
}
