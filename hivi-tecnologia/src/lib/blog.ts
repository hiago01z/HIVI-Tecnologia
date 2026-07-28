import { createClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostPreview } from '@/types/blog';
import type { Locale } from '@/i18n/routing';

export const POSTS_PER_PAGE = 9;

export async function getPublishedPosts(
  locale: Locale,
  page = 1,
  perPage = POSTS_PER_PAGE,
): Promise<{ posts: BlogPostPreview[]; total: number }> {
  try {
    const supabase = await createClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('id, titulo, slug, resumo, imagem_url, publicado, criado_em', { count: 'exact' })
      .eq('publicado', true)
      .order('criado_em', { ascending: false })
      .range(from, to);

    if (error || !data) return { posts: [], total: 0 };

    return {
      posts: data.map((row) => ({
        id: row.id,
        titulo: row.titulo?.[locale] ?? row.titulo?.['pt-BR'] ?? '',
        slug: row.slug?.[locale] ?? row.slug?.['pt-BR'] ?? '',
        resumo: row.resumo?.[locale] ?? row.resumo?.['pt-BR'] ?? '',
        imagem_url: row.imagem_url,
        publicado: row.publicado,
        criado_em: row.criado_em,
      })),
      total: count ?? 0,
    };
  } catch {
    return { posts: [], total: 0 };
  }
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('publicado', true)
      .contains('slug', { [locale]: slug })
      .single();

    if (error || !data) return null;

    return data as BlogPost;
  } catch {
    return null;
  }
}

export async function getAllSlugsForLocale(locale: Locale): Promise<string[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('publicado', true);

    if (error || !data) return [];

    return data
      .map((row) => row.slug?.[locale] ?? row.slug?.['pt-BR'])
      .filter(Boolean) as string[];
  } catch {
    return [];
  }
}
