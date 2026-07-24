import { defineRouting } from 'next-intl/routing';

export const locales = ['pt-BR', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'pt-BR' satisfies Locale;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
});
