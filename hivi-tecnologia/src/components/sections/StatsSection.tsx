import { useTranslations } from 'next-intl';
import { Users, FolderCheck, Activity, Headphones } from 'lucide-react';

const STATS = [
  { valueKey: 'stats.clientsValue', labelKey: 'stats.clients', Icon: Users },
  { valueKey: 'stats.projectsValue', labelKey: 'stats.projects', Icon: FolderCheck },
  { valueKey: 'stats.uptimeValue', labelKey: 'stats.uptime', Icon: Activity },
  { valueKey: 'stats.supportValue', labelKey: 'stats.support', Icon: Headphones },
] as const;

export function StatsSection() {
  const t = useTranslations();

  return (
    <section className="bg-[#162268] py-20" aria-label="Estatísticas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map(({ valueKey, labelKey, Icon }) => (
            <div
              key={valueKey}
              className="flex flex-col items-center rounded-xl border border-white/15 bg-white/7 p-8 text-center"
            >
              <Icon
                size={40}
                className="text-white/70"
                aria-hidden="true"
                strokeWidth={1.5}
              />
              <p className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
                {t(valueKey)}
              </p>
              <p className="mt-2 text-sm text-[#CBD5E1]">{t(labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
