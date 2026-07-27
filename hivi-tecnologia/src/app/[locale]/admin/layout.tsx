import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/navigation';
import { logoutAction } from './actions';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
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

  if (!user) {
    return <>{children}</>;
  }

  const t = await getTranslations({ locale, namespace: 'admin.nav' }).catch(() => null);
  if (!t) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      <nav className="sticky top-0 z-40 border-b border-[#162268]/10 bg-[#162268] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/admin/dashboard" className="text-xl font-extrabold tracking-tight text-white">
            HIVI<span className="text-[#5BA4E5]">.</span>
            <span className="ml-2 text-xs font-normal text-white/60">Admin</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t('dashboard')}
            </Link>
            <Link
              href="/admin/posts"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t('posts')}
            </Link>
            <Link
              href="/admin/contatos"
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t('contatos')}
            </Link>

            <form action={logoutAction} className="ml-2">
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t('logout')}
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
