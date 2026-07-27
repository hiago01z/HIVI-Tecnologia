'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Eye, MessageSquare, MessageCircle, Briefcase, Users } from 'lucide-react';

type Period = '7' | '30' | '90';

interface Metrics {
  page_view: number;
  click_contato: number;
  click_whatsapp: number;
  click_servico: number;
  totalContacts: number;
}

async function fetchMetrics(days: number): Promise<Metrics> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const res = await fetch(`/api/admin/metrics?since=${encodeURIComponent(since)}`);
  if (!res.ok) return { page_view: 0, click_contato: 0, click_whatsapp: 0, click_servico: 0, totalContacts: 0 };
  return res.json();
}

export default function DashboardPage() {
  const t = useTranslations('admin.dashboard');
  const [period, setPeriod] = useState<Period>('30');
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMetrics(Number(period))
      .then((data) => {
        setMetrics(data);
      })
      .catch(() => {
        setMetrics({ page_view: 0, click_contato: 0, click_whatsapp: 0, click_servico: 0, totalContacts: 0 });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [period]);

  const cards: { key: keyof Metrics; label: string; Icon: React.ElementType; color: string }[] = [
    { key: 'page_view', label: t('totalPageViews'), Icon: Eye, color: '#1565C0' },
    { key: 'click_contato', label: t('contactClicks'), Icon: MessageSquare, color: '#162268' },
    { key: 'click_whatsapp', label: t('whatsappClicks'), Icon: MessageCircle, color: '#22C55E' },
    { key: 'click_servico', label: t('serviceClicks'), Icon: Briefcase, color: '#F59E0B' },
    { key: 'totalContacts', label: t('totalContacts'), Icon: Users, color: '#7C3AED' },
  ];

  const periods: { value: Period; label: string }[] = [
    { value: '7', label: t('last7days') },
    { value: '30', label: t('last30days') },
    { value: '90', label: t('last90days') },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#162268]">{t('title')}</h1>

        <div className="flex gap-2">
          {periods.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPeriod(value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                period === value
                  ? 'bg-[#162268] text-white'
                  : 'bg-white text-[#4B5563] hover:bg-[#EBF3FF]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ key, label, Icon, color }) => (
          <div key={key} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${color}18` }}
            >
              <Icon size={22} style={{ color }} aria-hidden="true" />
            </div>
            <p className="text-sm text-[#4B5563]">{label}</p>
            <p className="mt-1 text-3xl font-bold text-[#0D1117]">
              {loading ? '—' : (metrics?.[key] ?? 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
