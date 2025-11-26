import type { GeneralSettings, QuickLink, SocialLinks } from '@/types/firestore';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  settings: GeneralSettings;
  quickLinks: QuickLink[];
  socialLinks: SocialLinks;
}

const socialIconMap = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  telegram: <Send className="h-5 w-5" />,
};

export default function Footer({ settings, quickLinks, socialLinks }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300" style={{'--background-dark': 'hsl(222 47% 11%)', '--text-light': 'hsl(0 0% 100%)'}}>
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
               <Image
                src={settings.logoUrl}
                alt={`${settings.siteName} Logo`}
                width={150}
                height={50}
                className="h-10 w-auto object-contain invert brightness-0"
                data-ai-hint="logo"
              />
            </Link>
            <p className="max-w-md text-sm text-gray-400">
              {settings.footerText}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-sm transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {Object.entries(socialLinks).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                    aria-label={`Follow us on ${platform}`}
                  >
                    {socialIconMap[platform as keyof typeof socialIconMap]}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
