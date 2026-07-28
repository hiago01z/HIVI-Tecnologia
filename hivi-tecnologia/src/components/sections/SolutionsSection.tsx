import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Server, Shield, Zap, Code2, Brain, Database, ArrowRight,
} from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const CHALLENGES = [
  { icon: Server, challengeKey: 'infraChallenge', solutionKey: 'infraSolution' },
  { icon: Shield, challengeKey: 'securityChallenge', solutionKey: 'securitySolution' },
  { icon: Zap, challengeKey: 'automationChallenge', solutionKey: 'automationSolution' },
  { icon: Code2, challengeKey: 'devChallenge', solutionKey: 'devSolution' },
  { icon: Brain, challengeKey: 'consultingChallenge', solutionKey: 'consultingSolution' },
  { icon: Database, challengeKey: 'erpChallenge', solutionKey: 'erpSolution' },
] as const;

export function SolutionsSection() {
  const t = useTranslations('solutions');

  return (
    <section className="bg-[#F8FAFC] py-24" aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0D1117] lg:text-4xl">
              {t('sectionTitle')}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
            <p className="mx-auto mt-5 max-w-2xl text-[#4B5563]">
              {t('sectionSubtitle')}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map(({ icon: Icon, challengeKey, solutionKey }, index) => (
            <AnimateOnScroll key={challengeKey} delay={index * 80}>
              <div className="group flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF3FF]">
                  <Icon size={22} className="text-[#1565C0]" aria-hidden="true" strokeWidth={1.5} />
                </div>
                <p className="text-base font-semibold text-[#0D1117]">
                  {t(challengeKey)}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4B5563]">
                  {t(solutionKey)}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200}>
          <div className="mt-14 rounded-2xl bg-[#162268] px-8 py-10 text-center">
            <p className="text-xl font-semibold text-white lg:text-2xl">
              {t('ctaHeadline')}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#CBD5E1]">
              {t('ctaSubtext')}
            </p>
            <Link
              href="/servicos"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#162268] transition-colors hover:bg-[#EBF3FF] focus-visible:outline-2 focus-visible:outline-white"
            >
              {t('ctaButton')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
