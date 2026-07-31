import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { buildCorsHeaders, handlePreflight } from '@/lib/cors';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

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

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 422, headers: corsHeaders });
    }

    const ext = ALLOWED[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: 'Formato inválido. Use JPG, PNG, WebP ou GIF.' },
        { status: 422, headers: corsHeaders },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 2 MB.' }, { status: 422, headers: corsHeaders });
    }

    const path = `${authData.user.id}/avatar.${ext}`;
    const buffer = await file.arrayBuffer();

    const admin = await createAdminClient();

    const { error: uploadError } = await admin.storage
      .from('avatars')
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error('[/api/admin/profile/avatar] upload error:', uploadError.message);
      return NextResponse.json({ error: 'Falha no upload. Tente novamente.' }, { status: 500, headers: corsHeaders });
    }

    const { data: { publicUrl } } = admin.storage.from('avatars').getPublicUrl(path);

    // Cache-bust to force reload after replacement
    const url = `${publicUrl}?t=${Date.now()}`;

    return NextResponse.json({ url }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
