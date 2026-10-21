// Seção "Como funciona": os 4 passos (dados em src/data/steps.js).
import { steps } from '../../data/steps.js';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Como funciona</p>
          <h2 id="como-funciona-title">Comece sem falar com ninguém.</h2>
        </div>

        <ol className="steps">
          {steps.map((step) => (
            <li key={step.num} className="step">
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
