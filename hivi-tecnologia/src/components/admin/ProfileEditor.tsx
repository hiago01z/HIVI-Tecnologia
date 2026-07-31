'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { User, Camera, Loader2, X } from 'lucide-react';
import type { Profile } from '@/types/profile';

const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif';

function AvatarPreview({
  nome,
  foto_url,
  size = 80,
  uploading = false,
  onPickFile,
}: {
  nome: string;
  foto_url: string | null;
  size?: number;
  uploading?: boolean;
  onPickFile: () => void;
}) {
  const initials = nome
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <button
      type="button"
      onClick={onPickFile}
      disabled={uploading}
      aria-label="Alterar foto de perfil"
      className="group relative shrink-0 overflow-hidden rounded-full bg-[#162268] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#162268] focus-visible:ring-offset-2"
      style={{ width: size, height: size }}
    >
      {foto_url?.startsWith('https://') ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto_url} alt={nome} className="h-full w-full object-cover" />
      ) : initials ? (
        <span
          className="flex h-full w-full items-center justify-center text-white font-bold select-none"
          style={{ fontSize: size * 0.35 }}
        >
          {initials}
        </span>
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <User size={size * 0.4} className="text-white/60" aria-hidden="true" />
        </span>
      )}

      {/* Overlay ao hover / durante upload */}
      <span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 transition-opacity"
        style={{ opacity: uploading ? 1 : undefined }}
        aria-hidden="true"
      >
        {uploading ? (
          <Loader2 size={size * 0.3} className="animate-spin text-white" />
        ) : (
          <Camera
            size={size * 0.3}
            className="text-white opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </span>
    </button>
  );
}

export function ProfileEditor() {
  const t = useTranslations('admin.profile');
  const fileRef = useRef<HTMLInputElement>(null);

  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [nome, setNome] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [pageStatus, setPageStatus] = useState<'loading' | 'idle' | 'saving' | 'success' | 'error'>('loading');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    return () => { if (statusTimerRef.current) clearTimeout(statusTimerRef.current); };
  }, []);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((r) => r.json())
      .then((data: Partial<Profile>) => {
        setNome(data.nome ?? '');
        setFotoUrl(data.foto_url ?? '');
        setPageStatus('idle');
      })
      .catch(() => setPageStatus('idle'));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploadStatus('uploading');
    setUploadError(null);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/admin/profile/avatar', { method: 'POST', body: form });
      const body = await res.json();

      if (!res.ok) {
        setUploadError(body.error ?? `HTTP ${res.status}`);
        setUploadStatus('error');
        return;
      }

      setFotoUrl(body.url);
      setUploadStatus('idle');
    } catch {
      setUploadError('Erro de rede. Tente novamente.');
      setUploadStatus('error');
    }
  };

  const handleSave = async () => {
    if (pageStatus === 'saving') return;
    setPageStatus('saving');
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
        setPageStatus('error');
        return;
      }

      setPageStatus('success');
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => setPageStatus('idle'), 3000);
    } catch {
      setErrorMsg('Erro de rede. Tente novamente.');
      setPageStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-lg border border-[#CBD5E1] px-4 py-2.5 text-sm outline-none transition focus:border-[#162268] focus:ring-2 focus:ring-[#162268]/20 disabled:opacity-50';
  const labelCls = 'mb-1.5 block text-sm font-medium text-[#0D1117]';
  const isDisabled = pageStatus === 'loading' || pageStatus === 'saving';

  return (
    <div className="max-w-lg space-y-6">
      {/* Input de arquivo oculto */}
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
      />

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        {/* Avatar + info */}
        <div className="mb-6 flex items-center gap-5">
          <AvatarPreview
            nome={nome}
            foto_url={fotoUrl || null}
            size={80}
            uploading={uploadStatus === 'uploading'}
            onPickFile={() => fileRef.current?.click()}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#0D1117]">{nome || t('noName')}</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploadStatus === 'uploading' || isDisabled}
              className="mt-1 text-xs font-medium text-[#1565C0] hover:underline disabled:opacity-50"
            >
              {uploadStatus === 'uploading' ? t('uploading') : t('changePhoto')}
            </button>
            <p className="mt-0.5 text-xs text-[#94A3B8]">{t('photoFormats')}</p>
          </div>
        </div>

        {uploadStatus === 'error' && uploadError && (
          <div role="alert" className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <X size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Nome */}
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
              disabled={isDisabled}
            />
          </div>

          {/* URL manual (opcional) */}
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
              disabled={isDisabled}
            />
            <p className="mt-1 text-xs text-[#94A3B8]">{t('photoHint')}</p>
          </div>
        </div>

        {pageStatus === 'error' && errorMsg && (
          <div role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {t('error')}: {errorMsg}
          </div>
        )}

        {pageStatus === 'success' && (
          <div role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {t('success')}
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isDisabled}
          className="mt-6 rounded-lg bg-[#162268] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565C0] disabled:opacity-60"
        >
          {pageStatus === 'saving' ? t('saving') : t('save')}
        </button>
      </div>
    </div>
  );
}
