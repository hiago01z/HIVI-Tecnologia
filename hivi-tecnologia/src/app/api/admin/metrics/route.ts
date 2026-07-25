import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const since = request.nextUrl.searchParams.get('since');
  if (!since) return NextResponse.json({ error: 'Missing since' }, { status: 400 });

  const admin = await createAdminClient();
  const { data, error } = await admin
    .from('eventos')
    .select('tipo')
    .gte('criado_em', since);

  if (error) return NextResponse.json({ error: 'Internal error' }, { status: 500 });

  const counts = {
    page_view: 0,
    click_contato: 0,
    click_whatsapp: 0,
    click_servico: 0,
  };

  (data ?? []).forEach(({ tipo }: { tipo: string }) => {
    if (tipo in counts) counts[tipo as keyof typeof counts]++;
  });

  const { count: totalContacts } = await admin
    .from('contatos')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({ ...counts, totalContacts: totalContacts ?? 0 });
}
