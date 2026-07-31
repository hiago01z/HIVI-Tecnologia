'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const LOCALE_SHORT: Record<Locale, string> = {
  'pt-BR': 'PT',
  'en': 'EN',
  'es': 'ES',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');
  const [open, setOpen] = useState(false);

  const switchLocale = (next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax;Secure`;
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t('label')}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#EBF3FF] hover:text-[#1565C0] focus-visible:outline-2 focus-visible:outline-[#1565C0]"
      >
        <Globe size={16} aria-hidden="true" />
        <span>{LOCALE_SHORT[locale]}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label={t('label')}
            className="absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-lg"
          >
            {locales.map((l) => (
              <li key={l} role="option" aria-selected={l === locale}>
                <button
                  type="button"
                  onClick={() => switchLocale(l)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-[#EBF3FF] ${
                    l === locale
                      ? 'font-semibold text-[#1565C0]'
                      : 'text-[#4B5563]'
                  }`}
                >
                  <span className="w-7 text-xs font-bold text-[#1565C0]">
                    {LOCALE_SHORT[l]}
                  </span>
                  <span>{t(l)}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
