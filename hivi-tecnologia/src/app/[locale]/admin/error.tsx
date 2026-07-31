'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: ErrorProps) {
  const t = useTranslations('adminError');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle size={32} className="text-red-500" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-[#0D1117]">{t('title')}</h2>
      <p className="mt-3 max-w-sm text-[#4B5563]">{t('description')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-[#162268] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111b52]"
        >
          {t('retry')}
        </button>
        <Link
          href="/admin/dashboard"
          className="rounded-lg border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#F8FAFC]"
        >
          {t('backToDashboard')}
        </Link>
      </div>
    </div>
  );
}
