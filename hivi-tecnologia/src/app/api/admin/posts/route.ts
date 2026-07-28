import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { z } from 'zod';

const localeSchema = z.enum(['pt-BR', 'en', 'es']);
const localesShape = z.record(z.enum(['pt-BR', 'en', 'es']), z.string());

const savePostSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  locale: localeSchema,
  publish: z.boolean(),
  titles: localesShape,
  slugs: localesShape,
  summaries: localesShape,
  contents: localesShape,
  imagem_url: z.string().max(2048).nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = savePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos', detail: parsed.error.message }, { status: 422 });
    }

    const { id, locale, publish, titles, slugs, summaries, contents, imagem_url } = parsed.data;

    const payload = {
      titulo: titles,
      slug: slugs,
      resumo: summaries,
      conteudo: contents,
      imagem_url: imagem_url ?? null,
      publicado: publish,
      atualizado_em: new Date().toISOString(),
    };

    const admin = await createAdminClient();

    let dbError: string | null = null;

    if (id) {
      const { error } = await admin.from('blog_posts').update(payload).eq('id', id);
      if (error) dbError = error.message;
    } else {
      const { error } = await admin
        .from('blog_posts')
        .insert({ ...payload, criado_em: new Date().toISOString() });
      if (error) dbError = error.message;
    }

    if (dbError) {
      console.error('[/api/admin/posts] supabase error:', dbError);
      return NextResponse.json({ error: dbError }, { status: 500 });
    }

    return NextResponse.json({ ok: true, locale });
  } catch (err) {
    console.error('[/api/admin/posts] unexpected error:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
