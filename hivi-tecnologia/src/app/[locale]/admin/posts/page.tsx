import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function AdminPostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PostsContent />;
}

function PostsContent() {
  const t = useTranslations('admin.posts');
  return (
    <main className="min-h-screen bg-[#F0F7FF] p-8">
      <h1 className="text-3xl font-bold text-[#162268]">{t('title')}</h1>
      <p className="mt-4 text-[#4B5563]">{t('noPosts')}</p>
    </main>
  );
}
