import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ProfileEditor } from '@/components/admin/ProfileEditor';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin.profile' });

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-[#162268]">{t('title')}</h1>
      <ProfileEditor />
    </>
  );
}
