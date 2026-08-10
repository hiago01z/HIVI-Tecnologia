export const SERVICE_KEYS = [
  'desenvolvimentoWeb',
  'consultoriaTI',
  'automacaoProcessos',
  'suporteTI',
  'infraestrutura',
  'gestaoProjetos',
  'segurancaInfo',
  'businessIntelligence',
  'migracaoCloud',
  'erp',
  'ti360',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const FEATURED_SERVICES: ServiceKey[] = [
  'desenvolvimentoWeb',
  'consultoriaTI',
];
