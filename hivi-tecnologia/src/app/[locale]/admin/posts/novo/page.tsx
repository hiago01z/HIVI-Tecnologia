import { setRequestLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PostEditor } from '@/components/admin/PostEditor';

export default async function NovoPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

  const t = await getTranslations({ locale, namespace: 'admin.postEditor' });

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-[#162268]">{t('titleLabel')}</h1>
      <PostEditor />
    </>
  );
}
