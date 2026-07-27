'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const ADMIN_LINKS = [
  { key: 'dashboard', href: '/admin/dashboard' as const },
  { key: 'posts', href: '/admin/posts' as const },
  { key: 'contatos', href: '/admin/contatos' as const },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + '/');
}

export function AdminNavLinks() {
  const t = useTranslations('admin.nav');
  const pathname = usePathname();

  return (
    <>
      {ADMIN_LINKS.map(({ key, href }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {t(key)}
          </Link>
        );
      })}
    </>
  );
}
