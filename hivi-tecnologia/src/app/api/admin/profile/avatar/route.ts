import { NextResponse, type NextRequest } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { buildCorsHeaders, handlePreflight, NO_CACHE } from '@/lib/cors';
import { checkRateLimit } from '@/lib/rateLimiter';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

// Magic byte signatures for each MIME type
const MAGIC: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
  // WebP: first 4 bytes are RIFF, bytes 8-11 are WEBP
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
};

function hasMagicBytes(buffer: ArrayBuffer, mimeType: string): boolean {
  const bytes = new Uint8Array(buffer);
  const sigs = MAGIC[mimeType];
  if (!sigs) return false;
  const matched = sigs.some((sig) => sig.every((b, i) => bytes[i] === b));
  if (!matched) return false;
  if (mimeType === 'image/webp') {
    if (bytes.length < 12) return false;
    const webp = [0x57, 0x45, 0x42, 0x50];
    return webp.every((b, i) => bytes[8 + i] === b);
  }
  return true;
}

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request.headers.get('origin'));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  // Content-Length pre-check — reject oversized bodies before reading them
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BYTES * 2) {
    return NextResponse.json({ error: 'Arquivo muito grande. Máximo 2 MB.' }, { status: 413, headers: corsHeaders });
  }

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401, headers: corsHeaders });
    }

    // Per-user rate limit: 10 uploads per minute
    const { allowed, retryAfter } = checkRateLimit(`avatar:${authData.user.id}`);
    if (!allowed) {
      return NextResponse.json({ error: 'Muitas requisições. Aguarde antes de tentar novamente.' }, {
        status: 429,
        headers: { ...corsHeaders, 'Retry-After': String(retryAfter ?? 60) },
      });
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

    const buffer = await file.arrayBuffer();

    if (!hasMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: 'Arquivo inválido. O conteúdo não corresponde ao tipo declarado.' },
        { status: 422, headers: corsHeaders },
      );
    }

    const path = `${authData.user.id}/avatar.${ext}`;

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

    return NextResponse.json({ url }, { headers: { ...corsHeaders, ...NO_CACHE } });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
