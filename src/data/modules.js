// Os 3 módulos da plataforma, exibidos como linhas na seção "Módulos".
// - id: identificador do módulo (frota | logistica | sst)
// - letter: letra do rótulo ("A — FROTA")
// - pillar: cor do pilar no Design System (frota | suprimentos | pessoas)
// - label: nome por extenso, usado no rótulo e no formulário de contato
// - name: título gigante da linha
// - features: 8 funcionalidades (nome + descrição curta)

export const modules = [
  {
    id: 'frota',
    letter: 'A',
    pillar: 'frota',
    label: 'Frota',
    name: 'Frota',
    tagline: 'Cada veículo, rastreado do pátio à baixa.',
    features: [
      { name: 'Gestão de veículos', desc: 'Cadastro, documentos e vencimentos' },
      { name: 'Movimentação', desc: 'Saídas, retornos e transferências' },
      { name: 'Ordem de serviço', desc: 'Manutenções preventivas e corretivas' },
      { name: 'Status em tempo real', desc: 'Onde e em que condição está cada veículo' },
      { name: 'Gestão de multas', desc: 'Registro e condutor responsável' },
      { name: 'Checklist de saída', desc: 'Vistoria digital pelo celular' },
      { name: 'Locadoras e bases', desc: 'Contratos e bases operacionais' },
      { name: 'Tipos e modelos', desc: 'Marcas, modelos e categorias' },
    ],
  },
  {
    id: 'logistica',
    letter: 'B',
    pillar: 'suprimentos',
    label: 'Logística',
    name: 'Logística',
    tagline: 'Da requisição à entrega comprovada.',
    features: [
      { name: 'Rotas e viagens', desc: 'Motorista, veículo e destino' },
      { name: 'Comprovante de entrega', desc: 'Foto e assinatura pelo celular' },
      { name: 'Transferência de materiais', desc: 'Entre bases e filiais' },
      { name: 'Requisição de material', desc: 'Solicitação e aprovação para campo' },
      { name: 'Rastreio de serializados', desc: 'Por número de série' },
      { name: 'Ocorrências', desc: 'Avaria, ausência e recusa' },
      { name: 'Bases operacionais', desc: 'Pontos de operação' },
      { name: 'Histórico', desc: 'Extrato por item ou base' },
    ],
  },
  {
    id: 'sst',
    letter: 'C',
    pillar: 'pessoas',
    label: 'Segurança do trabalho',
    name: 'SST',
    tagline: 'Conformidade que não some na hora da fiscalização.',
    features: [
      { name: 'Ficha de EPI', desc: 'Entrega e devolução com assinatura' },
      { name: 'Controle de acidentes', desc: 'Registro e acompanhamento tipo CAT' },
      { name: 'APR', desc: 'Análise de risco antes da atividade' },
      { name: 'Processo CIPA', desc: 'Candidatos, eleição e comissão' },
      { name: 'Atestados', desc: 'Atestados e afastamentos' },
      { name: 'Checklist de documentos', desc: 'Documentos obrigatórios' },
      { name: 'Controle de atas', desc: 'Reuniões de segurança' },
      { name: 'Painel SST', desc: 'Indicadores em tempo real' },
    ],
  },
];
