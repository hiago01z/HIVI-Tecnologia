import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createAdminClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Contatos' };
}

interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  mensagem: string;
  locale: string;
  consentimento_lgpd: boolean;
  criado_em: string;
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export default async function AdminContatosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    user = null;
  }
  if (!user) redirect(`/${locale}/admin`);

  const t = await getTranslations({ locale, namespace: 'admin.contatos' });

  let contatos: Contato[] | null = null;
  try {
    const admin = await createAdminClient();
    const { data } = await admin
      .from('contatos')
      .select('id, nome, email, telefone, mensagem, locale, consentimento_lgpd, criado_em')
      .order('criado_em', { ascending: false });
    contatos = data as Contato[] | null;
  } catch {
    contatos = null;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D1117]">{t('title')}</h1>
          <p className="mt-1 text-sm text-[#4B5563]">
            {contatos?.length ?? 0} {t('totalContacts')}
          </p>
        </div>
      </div>

      {!contatos || contatos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-white p-16 text-center">
          <MessageSquare size={40} className="mx-auto text-[#CBD5E1]" />
          <p className="mt-4 text-[#4B5563]">{t('noContacts')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(contatos as Contato[]).map((c) => (
            <article
              key={c.id}
              className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h2 className="font-semibold text-[#0D1117]">{c.nome}</h2>
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1.5 text-sm text-[#1565C0] hover:underline"
                  >
                    <Mail size={13} aria-hidden="true" />
                    {c.email}
                  </a>
                  {c.telefone && (
                    <a
                      href={`tel:${c.telefone}`}
                      className="flex items-center gap-1.5 text-sm text-[#4B5563] hover:underline"
                    >
                      <Phone size={13} aria-hidden="true" />
                      {c.telefone}
                    </a>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-[#4B5563]">
                  <time dateTime={c.criado_em}>{formatDate(c.criado_em, locale)}</time>
                  <span className="rounded-full bg-[#EBF3FF] px-2 py-0.5 font-medium uppercase text-[#1565C0]">
                    {c.locale}
                  </span>
                  {c.consentimento_lgpd && (
                    <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 font-medium text-[#166534]">
                      {t('lgpdConsent')}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 border-t border-[#F1F5F9] pt-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#4B5563]">
                  {c.mensagem}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
