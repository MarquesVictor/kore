// Os 3 planos da seção "Planos".
// - featured: true destaca a linha (fundo --surface-2, preço violeta e botão primário).
//   Use em apenas um plano.
// - price: valor mensal em reais, só o número (o "R$" é escrito pelo PlanRow).
//   O preço do plano em destaque conta de 0 até ele ao entrar na tela.
// - items: exibidos numa linha, separados por " · "
// O link do botão "Começar agora" vem de VITE_APP_URL (ver src/config.js).

export const plans = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 149,
    period: '/mês',
    desc: '1 módulo à escolha',
    items: ['Até 3 usuários', '5 veículos inclusos', 'Alertas e relatórios', 'Suporte por e-mail'],
    featured: false,
  },
  {
    id: 'profissional',
    name: 'Profissional',
    price: 349,
    period: '/mês',
    desc: '2 módulos',
    items: ['Até 10 usuários', '15 veículos inclusos', 'Relatórios agendados', 'Suporte por chat'],
    featured: true,
  },
  {
    id: 'completo',
    name: 'Completo',
    price: 649,
    period: '/mês',
    desc: 'Frota + Logística + SST',
    items: ['Usuários ilimitados', '30 veículos inclusos', 'Acesso via API', 'Suporte prioritário'],
    featured: false,
  },
];
