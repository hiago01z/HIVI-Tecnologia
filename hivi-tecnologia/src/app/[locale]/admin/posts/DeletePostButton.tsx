'use client';

import { useTranslations } from 'next-intl';
import { deletePostAction } from './actions';

export function DeletePostButton({ postId, locale }: { postId: string; locale: string }) {
  const t = useTranslations('admin.posts');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm(t('confirmDelete'))) {
      e.preventDefault();
    }
  }

  return (
    <form action={deletePostAction} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={postId} />
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#EF4444] hover:bg-red-50"
      >
        {t('delete')}
      </button>
    </form>
  );
}
