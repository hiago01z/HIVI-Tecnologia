import { createClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostPreview } from '@/types/blog';
import type { Locale } from '@/i18n/routing';

export async function getPublishedPosts(locale: Locale): Promise<BlogPostPreview[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, titulo, slug, resumo, imagem_url, publicado, criado_em')
      .eq('publicado', true)
      .order('criado_em', { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      titulo: row.titulo?.[locale] ?? row.titulo?.['pt-BR'] ?? '',
      slug: row.slug?.[locale] ?? row.slug?.['pt-BR'] ?? '',
      resumo: row.resumo?.[locale] ?? row.resumo?.['pt-BR'] ?? '',
      imagem_url: row.imagem_url,
      publicado: row.publicado,
      criado_em: row.criado_em,
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('publicado', true)
      .filter(`slug->>'${locale}'`, 'eq', slug)
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
