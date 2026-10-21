// Faixa "Operação ao vivo": 3 eventos de exemplo em DM Mono entre hairlines.
// Os eventos vêm de src/data/operationLog.js. Eles entram em stagger da esquerda
// e o ponto do Núcleo pulsa (a única animação em loop do site).
// O aviso "*dados ilustrativos" é obrigatório: os eventos não são reais.
import { useRef } from 'react';
import { operationLog } from '../../data/operationLog.js';
import { usePulse } from '../../animations/usePulse.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import './OperationLog.css';

export default function OperationLog() {
  const logRef = useRef(null);
  useRevealItems(logRef, { targets: '.operation-log__events li', x: -16, y: 0 });
  usePulse(logRef, { target: '.operation-log__dot' });

  return (
    <section ref={logRef} className="operation-log" aria-label="Exemplo de registro de operação">
      <div className="wrap operation-log__inner">
        <p className="operation-log__label">
          <span className="operation-log__dot" aria-hidden="true" />
          Operação ao vivo*
        </p>

        <ul className="operation-log__events">
          {operationLog.map((event) => {
            // Divide o texto no marcador {id} para destacar o identificador
            const [before, after] = event.text.split('{id}');
            return (
              <li key={event.id}>
                <time>{event.time}</time> · {before}
                <span className="operation-log__id">{event.id}</span>
                {after}
              </li>
            );
          })}
        </ul>

        <p className="operation-log__note">*dados ilustrativos</p>
      </div>
    </section>
  );
}
