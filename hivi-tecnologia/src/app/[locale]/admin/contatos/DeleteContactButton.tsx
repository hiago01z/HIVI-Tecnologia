'use client';

import { useTranslations } from 'next-intl';
import { deleteContactAction } from './actions';

export function DeleteContactButton({ contactId, locale }: { contactId: string; locale: string }) {
  const t = useTranslations('admin.contatos');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm(t('confirmDelete'))) {
      e.preventDefault();
    }
  }

  return (
    <form action={deleteContactAction} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={contactId} />
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#EF4444] transition-colors hover:bg-red-50"
      >
        {t('delete')}
      </button>
    </form>
  );
}
