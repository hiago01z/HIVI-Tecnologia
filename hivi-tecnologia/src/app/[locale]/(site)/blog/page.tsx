import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations('blog');
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#162268]">{t('sectionTitle')}</h1>
      <p className="mt-4 text-[#4B5563]">{t('noPostsFound')}</p>
    </main>
  );
}
