import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

interface TestimonialItem {
  text: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as TestimonialItem[];

  return (
    <section className="bg-white py-24" aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0D1117] lg:text-4xl">
              {t('sectionTitle')}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
            <p className="mx-auto mt-5 max-w-xl text-[#4B5563]">{t('sectionSubtitle')}</p>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.isArray(items) &&
            items.map((item, index) => {
              const initials = item.author
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('');

              return (
                <AnimateOnScroll key={item.author} delay={index * 120}>
                  <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
                    <div className="flex gap-1" aria-label={t('starsAriaLabel')}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-[#F59E0B]"
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-4 flex-1 italic leading-relaxed text-[#4B5563]">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>

                    <div className="mt-6 flex items-center gap-4 border-t border-[#F1F5F9] pt-6">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#162268] text-sm font-bold text-white"
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D1117]">{item.author}</p>
                        <p className="text-sm text-[#4B5563]">
                          {item.role} — {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
        </div>
      </div>
    </section>
  );
}
