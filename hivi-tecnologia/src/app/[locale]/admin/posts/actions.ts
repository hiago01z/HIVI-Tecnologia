'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function requireAuth() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data?.user) throw new Error('Unauthorized');
  } catch {
    throw new Error('Unauthorized');
  }
}

export async function deletePostAction(formData: FormData) {
  await requireAuth();
  const id = formData.get('id') as string;
  const locale = (formData.get('locale') as string) || 'pt-BR';

  const admin = await createAdminClient();
  await admin.from('blog_posts').delete().eq('id', id);

  revalidatePath(`/${locale}/admin/posts`);
  revalidatePath(`/${locale}/blog`);
}

export async function togglePublishAction(formData: FormData) {
  await requireAuth();
  const id = formData.get('id') as string;
  const published = formData.get('published') === 'true';
  const locale = (formData.get('locale') as string) || 'pt-BR';

  const admin = await createAdminClient();
  await admin
    .from('blog_posts')
    .update({ publicado: !published, atualizado_em: new Date().toISOString() })
    .eq('id', id);

  revalidatePath(`/${locale}/admin/posts`);
  revalidatePath(`/${locale}/blog`);
}

export type SavePostState =
  | { error: string }
  | { ok: true; locale: string }
  | null;

export async function savePostAction(
  _prevState: SavePostState,
  formData: FormData,
): Promise<SavePostState> {
  try {
    try {
      await requireAuth();
    } catch {
      return { error: 'Sessão expirada. Faça login novamente.' };
    }

    const id = formData.get('id') as string | null;
    const locale = (formData.get('locale') as string) || 'pt-BR';
    const publish = formData.get('publish') === 'true';

    const locales = ['pt-BR', 'en', 'es'] as const;
    const titulo: Record<string, string> = {};
    const slug: Record<string, string> = {};
    const resumo: Record<string, string> = {};
    const conteudo: Record<string, string> = {};

    for (const l of locales) {
      titulo[l] = (formData.get(`titulo_${l}`) as string) || '';
      slug[l] = (formData.get(`slug_${l}`) as string) || '';
      resumo[l] = (formData.get(`resumo_${l}`) as string) || '';
      conteudo[l] = (formData.get(`conteudo_${l}`) as string) || '';
    }

    const imagem_url = (formData.get('imagem_url') as string) || null;

    const payload = {
      titulo,
      slug,
      resumo,
      conteudo,
      imagem_url: imagem_url || null,
      publicado: publish,
      atualizado_em: new Date().toISOString(),
    };

    let dbError: string | null = null;

    try {
      const admin = await createAdminClient();
      if (id) {
        const { error } = await admin.from('blog_posts').update(payload).eq('id', id);
        if (error) dbError = error.message;
      } else {
        const { error } = await admin
          .from('blog_posts')
          .insert({ ...payload, criado_em: new Date().toISOString() });
        if (error) dbError = error.message;
      }
    } catch (err) {
      dbError = err instanceof Error ? err.message : 'Erro desconhecido ao salvar.';
    }

    if (dbError) return { error: dbError };

    revalidatePath(`/${locale}/admin/posts`);
    revalidatePath(`/${locale}/blog`);

    return { ok: true, locale };
  } catch (err) {
    // Captura qualquer exceção inesperada que escaparia silenciosamente
    return { error: err instanceof Error ? err.message : 'Erro inesperado no servidor.' };
  }
}

export async function redirectToPostsAction(locale: string) {
  redirect(`/${locale}/admin/posts`);
}
