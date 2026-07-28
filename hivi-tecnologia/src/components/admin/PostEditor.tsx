'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useTransition, useEffect, useRef } from 'react';
import { savePostAction } from '@/app/[locale]/admin/posts/actions';
import type { SavePostState } from '@/app/[locale]/admin/posts/actions';
import type { BlogPost } from '@/types/blog';
import type { Locale } from '@/i18n/routing';

const LOCALES: Locale[] = ['pt-BR', 'en', 'es'];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

interface Props {
  post?: BlogPost;
}

export function PostEditor({ post }: Props) {
  const t = useTranslations('admin.postEditor');
  const tLang = useTranslations('languageSwitcher');
  const locale = useLocale() as Locale;

  const [activeTab, setActiveTab] = useState<Locale>(locale);
  const [titles, setTitles] = useState<Record<Locale, string>>(
    LOCALES.reduce((acc, l) => ({ ...acc, [l]: post?.titulo[l] ?? '' }), {} as Record<Locale, string>),
  );
  const [slugs, setSlugs] = useState<Record<Locale, string>>(
    LOCALES.reduce((acc, l) => ({ ...acc, [l]: post?.slug[l] ?? '' }), {} as Record<Locale, string>),
  );
  const [summaries, setSummaries] = useState<Record<Locale, string>>(
    LOCALES.reduce((acc, l) => ({ ...acc, [l]: post?.resumo[l] ?? '' }), {} as Record<Locale, string>),
  );
  const [contents, setContents] = useState<Record<Locale, string>>(
    LOCALES.reduce((acc, l) => ({ ...acc, [l]: post?.conteudo[l] ?? '' }), {} as Record<Locale, string>),
  );
  const [imageUrl, setImageUrl] = useState(post?.imagem_url ?? '');

  const [actionState, setActionState] = useState<SavePostState>(null);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (!actionState) return;
    if ('ok' in actionState && actionState.ok && !navigatingRef.current) {
      navigatingRef.current = true;
      setToast('Salvo com sucesso! Redirecionando...');
      setTimeout(() => {
        window.location.assign(`/${actionState.locale}/admin/posts`);
      }, 800);
    }
    if ('error' in actionState) {
      setToast(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [actionState]);

  const handleSave = (publish: boolean) => {
    if (isPending || navigatingRef.current) return;

    const formData = new FormData();
    if (post?.id) formData.set('id', post.id);
    formData.set('locale', locale);
    formData.set('publish', String(publish));
    for (const l of LOCALES) {
      formData.set(`titulo_${l}`, titles[l]);
      formData.set(`slug_${l}`, slugs[l]);
      formData.set(`resumo_${l}`, summaries[l]);
      formData.set(`conteudo_${l}`, contents[l]);
    }
    formData.set('imagem_url', imageUrl);

    startTransition(async () => {
      try {
        const result = await savePostAction(null, formData);
        setActionState(result);
      } catch (err) {
        setActionState({ error: err instanceof Error ? err.message : 'Erro inesperado ao salvar.' });
      }
    });
  };

  const handleTitleChange = (l: Locale, value: string) => {
    setTitles((prev) => ({ ...prev, [l]: value }));
    if (!slugs[l] || slugs[l] === slugify(titles[l])) {
      setSlugs((prev) => ({ ...prev, [l]: slugify(value) }));
    }
  };

  const inputCls = 'w-full rounded-lg border border-[#CBD5E1] px-4 py-2.5 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20';
  const labelCls = 'mb-1.5 block text-sm font-medium text-[#0D1117]';

  const hasError = actionState && 'error' in actionState;

  return (
    <>
      {hasError && (
        <div className="fixed left-0 right-0 top-0 z-[9999] flex items-center gap-3 bg-red-600 px-6 py-4 text-white shadow-lg">
          <strong className="shrink-0">{t('errorPrefix')}</strong>
          <span className="flex-1 text-sm">{actionState.error}</span>
          <button
            type="button"
            onClick={() => setActionState(null)}
            className="shrink-0 rounded bg-red-700 px-3 py-1 text-xs hover:bg-red-800"
          >
            {t('close')}
          </button>
        </div>
      )}
      {toast && (
        <div className="fixed left-0 right-0 top-0 z-[9999] flex items-center gap-3 bg-green-600 px-6 py-4 text-white shadow-lg">
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="space-y-8">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 flex gap-2 border-b border-[#F1F5F9] pb-4">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveTab(l)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === l ? 'bg-[#162268] text-white' : 'text-[#4B5563] hover:bg-[#EBF3FF]'
                }`}
              >
                {tLang(l)}
              </button>
            ))}
          </div>

          {LOCALES.map((l) => (
            <div key={l} className={l === activeTab ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>{t('titleLabel')}</label>
                  <input
                    type="text"
                    value={titles[l]}
                    onChange={(e) => handleTitleChange(l, e.target.value)}
                    className={inputCls}
                    placeholder={tLang(l)}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t('slugLabel')}</label>
                  <input
                    type="text"
                    value={slugs[l]}
                    onChange={(e) => setSlugs((prev) => ({ ...prev, [l]: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t('summaryLabel')}</label>
                  <textarea
                    rows={3}
                    value={summaries[l]}
                    onChange={(e) => setSummaries((prev) => ({ ...prev, [l]: e.target.value }))}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t('contentLabel')}</label>
                  <textarea
                    rows={16}
                    value={contents[l]}
                    onChange={(e) => setContents((prev) => ({ ...prev, [l]: e.target.value }))}
                    className={`${inputCls} font-mono text-xs`}
                    placeholder={t('contentPlaceholder')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <label className={labelCls}>{t('imageLabel')}</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={inputCls}
            placeholder={t('imagePlaceholder')}
          />
          {imageUrl && (
            <img src={imageUrl} alt="" className="mt-3 h-40 w-full rounded-lg object-cover" />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isPending || navigatingRef.current}
            className="rounded-lg border border-[#162268] px-5 py-2.5 text-sm font-semibold text-[#162268] transition-colors hover:bg-[#EBF3FF] disabled:opacity-60"
          >
            {isPending ? t('saving') : t('save')}
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isPending || navigatingRef.current}
            className="rounded-lg bg-[#162268] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0] disabled:opacity-60"
          >
            {isPending ? t('saving') : t('saveAndPublish')}
          </button>
        </div>
      </div>
    </>
  );
}
