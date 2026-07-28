import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 422 });
    }

    const ext = ALLOWED[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: 'Formato inválido. Use JPG, PNG, WebP ou GIF.' },
        { status: 422 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 2 MB.' }, { status: 422 });
    }

    const path = `${authData.user.id}/avatar.${ext}`;
    const buffer = await file.arrayBuffer();

    const admin = await createAdminClient();

    const { error: uploadError } = await admin.storage
      .from('avatars')
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = admin.storage.from('avatars').getPublicUrl(path);

    // Adiciona cache-bust para forçar reload do avatar após substituição
    const url = `${publicUrl}?t=${Date.now()}`;

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
