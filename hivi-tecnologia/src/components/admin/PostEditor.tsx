'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { savePostAction } from '@/app/[locale]/admin/posts/actions';
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

function SaveButtons() {
  const t = useTranslations('admin.postEditor');
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        name="publish"
        value="false"
        disabled={pending}
        className="rounded-lg border border-[#162268] px-5 py-2.5 text-sm font-semibold text-[#162268] transition-colors hover:bg-[#EBF3FF] disabled:opacity-60"
      >
        {pending ? t('saving') : t('save')}
      </button>
      <button
        type="submit"
        name="publish"
        value="true"
        disabled={pending}
        className="rounded-lg bg-[#162268] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0] disabled:opacity-60"
      >
        {pending ? t('saving') : t('saveAndPublish')}
      </button>
    </div>
  );
}

interface Props {
  post?: BlogPost;
}

export function PostEditor({ post }: Props) {
  const t = useTranslations('admin.postEditor');
  const tLang = useTranslations('languageSwitcher');
  const locale = useLocale() as Locale;
  const router = useRouter();

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

  const [state, formAction] = useActionState(savePostAction, null);

  // Navigate on the client after a successful save — redirect() inside
  // useActionState actions does not reliably navigate in Next.js 16.
  useEffect(() => {
    if (state && 'ok' in state && state.ok) {
      router.push(`/${state.locale}/admin/posts`);
      router.refresh();
    }
  }, [state, router]);

  const handleTitleChange = (l: Locale, value: string) => {
    setTitles((prev) => ({ ...prev, [l]: value }));
    if (!slugs[l] || slugs[l] === slugify(titles[l])) {
      setSlugs((prev) => ({ ...prev, [l]: slugify(value) }));
    }
  };

  const inputCls = 'w-full rounded-lg border border-[#CBD5E1] px-4 py-2.5 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20';
  const labelCls = 'mb-1.5 block text-sm font-medium text-[#0D1117]';

  const hasError = state && 'error' in state;

  return (
    <form action={formAction} noValidate className="space-y-8">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="locale" value={locale} />

      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>{t('errorPrefix')}</strong> {state.error}
        </div>
      )}

      {/* Hidden fields for all locales */}
      {LOCALES.map((l) => (
        <span key={l}>
          <input type="hidden" name={`titulo_${l}`} value={titles[l]} />
          <input type="hidden" name={`slug_${l}`} value={slugs[l]} />
          <input type="hidden" name={`resumo_${l}`} value={summaries[l]} />
          <input type="hidden" name={`conteudo_${l}`} value={contents[l]} />
        </span>
      ))}

      {/* Locale tabs */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex gap-2 border-b border-[#F1F5F9] pb-4">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveTab(l)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === l
                  ? 'bg-[#162268] text-white'
                  : 'text-[#4B5563] hover:bg-[#EBF3FF]'
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

      {/* Image URL (shared) */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <label className={labelCls}>{t('imageLabel')}</label>
        <input
          type="text"
          name="imagem_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={inputCls}
          placeholder={t('imagePlaceholder')}
        />
        {imageUrl && (
          <img src={imageUrl} alt="" className="mt-3 h-40 w-full rounded-lg object-cover" />
        )}
      </div>

      <div className="flex justify-end">
        <SaveButtons />
      </div>
    </form>
  );
}
