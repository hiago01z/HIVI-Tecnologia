'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { fireEvent } from '@/lib/analytics';

export function PageViewTracker() {
  const pathname = usePathname();
  const locale = useLocale();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    fireEvent({
      tipo: 'page_view',
      pagina: pathname,
      locale,
    });
  }, [pathname, locale]);

  return null;
}
