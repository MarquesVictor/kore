// Seção "Como funciona": título grande e os 4 passos com número gigante (dados em src/data/steps.js).
// Ao entrar na tela, os números sobem em stagger, seguidos de títulos e textos, e as
// hairlines dos passos desenham uma depois da outra, como uma linha do tempo.
import { useRef } from 'react';
import { steps } from '../../data/steps.js';
import { useDrawLines } from '../../animations/useDrawLines.js';
import { useRevealItems } from '../../animations/useRevealItems.js';
import { useRevealLines } from '../../animations/useRevealLines.js';
import './HowItWorks.css';

export default function HowItWorks() {
  const sectionRef = useRef(null);
  // Cabeçalho
  useRevealItems(sectionRef, { targets: '.label' });
  useRevealLines(sectionRef, { target: '.how__title', delay: 0.1 });
  // Passos: disparam quando a lista (não a seção) entra na tela
  useDrawLines(sectionRef, { targets: '.step', trigger: '.steps', duration: 0.5, stagger: 0.3 });
  useRevealLines(sectionRef, { target: '.step__num', trigger: '.steps', delay: 0.1 });
  useRevealItems(sectionRef, { targets: '.step__title, .step__text', trigger: '.steps', delay: 0.35, stagger: 0.06 });

  return (
    <section ref={sectionRef} className="how" id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="wrap how__inner">
        <p className="label">(02) Como funciona</p>
        <h2 id="como-funciona-title" className="how__title">
          Comece sem falar com ninguém.
        </h2>

        <ol className="steps">
          {steps.map((step) => (
            <li key={step.num} className="step hairline">
              <span className="step__num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
