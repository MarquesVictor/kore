// Faixa "Operação ao vivo" com eventos rolando em loop.
// O loop infinito funciona assim: a lista é renderizada duas vezes lado a lado
// e o trilho anda -50% (exatamente uma lista); quando volta ao início, a troca
// é invisível. A cópia é aria-hidden para leitores de tela não lerem duas vezes.
import { tickerEvents } from '../../data/tickerEvents.js';
import './Ticker.css';

function EventList({ hidden = false }) {
  return (
    <ul className="ticker__group" aria-hidden={hidden || undefined}>
      {tickerEvents.map((event, index) => (
        <li key={index}>
          {event.before}
          {event.strong && <b>{event.strong}</b>}
          {event.after}
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker__band">
        <p className="ticker__label">
          <span className="ticker__dot" aria-hidden="true" />
          OPERAÇÃO AO VIVO
        </p>
        <div className="ticker__viewport">
          <div className="ticker__track">
            <EventList />
            <EventList hidden />
          </div>
        </div>
      </div>
      <p className="ticker__note">*dados ilustrativos, para demonstração</p>
    </div>
  );
}
