import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DashboardContent />;
}

function DashboardContent() {
  const t = useTranslations('admin.dashboard');
  return (
    <main className="min-h-screen bg-[#F0F7FF] p-8">
      <h1 className="text-3xl font-bold text-[#162268]">{t('title')}</h1>
    </main>
  );
}
