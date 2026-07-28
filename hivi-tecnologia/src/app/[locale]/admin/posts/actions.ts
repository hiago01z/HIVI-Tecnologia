'use server';

import { createAdminClient, createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

  if (!id || !UUID_RE.test(id)) return;

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

  if (!id || !UUID_RE.test(id)) return;

  const admin = await createAdminClient();
  await admin
    .from('blog_posts')
    .update({ publicado: !published, atualizado_em: new Date().toISOString() })
    .eq('id', id);

  revalidatePath(`/${locale}/admin/posts`);
  revalidatePath(`/${locale}/blog`);
}
