import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
