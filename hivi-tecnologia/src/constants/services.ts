export const SERVICE_KEYS = [
  'consultoriaTI',
  'gestaoProjetos',
  'infraestrutura',
  'segurancaInfo',
  'suporteTI',
  'desenvolvimentoWeb',
  'automacaoProcessos',
  'businessIntelligence',
  'migracaoCloud',
  'erp',
  'ti360',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const FEATURED_SERVICES: ServiceKey[] = [
  'consultoriaTI',
  'desenvolvimentoWeb',
  'infraestrutura',
];
