'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: ErrorProps) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle size={32} className="text-red-500" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-[#0D1117]">{t('title')}</h1>
      <p className="mt-3 max-w-sm text-[#4B5563]">{t('description')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-[#1565C0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1255A8]"
        >
          {t('retry')}
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#F8FAFC]"
        >
          {t('backHome')}
        </Link>
      </div>
    </main>
  );
}
