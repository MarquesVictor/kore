// Chamada final: título gigante sobre o fundo da página, com "planilha." em violeta,
// botão grande e texto de apoio ao lado. Os contatos ficam no rodapé.
// Ao entrar na tela, o título revela palavra por palavra, "planilha." chega por último
// e depois entram o botão e o texto.
import { useRef } from 'react';
import { APP_URL } from '../../config.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import { useRevealLines } from '../../animations/useRevealLines.js';
import Button from '../Button/Button.jsx';
import './CtaBand.css';

export default function CtaBand() {
  const sectionRef = useRef(null);
  useRevealLines(sectionRef, {
    target: '.cta-band__title',
    type: 'words',
    accent: '.cta-band__accent',
    stagger: 0.06,
  });
  useRevealItems(sectionRef, { targets: '.cta-band__actions > *', delay: 1 });

  return (
    <section ref={sectionRef} className="cta-band" aria-labelledby="cta-title">
      <div className="wrap cta-band__inner">
        <h2 id="cta-title" className="cta-band__title">
          Sua operação não precisa de mais uma <span className="cta-band__accent">planilha.</span>
        </h2>

        <div className="cta-band__actions">
          <Button size="lg" href={APP_URL}>
            Começar agora
          </Button>
          <p className="cta-band__text">Grátis por 14 dias. Cancele quando quiser.</p>
        </div>
      </div>
    </section>
  );
}
