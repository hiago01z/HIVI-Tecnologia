import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginForm />;
}

function LoginForm() {
  const t = useTranslations('admin.login');

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F7FF] p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-[#162268]">{t('title')}</h1>
        <p className="mt-1 text-center text-sm text-[#4B5563]">{t('subtitle')}</p>
        <p className="mt-8 text-center text-sm text-[#4B5563]">
          {/* Form will be implemented in Fase 6 */}
          Sistema de login — em implementação
        </p>
      </div>
    </main>
  );
}
