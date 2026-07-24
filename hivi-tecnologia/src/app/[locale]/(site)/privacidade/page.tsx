import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacidadeContent />;
}

function PrivacidadeContent() {
  const t = useTranslations('privacy');
  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#162268]">{t('title')}</h1>
      <p className="mt-6 text-[#4B5563]">{t('intro')}</p>
    </main>
  );
}
