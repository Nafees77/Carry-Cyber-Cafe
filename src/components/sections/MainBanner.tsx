"use client";

import Image from 'next/image';
import type { BannerSettings } from '@/types/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface MainBannerProps {
  settings: BannerSettings;
}

const isValidUrl = (url: string | undefined): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return url.trim() !== '';
  } catch (e) {
    return false;
  }
};

export default function MainBanner({ settings }: MainBannerProps) {
  const desktopBannerUrl = isValidUrl(settings.desktopBanner)
    ? settings.desktopBanner
    : PlaceHolderImages.find(p => p.id === 'banner-desktop')?.imageUrl!;
  
  const tabletBannerUrl = isValidUrl(settings.tabletBanner)
    ? settings.tabletBanner
    : PlaceHolderImages.find(p => p.id === 'banner-tablet')?.imageUrl!;

  const mobileBannerUrl = isValidUrl(settings.mobileBanner)
    ? settings.mobileBanner
    : PlaceHolderImages.find(p => p.id === 'banner-mobile')?.imageUrl!;

  return (
    <section 
      className="relative w-full"
      style={{
        '--h-mobile': `${settings.bannerHeightMobile || 200}px`,
        '--h-tablet': `${settings.bannerHeightTablet || 300}px`,
        '--h-desktop': `${settings.bannerHeightDesktop || 400}px`,
      } as React.CSSProperties}
    >
      <div className="relative h-[var(--h-mobile)] md:h-[var(--h-tablet)] lg:h-[var(--h-desktop)]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopBannerUrl} />
          <source media="(min-width: 768px)" srcSet={tabletBannerUrl} />
          <Image
            src={mobileBannerUrl}
            alt="Main banner"
            fill
            priority
            className="object-cover"
            data-ai-hint="banner image"
          />
        </picture>
      </div>
    </section>
  );
}