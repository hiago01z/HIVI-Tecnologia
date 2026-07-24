export const NAV_LINKS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.services', href: '/servicos' },
  { key: 'nav.about', href: '/sobre' },
  { key: 'nav.blog', href: '/blog' },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { key: 'nav.about', href: '/sobre' },
  { key: 'nav.services', href: '/servicos' },
  { key: 'nav.blog', href: '/blog' },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { key: 'nav.privacy', href: '/privacidade' },
] as const;

export const SUPPORTED_LOCALES = ['pt-BR', 'en', 'es'] as const;
