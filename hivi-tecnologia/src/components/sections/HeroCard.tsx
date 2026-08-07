'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const CHALLENGES = [
  {
    challengeKey: 'infraChallenge' as const,
    solutionKey: 'infraSolution' as const,
    num: '01',
    accentBg: 'rgba(37,99,235,.06)',
    barColor: '#2563eb',
    numBg: 'rgba(37,99,235,.10)',
    numColor: '#2563eb',
  },
  {
    challengeKey: 'securityChallenge' as const,
    solutionKey: 'securitySolution' as const,
    num: '02',
    accentBg: 'rgba(22,163,74,.06)',
    barColor: '#16a34a',
    numBg: 'rgba(22,163,74,.10)',
    numColor: '#16a34a',
  },
  {
    challengeKey: 'automationChallenge' as const,
    solutionKey: 'automationSolution' as const,
    num: '03',
    accentBg: 'rgba(245,158,11,.07)',
    barColor: '#f59e0b',
    numBg: 'rgba(245,158,11,.12)',
    numColor: '#d97706',
  },
  {
    challengeKey: 'devChallenge' as const,
    solutionKey: 'devSolution' as const,
    num: '04',
    accentBg: 'rgba(37,99,235,.06)',
    barColor: '#2563eb',
    numBg: 'rgba(37,99,235,.10)',
    numColor: '#2563eb',
  },
  {
    challengeKey: 'consultingChallenge' as const,
    solutionKey: 'consultingSolution' as const,
    num: '05',
    accentBg: 'rgba(22,163,74,.06)',
    barColor: '#16a34a',
    numBg: 'rgba(22,163,74,.10)',
    numColor: '#16a34a',
  },
  {
    challengeKey: 'erpChallenge' as const,
    solutionKey: 'erpSolution' as const,
    num: '06',
    accentBg: 'rgba(245,158,11,.07)',
    barColor: '#f59e0b',
    numBg: 'rgba(245,158,11,.12)',
    numColor: '#d97706',
  },
] as const;

export function HeroCard() {
  const th = useTranslations('hero');
  const ts = useTranslations('solutions');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive(p => (p + 1) % CHALLENGES.length), 3400);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,.78)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,.9)',
        borderRadius: '24px',
        padding: '26px',
        boxShadow: '0 40px 80px -28px rgba(30,58,138,.45)',
      }}
    >
      {/* Window chrome */}
      <div className="mb-[18px] flex items-center gap-[7px]">
        <span className="h-3 w-3 rounded-full bg-[#ef4444]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#22c55e]" aria-hidden="true" />
        <span className="ml-3 text-[11px] font-bold uppercase tracking-[1.2px] text-[#94a3b8]">
          {th('challengesLabel')}
        </span>
      </div>

      {/* Card title */}
      <h2 className="mb-2 text-[22px] font-extrabold tracking-[-0.5px] text-[#0f1b2d]">
        {ts('sectionTitle')}
      </h2>
      <p className="mb-5 text-[14px] leading-[1.55] text-[#64748b]">
        {ts('sectionSubtitle')}
      </p>

      {/* Challenges list */}
      <div className="flex flex-col gap-[10px]">
        {CHALLENGES.map((c, i) => {
          const isActive = active === i;
          return (
            <div
              key={c.num}
              role="button"
              tabIndex={0}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(i);
              }}
              style={{
                position: 'relative',
                padding: '15px 16px',
                borderRadius: '14px',
                background: '#fff',
                border: '1px solid #eef2f8',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(15,27,45,.04)',
              }}
            >
              {isActive && (
                <>
                  <div
                    style={{ position: 'absolute', inset: 0, background: c.accentBg }}
                    aria-hidden="true"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0, top: 0, bottom: 0,
                      width: '3px',
                      background: c.barColor,
                      transformOrigin: 'top',
                      animation: 'barGrow .4s ease',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    flex: 'none',
                    width: '34px', height: '34px',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '13px',
                    color: c.numColor,
                    background: c.numBg,
                  }}
                >
                  {c.num}
                </span>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f1b2d' }}>
                  {ts(c.challengeKey)}
                </span>
              </div>
              {isActive && (
                <div
                  style={{
                    position: 'relative',
                    marginTop: '10px',
                    paddingLeft: '46px',
                    fontSize: '14px',
                    lineHeight: '1.55',
                    color: '#475569',
                    animation: 'ansIn .35s ease',
                  }}
                >
                  {ts(c.solutionKey)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Green CTA footer */}
      <div
        className="mt-5 flex items-center gap-2.5 rounded-[14px] text-white"
        style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          padding: '14px 18px',
          boxShadow: '0 14px 26px -12px rgba(22,163,74,.6)',
        }}
      >
        <span
          className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[14px] font-extrabold"
          style={{ background: 'rgba(255,255,255,.22)' }}
          aria-hidden="true"
        >
          ✓
        </span>
        <span className="text-[15px] font-bold">{ts('ctaHeadline')}</span>
      </div>
    </div>
  );
}
