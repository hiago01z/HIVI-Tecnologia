import { createClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostPreview, PostAutor } from '@/types/blog';
import type { Locale } from '@/i18n/routing';

export const POSTS_PER_PAGE = 9;

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

async function fetchAutores(
  supabase: Awaited<ReturnType<typeof createClient>>,
  autorIds: (string | null)[],
): Promise<Map<string, PostAutor>> {
  const ids = autorIds.filter((id): id is string => Boolean(id));
  if (ids.length === 0) return new Map();

  const { data } = await supabase
    .from('profiles')
    .select('id, nome, foto_url')
    .in('id', ids);

  const map = new Map<string, PostAutor>();
  for (const row of data ?? []) {
    map.set(row.id, { nome: row.nome, foto_url: row.foto_url });
  }
  return map;
}

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
      .select('id, titulo, slug, resumo, imagem_url, publicado, criado_em, autor_id', { count: 'exact' })
      .eq('publicado', true)
      .order('criado_em', { ascending: false })
      .range(from, to);

    if (error || !data) return { posts: [], total: 0 };

    const autores = await fetchAutores(supabase, data.map((r) => r.autor_id));

    return {
      posts: data.map((row) => ({
        id: row.id,
        titulo: row.titulo?.[locale] ?? row.titulo?.['pt-BR'] ?? '',
        slug: row.slug?.[locale] ?? row.slug?.['pt-BR'] ?? '',
        resumo: row.resumo?.[locale] ?? row.resumo?.['pt-BR'] ?? '',
        imagem_url: row.imagem_url,
        publicado: row.publicado,
        criado_em: row.criado_em,
        autor: row.autor_id ? (autores.get(row.autor_id) ?? null) : null,
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

    const post = data as BlogPost;

    if (post.autor_id) {
      const autores = await fetchAutores(supabase, [post.autor_id]);
      post.autor = autores.get(post.autor_id) ?? null;
    }

    return post;
  } catch {
    return null;
  }
}

export async function searchPosts(locale: Locale, query: string): Promise<BlogPostPreview[]> {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, titulo, slug, resumo, imagem_url, publicado, criado_em, autor_id')
      .eq('publicado', true)
      .order('criado_em', { ascending: false })
      .limit(500);

    if (error || !data) return [];

    const filtered = data.filter((row) => {
      const haystack = normalizeText(
        [
          row.titulo?.['pt-BR'] ?? '',
          row.titulo?.['en'] ?? '',
          row.titulo?.['es'] ?? '',
          row.resumo?.['pt-BR'] ?? '',
          row.resumo?.['en'] ?? '',
          row.resumo?.['es'] ?? '',
        ].join(' '),
      );
      return terms.every((term) => haystack.includes(term));
    });

    const autores = await fetchAutores(supabase, filtered.map((r) => r.autor_id));

    return filtered.map((row) => ({
      id: row.id,
      titulo: row.titulo?.[locale] ?? row.titulo?.['pt-BR'] ?? '',
      slug: row.slug?.[locale] ?? row.slug?.['pt-BR'] ?? '',
      resumo: row.resumo?.[locale] ?? row.resumo?.['pt-BR'] ?? '',
      imagem_url: row.imagem_url,
      publicado: row.publicado,
      criado_em: row.criado_em,
      autor: row.autor_id ? (autores.get(row.autor_id) ?? null) : null,
    }));
  } catch {
    return [];
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
