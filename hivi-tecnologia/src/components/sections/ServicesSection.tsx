import { useTranslations } from 'next-intl';
import {
  Brain, ClipboardList, Server, Shield, Headphones,
  Code2, Zap, BarChart3, Cloud, Database, Monitor,
} from 'lucide-react';
import { SERVICE_KEYS, FEATURED_SERVICES, type ServiceKey } from '@/constants/services';
import { ServiceCardLink } from './ServiceCardLink';

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

export function ServicesSection() {
  const t = useTranslations();

  return (
    <section className="bg-white py-24" aria-label={t('services.sectionTitle')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0D1117] lg:text-4xl">
            {t('services.sectionTitle')}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-2xl text-[#4B5563]">
            {t('services.sectionSubtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key) => {
            const isFeatured = FEATURED_SERVICES.includes(key);
            const Icon = SERVICE_ICONS[key];

            return (
              <div
                key={key}
                className={`flex flex-col rounded-xl p-6 transition-shadow hover:shadow-xl ${
                  isFeatured
                    ? 'bg-[#1565C0] shadow-[0_4px_20px_rgba(21,101,192,0.35)]'
                    : 'bg-[#EBF3FF] shadow-[0_2px_8px_rgba(21,101,192,0.08)]'
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    isFeatured ? 'bg-white/15' : 'bg-[#1565C0]/10'
                  }`}
                >
                  <Icon
                    size={24}
                    className={isFeatured ? 'text-white' : 'text-[#1565C0]'}
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className={`text-lg font-semibold ${
                    isFeatured ? 'text-white' : 'text-[#0D1117]'
                  }`}
                >
                  {t(`services.items.${key}.title`)}
                </h3>

                <p
                  className={`mt-2 flex-1 text-sm leading-relaxed ${
                    isFeatured ? 'text-white/80' : 'text-[#4B5563]'
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
