import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPublishedPosts } from '@/lib/blog';
import type { Locale } from '@/i18n/routing';
import type { Metadata } from 'next';
import { CalendarDays, ArrowRight } from 'lucide-react';
import type { BlogPostPreview } from '@/types/blog';

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPublishedPosts(locale as Locale);

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} locale={locale} />
    </>
  );
}

function BlogHero() {
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
        <div className="aspect-video overflow-hidden bg-[#EBF3FF]">
          <img
            src={post.imagem_url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
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

function BlogGrid({ posts, locale }: { posts: BlogPostPreview[]; locale: string }) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#4B5563]">{t('noPostsFound')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
