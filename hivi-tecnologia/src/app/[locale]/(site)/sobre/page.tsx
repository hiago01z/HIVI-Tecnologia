import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SobreContent />;
}

function SobreContent() {
  const t = useTranslations('about');
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#162268]">{t('sectionTitle')}</h1>
    </main>
  );
}
