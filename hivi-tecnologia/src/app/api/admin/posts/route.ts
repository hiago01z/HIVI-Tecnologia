import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { buildCorsHeaders, handlePreflight, NO_CACHE } from '@/lib/cors';
import { sanitizePostHtml } from '@/lib/sanitize';
import { z } from 'zod';

const localeSchema = z.enum(['pt-BR', 'en', 'es']);
const localeKey = z.enum(['pt-BR', 'en', 'es']);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const savePostSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  locale: localeSchema,
  publish: z.boolean(),
  titles: z.record(localeKey, z.string().min(1).max(255)),
  slugs: z.record(localeKey, z.string().min(1).max(255).regex(SLUG_RE, 'Slug deve conter apenas letras minúsculas, números e hífens')),
  summaries: z.record(localeKey, z.string().max(500)),
  contents: z.record(localeKey, z.string().max(200_000)),
  imagem_url: z.string().url().max(2048).startsWith('https://').nullable().optional(),
});

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request.headers.get('origin'));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const parsed = savePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422, headers: corsHeaders });
    }

    const { id, locale, publish, titles, slugs, summaries, contents, imagem_url } = parsed.data;

    const sanitizedContents = Object.fromEntries(
      Object.entries(contents).map(([k, v]) => [k, sanitizePostHtml(v)]),
    ) as typeof contents;

    const admin = await createAdminClient();

    // Garante que existe uma linha em profiles para este usuário (requisito da FK)
    await admin
      .from('profiles')
      .upsert({ id: authData.user.id }, { onConflict: 'id', ignoreDuplicates: true });

    const payload = {
      titulo: titles,
      slug: slugs,
      resumo: summaries,
      conteudo: sanitizedContents,
      imagem_url: imagem_url ?? null,
      publicado: publish,
      autor_id: authData.user.id,
      atualizado_em: new Date().toISOString(),
    };

    if (id) {
      const { error } = await admin.from('blog_posts').update(payload).eq('id', id);
      if (error) {
        console.error('[/api/admin/posts] update error:', error.code);
        return NextResponse.json({ error: 'Erro ao salvar post.' }, { status: 500, headers: corsHeaders });
      }
    } else {
      const { error } = await admin
        .from('blog_posts')
        .insert({ ...payload, criado_em: new Date().toISOString() });
      if (error) {
        console.error('[/api/admin/posts] insert error:', error.code);
        return NextResponse.json({ error: 'Erro ao salvar post.' }, { status: 500, headers: corsHeaders });
      }
    }

    return NextResponse.json({ ok: true, locale }, { headers: { ...corsHeaders, ...NO_CACHE } });
  } catch (err) {
    console.error('[/api/admin/posts] unexpected error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
