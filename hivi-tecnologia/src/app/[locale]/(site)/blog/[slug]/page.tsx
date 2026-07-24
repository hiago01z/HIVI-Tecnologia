import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!slug) notFound();

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <p className="text-[#4B5563]">Post: {slug}</p>
    </main>
  );
}
