import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function NovoPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NovoPostContent />;
}

function NovoPostContent() {
  const t = useTranslations('admin.postEditor');
  return (
    <main className="min-h-screen bg-[#F0F7FF] p-8">
      <h1 className="text-3xl font-bold text-[#162268]">{t('titleLabel')}</h1>
    </main>
  );
}
