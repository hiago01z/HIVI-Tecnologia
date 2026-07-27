'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_LINKS } from '@/constants/navigation';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 text-[#4B5563] transition-colors hover:bg-[#EBF3FF] hover:text-[#1565C0] focus-visible:outline-2 focus-visible:outline-[#1565C0]"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 w-full border-t border-[#E2E8F0] bg-white shadow-lg"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#EBF3FF] text-[#1565C0]'
                      : 'text-[#0D1117] hover:bg-[#EBF3FF] hover:text-[#1565C0]'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-[#E2E8F0] pt-3">
              <Link
                href="/sobre#contato"
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg bg-[#1565C0] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1976D2]"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
