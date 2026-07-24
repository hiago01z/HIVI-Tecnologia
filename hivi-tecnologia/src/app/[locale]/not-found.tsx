import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-[#162268]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-[#0D1117]">{t('title')}</h2>
      <p className="mt-2 text-[#4B5563]">{t('description')}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[#1565C0] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1976D2]"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
