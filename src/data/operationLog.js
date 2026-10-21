// Eventos ilustrativos da faixa "Operação ao vivo" (OperationLog).
// - time: horário em DM Mono
// - text: descrição do evento; o marcador {id} indica onde entra o identificador
// - id:   código destacado (placa, ficha, entrega...)
// São dados de exemplo: a faixa sempre mostra o aviso "*dados ilustrativos".

export const operationLog = [
  { time: '08:41', text: '{id} saiu da Base Osasco', id: 'FL-2291' },
  { time: '09:02', text: 'EPI {id} assinada', id: '#A1123' },
  { time: '09:17', text: 'Entrega {id} confirmada em Guarulhos', id: '#38220' },
];
