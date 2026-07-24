import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PostEditor } from '@/components/admin/PostEditor';

export default async function NovoPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'admin.postEditor' });

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-[#162268]">{t('titleLabel')}</h1>
      <PostEditor />
    </>
  );
}
