import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/navigation';
import { redirect } from 'next/navigation';
import { togglePublishAction } from './actions';
import { DeletePostButton } from './DeletePostButton';
import type { Locale } from '@/i18n/routing';
import { PlusCircle } from 'lucide-react';

interface Post {
  id: string;
  titulo: Record<string, string>;
  publicado: boolean;
  criado_em: string;
}

export default async function AdminPostsPage({
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

  const t = await getTranslations({ locale, namespace: 'admin.posts' });

  let posts: Post[] | null = null;
  try {
    const admin = await createAdminClient();
    const { data } = await admin
      .from('blog_posts')
      .select('id, titulo, publicado, criado_em')
      .order('criado_em', { ascending: false });
    posts = data as Post[] | null;
  } catch {
    posts = null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#162268]">{t('title')}</h1>
        <Link
          href="/admin/posts/novo"
          className="inline-flex items-center gap-2 rounded-lg bg-[#162268] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0]"
        >
          <PlusCircle size={16} aria-hidden="true" />
          {t('newPost')}
        </Link>
      </div>

      {(!posts || posts.length === 0) ? (
        <p className="mt-10 text-center text-[#4B5563]">{t('noPosts')}</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="min-w-full divide-y divide-[#F1F5F9]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  {t('colTitle')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  {t('colStatus')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  {t('colDate')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  {t('colActions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {(posts as Post[]).map((post) => {
                const titulo = post.titulo?.[locale as Locale] ?? post.titulo?.['pt-BR'] ?? '—';
                const date = new Date(post.criado_em).toLocaleDateString(locale, {
                  year: 'numeric', month: 'short', day: 'numeric',
                });

                return (
                  <tr key={post.id} className="hover:bg-[#F8FAFC]">
                    <td className="max-w-xs truncate px-6 py-4 text-sm font-medium text-[#0D1117]">
                      {titulo}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          post.publicado
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.publicado ? t('published') : t('draft')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">{date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#1565C0] hover:bg-[#EBF3FF]"
                        >
                          {t('edit')}
                        </Link>

                        <form action={togglePublishAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <input type="hidden" name="published" value={String(post.publicado)} />
                          <input type="hidden" name="locale" value={locale} />
                          <button
                            type="submit"
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-[#F1F5F9]"
                          >
                            {post.publicado ? t('unpublish') : t('publish')}
                          </button>
                        </form>

                        <DeletePostButton postId={post.id} locale={locale} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
