import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { PostEditor } from '@/components/admin/PostEditor';
import type { BlogPost } from '@/types/blog';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const admin = await createAdminClient();
  const { data } = await admin.from('blog_posts').select('*').eq('id', id).single();

  if (!data) notFound();

  const t = await getTranslations({ locale, namespace: 'admin.postEditor' });

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-[#162268]">{t('titleLabel')}</h1>
      <PostEditor post={data as BlogPost} />
    </>
  );
}
