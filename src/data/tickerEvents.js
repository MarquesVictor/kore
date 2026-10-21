// Eventos ilustrativos da faixa "Operação ao vivo" (ticker).
// Cada evento é dividido em três partes para destacar um trecho em negrito
// sem precisar de HTML na string:
//   before + <b>strong</b> + after
// "strong" é opcional.

export const tickerEvents = [
  { before: 'Veículo ', strong: 'FL-2291', after: ' saiu da Base Osasco — 08:41' },
  { before: 'Ficha de EPI ', strong: '#A1123', after: ' assinada — entrega confirmada' },
  { before: 'Entrega ', strong: '#38220', after: ' confirmada em Guarulhos — comprovante anexado' },
  { before: 'OS ', strong: '#7742', after: ' aberta — troca de pneu, veículo FL-0087' },
  { before: 'APR aprovada — atividade em altura, equipe Sul' },
  { before: 'Checklist de saída concluído — veículo ', strong: 'FL-1190' },
  { before: 'Transferência de material — Base SP-01 → Base Campinas' },
  { before: 'Atestado registrado — afastamento de 3 dias, colaborador M.T.' },
];
