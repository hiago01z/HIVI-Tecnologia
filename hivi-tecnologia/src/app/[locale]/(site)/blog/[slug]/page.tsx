import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPostBySlug } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import type { Metadata } from 'next';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) return {};

  const titulo = post.titulo[locale as Locale] ?? post.titulo['pt-BR'];
  const resumo = post.resumo[locale as Locale] ?? post.resumo['pt-BR'];

  return {
    title: titulo,
    description: resumo,
    openGraph: {
      title: titulo,
      description: resumo,
      type: 'article',
      publishedTime: post.criado_em,
      ...(post.imagem_url ? { images: [{ url: post.imagem_url }] } : {}),
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/blog/${post.slug[l] ?? post.slug['pt-BR']}`]),
      ),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  return <PostContent post={post} locale={locale as Locale} />;
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}

function PostContent({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = useTranslations('blog');
  const titulo = post.titulo[locale] ?? post.titulo['pt-BR'];
  const conteudo = post.conteudo[locale] ?? post.conteudo['pt-BR'];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1565C0] hover:gap-3 transition-all mb-10"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {t('backToBlog')}
      </Link>

      <header className="mb-10">
        {post.imagem_url && (
          <div className="mb-8 overflow-hidden rounded-2xl aspect-video">
            <img
              src={post.imagem_url}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <CalendarDays size={14} aria-hidden="true" />
          <time dateTime={post.criado_em}>
            {t('publishedOn')} {formatDate(post.criado_em, locale)}
          </time>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-[#0D1117] lg:text-4xl leading-tight">
          {titulo}
        </h1>

        <div className="mt-4 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0D1117] prose-a:text-[#1565C0] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: conteudo }}
      />
    </article>
  );
}
