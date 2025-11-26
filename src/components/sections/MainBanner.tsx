"use client";

import type { BannerSettings } from '@/types/firestore';
import Image from 'next/image';
import { useMemo } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface MainBannerProps {
  settings: BannerSettings;
}

const isValidUrl = (url: string | undefined): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (e) {
    return false;
  }
};

export default function MainBanner({ settings }: MainBannerProps) {
  const desktopBannerSrc = useMemo(() => 
    isValidUrl(settings.desktopBanner) 
      ? settings.desktopBanner 
      : PlaceHolderImages.find(p => p.id === 'banner-desktop')?.imageUrl || '', 
  [settings.desktopBanner]);

  const tabletBannerSrc = useMemo(() =>
    isValidUrl(settings.tabletBanner)
      ? settings.tabletBanner
      : PlaceHolderImages.find(p => p.id === 'banner-tablet')?.imageUrl || '',
  [settings.tabletBanner]);

  const mobileBannerSrc = useMemo(() =>
    isValidUrl(settings.mobileBanner)
      ? settings.mobileBanner
      : PlaceHolderImages.find(p => p.id === 'banner-mobile')?.imageUrl || '',
  [settings.mobileBanner]);

  return (
    <section id="home" className="py-8 block">
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
            {desktopBannerSrc && <source media="(min-width: 1024px)" srcSet={desktopBannerSrc} />}
            {tabletBannerSrc && <source media="(min-width: 768px)" srcSet={tabletBannerSrc} />}
            {mobileBannerSrc && (
              <Image
                src={mobileBannerSrc}
                alt="Carry Cyber Cafe interior"
                fill
                priority
                className="object-cover"
                data-ai-hint="cyber cafe interior"
              />
            )}
          </picture>
        </div>
      </div>
    </section>
  );
}
