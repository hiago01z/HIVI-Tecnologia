export const SERVICE_KEYS = [
  'desenvolvimentoWeb',
  'consultoriaTI',
  'automacaoProcessos',
  'suporteTI',
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const FEATURED_SERVICES: ServiceKey[] = [
  'desenvolvimentoWeb',
  'consultoriaTI',
];

export const SECONDARY_SERVICES: ServiceKey[] = [
  'automacaoProcessos',
  'suporteTI',
];
