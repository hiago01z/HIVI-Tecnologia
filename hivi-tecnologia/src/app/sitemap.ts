import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivi.com.br';

const PUBLIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/servicos', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/sobre', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/privacidade', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PUBLIC_ROUTES) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
          ),
        },
      });
    }
  }

  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, atualizado_em')
      .eq('publicado', true);

    for (const post of posts ?? []) {
      const slugsByLocale = post.slug as Record<string, string>;
      const lastMod = post.atualizado_em ? new Date(post.atualizado_em) : now;

      for (const locale of routing.locales) {
        const slug = slugsByLocale[locale] ?? slugsByLocale['pt-BR'];
        if (!slug) continue;

        entries.push({
          url: `${siteUrl}/${locale}/blog/${slug}`,
          lastModified: lastMod,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              routing.locales
                .filter((l) => slugsByLocale[l])
                .map((l) => [l, `${siteUrl}/${l}/blog/${slugsByLocale[l]}`]),
            ),
          },
        });
      }
    }
  } catch {
    // Se o banco não estiver disponível, retorna apenas rotas estáticas
  }

  return entries;
}
