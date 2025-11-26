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
import { defaultGeneralSettings, defaultBannerSettings, defaultChatbotSettings } from '@/lib/firestore';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
  const data = await getWebsiteData();

  const settings = data?.settings ?? {
    general: defaultGeneralSettings,
    banners: defaultBannerSettings,
    chatbot: defaultChatbotSettings,
  };
  const services = data?.services ?? [];
  const whyChooseUs = data?.whyChooseUs ?? [];
  const reviews = data?.reviews ?? [];
  const faqs = data?.faqs ?? [];
  const quickLinks = data?.quickLinks ?? [];
  const socialLinks = data?.socialLinks ?? {};

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Suspense fallback={<Skeleton className="h-16 w-full" />}>
        <Header settings={settings.general} quickLinks={quickLinks} />
      </Suspense>
      <main className="flex-1 container mx-auto">
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