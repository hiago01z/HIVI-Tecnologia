'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, MessageCircle, Mail, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import type { ContatoPayload } from '@/types/contato';

function useContatoSchema() {
  const t = useTranslations('contact.form.errors');
  return z.object({
    nome: z.string().min(2, t('nameRequired')).max(120),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')).max(255),
    telefone: z.string().max(30).optional(),
    mensagem: z.string().min(10, t('messageRequired')).max(2000),
    consentimento_lgpd: z.literal(true, t('consentRequired')),
  });
}

type FormData = {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
  consentimento_lgpd: true;
};

function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const schema = useContatoSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    try {
      const payload: ContatoPayload = { ...data, locale };
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-10 text-center shadow-sm">
        <CheckCircle size={48} className="text-[#22C55E]" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-[#0D1117]">{t('successTitle')}</h3>
        <p className="text-[#4B5563]">{t('successMessage')}</p>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-lg border border-[#CBD5E1] px-4 py-3 text-sm text-[#0D1117] placeholder-[#94A3B8] outline-none transition focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/20';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl bg-white p-8 shadow-sm"
      aria-label={t('title')}
    >
      <h3 className="mb-6 text-lg font-semibold text-[#0D1117]">{t('title')}</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="nome">
            {t('name')}
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className={inputBase}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? 'nome-error' : undefined}
            {...register('nome')}
          />
          {errors.nome && (
            <p id="nome-error" role="alert" className="mt-1 text-xs text-[#EF4444]">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="email">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            className={inputBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-[#EF4444]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="telefone">
            {t('phone')}
          </label>
          <input
            id="telefone"
            type="tel"
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
            className={inputBase}
            {...register('telefone')}
          />
        </div>

        {/* Mensagem */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-[#0D1117]" htmlFor="mensagem">
            {t('message')}
          </label>
          <textarea
            id="mensagem"
            rows={4}
            placeholder={t('messagePlaceholder')}
            className={`${inputBase} resize-none`}
            aria-invalid={!!errors.mensagem}
            aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
            {...register('mensagem')}
          />
          {errors.mensagem && (
            <p id="mensagem-error" role="alert" className="mt-1 text-xs text-[#EF4444]">
              {errors.mensagem.message}
            </p>
          )}
        </div>

        {/* LGPD Consent */}
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1565C0]"
              aria-invalid={!!errors.consentimento_lgpd}
              aria-describedby={errors.consentimento_lgpd ? 'lgpd-error' : undefined}
              {...register('consentimento_lgpd')}
            />
            <span className="text-xs leading-relaxed text-[#4B5563]">
              {t('lgpdConsent')}
              <Link href="/privacidade" className="font-medium text-[#1565C0] underline hover:no-underline">
                {t('lgpdLink')}
              </Link>
              {t('lgpdConsentSuffix')}
            </span>
          </label>
          {errors.consentimento_lgpd && (
            <p id="lgpd-error" role="alert" className="mt-1 text-xs text-[#EF4444]">
              {errors.consentimento_lgpd.message}
            </p>
          )}
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm text-[#EF4444]">
          {t('errorMessage')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1976D2] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#1565C0]"
      >
        <Send size={16} aria-hidden="true" />
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');

  const phone = process.env.NEXT_PUBLIC_TELEFONE;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
  const email = process.env.NEXT_PUBLIC_EMAIL_CONTATO;

  return (
    <section
      id="contato"
      className="bg-[#EBF3FF] py-24"
      aria-label={t('sectionTitle')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0D1117] lg:text-4xl">
            {t('sectionTitle')}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-xl text-[#4B5563]">{t('sectionSubtitle')}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — contact info */}
          <div>
            <p className="text-[#4B5563] leading-relaxed">{t('ctaText')}</p>

            <div className="mt-8 space-y-4">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1565C0]/10">
                    <Phone size={22} className="text-[#1565C0]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#4B5563]">{t('phone')}</p>
                    <p className="font-semibold text-[#0D1117]">{phone}</p>
                  </div>
                </a>
              )}

              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-[#1565C0] p-4 shadow-sm transition-shadow hover:shadow-md hover:bg-[#1976D2]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <MessageCircle size={22} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70">{t('whatsapp')}</p>
                    <p className="font-semibold text-white">{t('callToAction')}</p>
                  </div>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1565C0]/10">
                    <Mail size={22} className="text-[#1565C0]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#4B5563]">{t('email')}</p>
                    <p className="font-semibold text-[#0D1117]">{email}</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
