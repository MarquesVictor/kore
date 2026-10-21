// Os 3 módulos da plataforma, exibidos na seção "Módulos".
// - id: define a cor do pilar e o ícone (frota | logistica | sst)
// - tag: rótulo colorido acima do título
// - features: lista de funcionalidades (nome + descrição curta)

export const modules = [
  {
    id: 'frota',
    tag: 'Frota',
    title: 'Gestão de veículos',
    tagline: 'Cada veículo, rastreado do pátio à baixa.',
    features: [
      { name: 'Gestão de veículos', desc: 'Cadastro completo, documentos e vencimentos' },
      { name: 'Movimentação', desc: 'Saídas, retornos e transferências entre bases' },
      { name: 'Ordem de serviço', desc: 'Manutenções preventivas e corretivas' },
      { name: 'Status em tempo real', desc: 'Onde está e em que condição está cada veículo' },
      { name: 'Gestão de multas', desc: 'Registro, condutor responsável e acompanhamento' },
      { name: 'Locadoras e bases', desc: 'Contratos de locação e bases operacionais' },
      { name: 'Checklist de saída', desc: 'Vistoria digital pelo celular do motorista' },
      { name: 'Tipos e modelos', desc: 'Catálogo de marcas, modelos e categorias' },
    ],
  },
  {
    id: 'logistica',
    tag: 'Logística',
    title: 'Movimentação e entrega',
    tagline: 'Da requisição à entrega comprovada.',
    features: [
      { name: 'Rotas e viagens', desc: 'Atribuição de motorista, veículo e destino' },
      { name: 'Comprovante de entrega', desc: 'Foto e assinatura direto do celular' },
      { name: 'Transferência de materiais', desc: 'Movimentação entre bases e filiais' },
      { name: 'Requisição de material', desc: 'Solicitação e aprovação para campo' },
      { name: 'Rastreio de serializados', desc: 'Rastreamento individual por número de série' },
      { name: 'Ocorrências', desc: 'Avaria, ausência, recusa e demais registros' },
      { name: 'Bases operacionais', desc: 'Cadastro e gestão dos pontos de operação' },
      { name: 'Histórico de movimentações', desc: 'Extrato completo por item ou base' },
    ],
  },
  {
    id: 'sst',
    tag: 'Segurança do trabalho',
    title: 'Conformidade e SST',
    tagline: 'Conformidade que não some na hora da fiscalização.',
    features: [
      { name: 'Ficha de EPI', desc: 'Entrega e devolução com assinatura digital' },
      { name: 'Controle de acidentes', desc: 'Registro e acompanhamento tipo CAT' },
      { name: 'APR', desc: 'Análise preliminar de risco antes da atividade de campo' },
      { name: 'Processo CIPA', desc: 'Candidatos, eleição e gestão da comissão' },
      { name: 'Controle de atestados', desc: 'Atestados médicos e afastamentos' },
      { name: 'Checklist de documentos', desc: 'Verificação de documentos obrigatórios' },
      { name: 'Controle de atas', desc: 'Registro das reuniões de segurança' },
      { name: 'Painel SST', desc: 'Indicadores e gráficos de segurança em tempo real' },
    ],
  },
];
