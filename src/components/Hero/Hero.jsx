// Hero: título principal, texto de apoio, selos, CTAs e o painel ilustrativo.
import { APP_URL } from '../../config.js';
import HeroPanel from '../HeroPanel/HeroPanel.jsx';
import './Hero.css';

const BADGES = [
  { value: '3', label: 'módulos' },
  { value: '100%', label: 'online' },
  { value: '14 dias', label: 'grátis' },
];

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Plataforma de gestão operacional</p>
          <h1 id="hero-title" className="hero__title">
            Do pátio ao documento assinado.
          </h1>
          <p className="hero__lead">
            KORE reúne frota, logística e segurança do trabalho numa única plataforma online. Crie
            sua conta, importe sua operação e comece a operar em minutos — sem instalação e sem
            contrato de fidelidade.
          </p>

          <ul className="hero__badges">
            {BADGES.map((badge) => (
              <li key={badge.label} className="hero__badge">
                <b>{badge.value}</b>&nbsp;{badge.label}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a href={APP_URL} className="btn btn-primary">
              Começar agora — grátis por 14 dias
            </a>
            <a href="#modulos" className="btn btn-secondary">
              Ver os módulos
            </a>
          </div>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}
