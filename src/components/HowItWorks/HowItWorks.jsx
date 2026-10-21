// Seção "Como funciona": título grande e os 4 passos com número gigante (dados em src/data/steps.js).
import { steps } from '../../data/steps.js';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="how" id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="wrap how__inner">
        <p className="label">(02) Como funciona</p>
        <h2 id="como-funciona-title" className="how__title">
          Comece sem falar com ninguém.
        </h2>

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
