import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPublishedPosts, searchPosts, POSTS_PER_PAGE } from '@/lib/blog';
import type { Locale } from '@/i18n/routing';
import type { Metadata } from 'next';
import { CalendarDays, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPostPreview } from '@/types/blog';
import { Suspense } from 'react';
import { BlogSearch } from '@/components/blog/BlogSearch';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('sectionTitle'),
    description: t('sectionSubtitle'),
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam, q } = await searchParams;
  setRequestLocale(locale);

  const query = (q ?? '').trim().slice(0, 200);
  const isSearching = query.length > 0;

  let posts: BlogPostPreview[];
  let total: number;
  let totalPages: number;
  let page: number;

  if (isSearching) {
    const results = await searchPosts(locale as Locale, query);
    posts = results;
    total = results.length;
    totalPages = 1;
    page = 1;
  } else {
    page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);
    const result = await getPublishedPosts(locale as Locale, page);
    posts = result.posts;
    total = result.total;
    totalPages = Math.ceil(total / POSTS_PER_PAGE);
  }

  return (
    <>
      <BlogHero initialQuery={query} />
      <BlogGrid
        posts={posts}
        locale={locale}
        page={page}
        totalPages={totalPages}
        isSearching={isSearching}
        query={query}
        total={total}
      />
    </>
  );
}

function BlogHero({ initialQuery }: { initialQuery: string }) {
  const t = useTranslations('blog');
  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(135deg, #F0F7FF 0%, #C8DFFF 60%, #9EC8FF 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#0D1117] lg:text-5xl">
          {t('sectionTitle')}
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#4B5563]">
          {t('sectionSubtitle')}
        </p>
        <Suspense>
          <BlogSearch initialQuery={initialQuery} />
        </Suspense>
      </div>
    </section>
  );
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}

function BlogCard({ post, locale }: { post: BlogPostPreview; locale: string }) {
  const t = useTranslations('blog');
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
      {post.imagem_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post.imagem_url}
          alt={post.titulo}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="aspect-video bg-gradient-to-br from-[#EBF3FF] to-[#C8DFFF]" aria-hidden="true" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <CalendarDays size={13} aria-hidden="true" />
          <time dateTime={post.criado_em}>{formatDate(post.criado_em, locale)}</time>
        </div>

        <h2 className="mt-3 text-lg font-semibold leading-snug text-[#0D1117] group-hover:text-[#1565C0] transition-colors">
          {post.titulo}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4B5563] line-clamp-3">
          {post.resumo}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1565C0] hover:gap-2.5 transition-all"
          aria-label={`${t('readMore')}: ${post.titulo}`}
        >
          {t('readMore')}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function BlogGrid({
  posts,
  locale,
  page,
  totalPages,
  isSearching,
  query,
  total,
}: {
  posts: BlogPostPreview[];
  locale: string;
  page: number;
  totalPages: number;
  isSearching: boolean;
  query: string;
  total: number;
}) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#4B5563]">
            {isSearching ? t('noSearchResults', { query }) : t('noPostsFound')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isSearching && (
          <p className="mb-8 text-sm text-[#4B5563]">
            {t('searchResultsCount', { count: total, query })}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>

        {!isSearching && totalPages > 1 && (
          <nav
            className="mt-16 flex items-center justify-center gap-2"
            aria-label={t('pagination')}
          >
            <Link
              href={page > 2 ? `/blog?page=${page - 1}` : '/blog'}
              aria-label={t('prevPage')}
              aria-disabled={page <= 1}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                page <= 1
                  ? 'pointer-events-none border-[#E2E8F0] text-[#CBD5E1]'
                  : 'border-[#E2E8F0] text-[#4B5563] hover:border-[#1565C0] hover:text-[#1565C0]'
              }`}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={p === 1 ? '/blog' : `/blog?page=${p}`}
                aria-label={t('goToPage', { page: p })}
                aria-current={p === page ? 'page' : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-[#1565C0] text-white'
                    : 'text-[#4B5563] hover:bg-[#EBF3FF] hover:text-[#1565C0]'
                }`}
              >
                {p}
              </Link>
            ))}

            <Link
              href={`/blog?page=${page + 1}`}
              aria-label={t('nextPage')}
              aria-disabled={page >= totalPages}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                page >= totalPages
                  ? 'pointer-events-none border-[#E2E8F0] text-[#CBD5E1]'
                  : 'border-[#E2E8F0] text-[#4B5563] hover:border-[#1565C0] hover:text-[#1565C0]'
              }`}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </nav>
        )}
      </div>
    </section>
  );
}
