'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { loginAction } from './actions';
import { useActionState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('admin.login');
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-lg bg-[#162268] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0] disabled:opacity-60"
    >
      {pending ? t('submitting') : t('submit')}
    </button>
  );
}

export default function AdminLoginPage() {
  const t = useTranslations('admin.login');
  const locale = useLocale();
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F7FF] p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <span className="text-2xl font-extrabold tracking-tight text-[#162268]">
            HIVI<span className="text-[#1565C0]"> Tecnologia</span>
          </span>
          <h1 className="mt-3 text-xl font-bold text-[#0D1117]">{t('title')}</h1>
          <p className="mt-1 text-sm text-[#4B5563]">{t('subtitle')}</p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <input type="hidden" name="locale" value={locale} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="email">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-[#CBD5E1] px-4 py-3 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="password">
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-[#CBD5E1] px-4 py-3 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20"
            />
          </div>

          {state?.error === 'rateLimited' && (
            <p role="alert" className="text-sm text-[#EF4444]">{t('rateLimited')}</p>
          )}
          {state?.error === 'invalid' && (
            <p role="alert" className="text-sm text-[#EF4444]">{t('error')}</p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
