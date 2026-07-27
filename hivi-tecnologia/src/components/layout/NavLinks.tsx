'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_LINKS } from '@/constants/navigation';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function NavLinks() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <>
      {NAV_LINKS.map(({ key, href }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-[#EBF3FF] text-[#1565C0]'
                : 'text-[#4B5563] hover:bg-[#EBF3FF] hover:text-[#1565C0]'
            }`}
          >
            {t(key)}
          </Link>
        );
      })}
    </>
  );
}
