import { useTranslations } from 'next-intl';
import {
  Brain, ClipboardList, Server, Shield, Headphones,
  Code2, Zap, BarChart3, Cloud, Database, Monitor,
} from 'lucide-react';
import { SERVICE_KEYS, FEATURED_SERVICES, type ServiceKey } from '@/constants/services';
import { ServiceCardLink } from './ServiceCardLink';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const SERVICE_ICONS: Record<ServiceKey, React.ElementType> = {
  consultoriaTI: Brain,
  gestaoProjetos: ClipboardList,
  infraestrutura: Server,
  segurancaInfo: Shield,
  suporteTI: Headphones,
  desenvolvimentoWeb: Code2,
  automacaoProcessos: Zap,
  businessIntelligence: BarChart3,
  migracaoCloud: Cloud,
  erp: Database,
  ti360: Monitor,
};

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations();

  return (
    <section className="bg-white py-[88px]" aria-label={t('services.sectionTitle')}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* Heading */}
        {showHeading && (
          <AnimateOnScroll>
            <div className="mb-[52px] text-center">
              <h2 className="text-[42px] font-extrabold tracking-[-1px] text-[#0f1b2d]">
                {t('services.sectionTitle')}
              </h2>
              <div className="mx-auto mt-3.5 mb-[18px] h-1 w-16 rounded-full bg-[#2563eb]" aria-hidden="true" />
              <p className="mx-auto max-w-[620px] text-[17px] text-[#64748b]">
                {t('services.sectionSubtitle')}
              </p>
            </div>
          </AnimateOnScroll>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, index) => {
            const isFeatured = FEATURED_SERVICES.includes(key);
            const Icon = SERVICE_ICONS[key];

            return (
              <AnimateOnScroll key={key} delay={Math.min(index % 3, 2) * 80}>
                <div
                  className={`flex h-full flex-col rounded-[18px] p-[26px] transition-shadow hover:shadow-xl ${
                    isFeatured
                      ? 'text-white'
                      : 'border border-[#e6eefb] bg-[#f5f8fd]'
                  }`}
                  style={
                    isFeatured
                      ? {
                          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                          boxShadow: '0 24px 40px -22px rgba(37,99,235,.65)',
                        }
                      : undefined
                  }
                >
                  <div
                    className={`mb-[18px] flex h-12 w-12 items-center justify-center rounded-xl ${
                      isFeatured ? 'bg-white/[.18]' : 'bg-[#eaf1ff]'
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isFeatured ? 'text-white' : 'text-[#2563eb]'}
                      aria-hidden="true"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3
                    className={`mb-2.5 text-[18px] font-bold leading-tight ${
                      isFeatured ? 'text-white' : 'text-[#0f1b2d]'
                    }`}
                  >
                    {t(`services.items.${key}.title`)}
                  </h3>

                  <p
                    className={`mb-5 flex-1 text-[14px] leading-[1.55] ${
                      isFeatured ? 'text-white/88' : 'text-[#64748b]'
                    }`}
                  >
                    {t(`services.items.${key}.description`)}
                  </p>

                  <ServiceCardLink
                    serviceKey={key}
                    label={t('services.contactUs')}
                    isFeatured={isFeatured}
                  />
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
