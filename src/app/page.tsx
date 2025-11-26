import { getWebsiteData } from '@/lib/firestore';
import Header from '@/components/layout/Header';
import MainBanner from '@/components/sections/MainBanner';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Reviews from '@/components/sections/Reviews';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
  const data = await getWebsiteData();

  if (!data) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-destructive">Failed to load website data. Please try again later.</p>
      </div>
    );
  }

  const {
    settings,
    services,
    whyChooseUs,
    reviews,
    faqs,
    quickLinks,
    socialLinks,
  } = data;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header settings={settings.general} quickLinks={quickLinks} />
      <main className="flex-1">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <MainBanner settings={settings.banners} />
        </Suspense>
        
        <Suspense fallback={<PageSectionSkeleton />}>
          <Services services={services} />
        </Suspense>
        
        <Suspense fallback={<PageSectionSkeleton />}>
          <WhyChooseUs items={whyChooseUs} />
        </Suspense>

        <Suspense fallback={<PageSectionSkeleton />}>
          <Contact settings={settings.general} />
        </Suspense>

        <Suspense fallback={<PageSectionSkeleton />}>
          <Reviews reviews={reviews} />
        </Suspense>
        
        <Suspense fallback={<PageSectionSkeleton />}>
          <Faq faqs={faqs} />
        </Suspense>

      </main>
      <Footer settings={settings.general} quickLinks={quickLinks} socialLinks={socialLinks} />
      <Chatbot settings={settings.chatbot} />
    </div>
  );
}

const PageSectionSkeleton = () => (
  <div className="container py-12 md:py-20">
    <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
);
