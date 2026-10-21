// Faixa final de chamada para ação, em violeta sólido.
// Abaixo do botão, os canais de contato para quem prefere conversar antes de assinar.
import { APP_URL } from '../../config.js';
import ContactLinks from '../ContactLinks/ContactLinks.jsx';
import './CtaBand.css';

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="wrap">
        <h2 id="cta-title" className="cta-band__title">
          Sua operação não precisa de mais uma planilha.
        </h2>
        <p className="cta-band__text">Comece grátis por 14 dias. Cancele quando quiser.</p>
        <a href={APP_URL} className="btn btn-on-band cta-band__button">
          Começar agora
        </a>

        <div className="cta-band__contact">
          <p>Prefere conversar antes? Fale com a gente:</p>
          <ContactLinks variant="on-band" />
        </div>
      </div>
    </section>
  );
}
