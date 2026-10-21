// Hero editorial: rótulo em mono, título gigante em 3 linhas e, embaixo,
// os números de destaque (src/data/hero.js) ao lado do texto e dos CTAs.
// A abertura animada fica em src/animations/useHeroIntro.js.
import { useRef } from 'react';
import { APP_URL } from '../../config.js';
import { useHeroIntro } from '../../animations/useHeroIntro.js';
import { heroStats } from '../../data/hero.js';
import Button from '../Button/Button.jsx';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  useHeroIntro(heroRef);

  return (
    <section ref={heroRef} className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap">
        <p className="hero__label">
          <span className="hero__label-main">Plataforma de gestão operacional</span>
          <span>Frota · Logística · Segurança do trabalho</span>
        </p>

        {/* Cada linha é um bloco: a quebra fica igual em qualquer largura */}
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">Do pátio</span>
          <span className="hero__line">ao documento</span>
          <span className="hero__line hero__accent">assinado.</span>
        </h1>

        <div className="hero__bottom">
          <dl className="hero__stats hairline">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt>{stat.label}</dt>
                {/* Só o número conta; o sufixo fica fixo */}
                <dd>
                  <span className="hero__count">{stat.value}</span>
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hero__copy">
            <p className="hero__lead">
              KORE reúne <strong>frota, logística e segurança do trabalho</strong> numa única
              plataforma online. Crie sua conta, importe sua operação e comece a operar em minutos
              — sem instalação e sem contrato de fidelidade.
            </p>
            <div className="hero__actions">
              <Button size="lg" href={APP_URL}>
                Começar grátis por 14 dias
              </Button>
              <Button variant="secondary" size="lg" href="#modulos">
                Ver os módulos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
