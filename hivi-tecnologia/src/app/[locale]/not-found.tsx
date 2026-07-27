import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-8 py-32 text-center">
        <p className="text-7xl font-extrabold text-[#1565C0]" aria-hidden="true">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-[#0D1117]">{t('title')}</h1>
        <p className="mt-2 text-[#4B5563]">{t('description')}</p>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-[#1565C0] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1976D2]"
        >
          {t('backHome')}
        </Link>
      </main>
      <Footer />
    </>
  );
}
