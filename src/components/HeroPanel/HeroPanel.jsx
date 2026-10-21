// Painel ilustrativo ao lado do hero (não são dados reais — ver legenda).
// Os números e eventos ficam aqui mesmo por serem parte da ilustração.
import { PILLAR_ICONS } from '../icons/Icons.jsx';
import './HeroPanel.css';

const STATS = [
  { pillar: 'frota', value: '128', label: 'Veículos ativos' },
  { pillar: 'logistica', value: '342', label: 'Entregas hoje' },
  { pillar: 'sst', value: '4', label: 'EPIs pendentes' },
];

const RECENT = [
  'Checklist de saída concluído — veículo FL-1190',
  'Ficha de EPI #A1123 assinada',
  'Entrega #38220 confirmada em Guarulhos',
];

export default function HeroPanel() {
  return (
    <div className="hero-panel">
      <div className="hero-panel__glow" aria-hidden="true" />

      <div className="hero-panel__card">
        <p className="hero-panel__head">
          <span className="hero-panel__dot" aria-hidden="true" />
          PAINEL OPERACIONAL · AO VIVO
        </p>

        <ul className="hero-panel__stats">
          {STATS.map((stat) => {
            const Icon = PILLAR_ICONS[stat.pillar];
            return (
              <li key={stat.pillar} className="hero-panel__stat">
                <span className={`hero-panel__icon hero-panel__icon--${stat.pillar}`}>
                  <Icon />
                </span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </li>
            );
          })}
        </ul>

        <ul className="hero-panel__list">
          {RECENT.map((item) => (
            <li key={item} className="hero-panel__row">
              <span className="hero-panel__check" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="hero-panel__caption">*painel ilustrativo</p>
    </div>
  );
}
