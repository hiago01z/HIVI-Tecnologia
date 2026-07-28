'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import type { Profile } from '@/types/profile';

function AvatarPreview({ nome, foto_url, size = 80 }: { nome: string; foto_url: string | null; size?: number }) {
  const initials = nome
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-[#162268] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {foto_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto_url} alt={nome} className="h-full w-full object-cover" />
      ) : initials ? (
        <span className="text-white font-bold select-none" style={{ fontSize: size * 0.35 }}>
          {initials}
        </span>
      ) : (
        <User size={size * 0.4} className="text-white/60" aria-hidden="true" />
      )}
    </div>
  );
}

export function ProfileEditor() {
  const t = useTranslations('admin.profile');

  const [nome, setNome] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((r) => r.json())
      .then((data: Partial<Profile>) => {
        setNome(data.nome ?? '');
        setFotoUrl(data.foto_url ?? '');
        setStatus('idle');
      })
      .catch(() => setStatus('idle'));
  }, []);

  const handleSave = async () => {
    if (status === 'saving') return;
    setStatus('saving');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, foto_url: fotoUrl || null }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? `HTTP ${res.status}`);
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro de rede');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-lg border border-[#CBD5E1] px-4 py-2.5 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20';
  const labelCls = 'mb-1.5 block text-sm font-medium text-[#0D1117]';

  return (
    <div className="max-w-lg space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex items-center gap-5">
          <AvatarPreview nome={nome} foto_url={fotoUrl || null} size={72} />
          <div>
            <p className="text-sm font-medium text-[#0D1117]">{nome || t('noName')}</p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">{t('avatarHint')}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelCls} htmlFor="profile-nome">
              {t('nameLabel')}
            </label>
            <input
              id="profile-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={inputCls}
              placeholder={t('namePlaceholder')}
              maxLength={120}
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="profile-foto">
              {t('photoLabel')}
            </label>
            <input
              id="profile-foto"
              type="url"
              value={fotoUrl}
              onChange={(e) => setFotoUrl(e.target.value)}
              className={inputCls}
              placeholder="https://..."
              disabled={status === 'loading'}
            />
            <p className="mt-1 text-xs text-[#94A3B8]">{t('photoHint')}</p>
          </div>
        </div>

        {status === 'error' && errorMsg && (
          <div role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {t('error')}: {errorMsg}
          </div>
        )}

        {status === 'success' && (
          <div role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {t('success')}
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={status === 'saving' || status === 'loading'}
          className="mt-6 rounded-lg bg-[#162268] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0] disabled:opacity-60"
        >
          {status === 'saving' ? t('saving') : t('save')}
        </button>
      </div>
    </div>
  );
}
