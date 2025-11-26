"use client";

import type { GeneralSettings, QuickLink } from '@/types/firestore';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { cn } from '@/lib/utils';

interface HeaderProps {
  settings: GeneralSettings;
  quickLinks: QuickLink[];
}

export default function Header({ settings, quickLinks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 md:gap-6", className)}>
      {quickLinks.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt={`${settings.siteName} Logo`}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              data-ai-hint="logo"
            />
          ) : (
            <span className="font-bold">{settings.siteName}</span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <Button asChild>
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      {settings.logoUrl ? (
                        <Image
                          src={settings.logoUrl}
                          alt={`${settings.siteName} Logo`}
                          width={120}
                          height={40}
                          className="h-8 w-auto object-contain"
                        />
                      ) : (
                        <span className="font-bold">{settings.siteName}</span>
                      )}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <NavLinks className="flex-col items-start space-y-4 text-lg" />
                 <Button asChild className="w-full mt-8">
                    <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
