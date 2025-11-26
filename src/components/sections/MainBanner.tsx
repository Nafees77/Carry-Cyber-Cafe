"use client";

import type { BannerSettings } from '@/types/firestore';
import Image from 'next/image';

interface MainBannerProps {
  settings: BannerSettings;
}

export default function MainBanner({ settings }: MainBannerProps) {
  return (
    <section id="home" className="py-8">
      <div
        className="relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg"
        style={{
          '--h-mobile': settings.bannerHeightMobile,
          '--h-tablet': settings.bannerHeightTablet,
          '--h-desktop': settings.bannerHeightDesktop,
          height: 'var(--h-mobile)',
        } as React.CSSProperties}
      >
        <style jsx>{`
          @media (min-width: 768px) {
            .banner-container {
              height: var(--h-tablet);
            }
          }
          @media (min-width: 1024px) {
            .banner-container {
              height: var(--h-desktop);
            }
          }
        `}</style>
        <div className="banner-container relative w-full h-full">
            <picture>
                <source media="(min-width: 1024px)" srcSet={settings.desktopBanner} />
                <source media="(min-width: 768px)" srcSet={settings.tabletBanner} />
                <Image
                    src={settings.mobileBanner}
                    alt="Carry Cyber Cafe interior"
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint="cyber cafe interior"
                />
            </picture>
        </div>
      </div>
    </section>
  );
}
