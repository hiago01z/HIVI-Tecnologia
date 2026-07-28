'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BlogSearch({ initialQuery = '' }: { initialQuery?: string }) {
  const t = useTranslations('blog');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep input in sync if browser navigation changes the URL
  useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  const push = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q.trim()) {
        params.set('q', q.trim());
        params.delete('page');
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => push(next), 350);
  };

  const handleClear = () => {
    setValue('');
    if (timerRef.current) clearTimeout(timerRef.current);
    push('');
  };

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 text-[#94A3B8]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchLabel')}
          className="w-full rounded-full border border-white/60 bg-white/80 py-3 pl-11 pr-11 text-sm text-[#0D1117] shadow-sm outline-none backdrop-blur-sm placeholder:text-[#94A3B8] focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={t('searchClear')}
            className="absolute right-4 rounded-full text-[#94A3B8] transition-colors hover:text-[#374151]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
