import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { PostEditor } from '@/components/admin/PostEditor';
import type { BlogPost } from '@/types/blog';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    user = null;
  }
  if (!user) redirect(`/${locale}/admin`);

  let post: BlogPost | null = null;
  try {
    const admin = await createAdminClient();
    const { data } = await admin.from('blog_posts').select('*').eq('id', id).single();
    post = data as BlogPost | null;
  } catch {
    post = null;
  }

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'admin.postEditor' });

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-[#162268]">{t('titleLabel')}</h1>
      <PostEditor post={post} />
    </>
  );
}
