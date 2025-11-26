import type { Timestamp } from 'firebase/firestore';

export interface GeneralSettings {
  siteName: string;
  logoUrl: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapEmbedUrl: string;
  openingHours: string;
  footerText: string;
}

export interface BannerSettings {
  desktopBanner: string;
  tabletBanner: string;
  mobileBanner: string;
  bannerHeightDesktop: string;
  bannerHeightTablet: string;
  bannerHeightMobile: string;
}

export interface ChatbotSettings {
  enabled: boolean;
  chatbotIconUrl: string;
  sendTo: 'whatsapp' | 'telegram';
  receiverWhatsappNumber: string;
  receiverTelegramID: string;
}

export interface Service {
  id: string;
  titleEN: string;
  titleHI: string;
  icon?: string;
  category: string;
  order: number;
}

export interface WhyChooseUsItem {
  id: string;
  titleEN: string;
  titleHI: string;
  description: string;
  order: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  timestamp: Timestamp;
}

export interface Faq {
  id: string;
  questionEN: string;
  questionHI: string;
  answerEN: string;
  answerHI: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  phone: string;
  message: string;
  type: 'contact' | 'chatbot';
  timestamp: Timestamp;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
}

export interface QuickLink {
  id: string;
  name: string;
  url: string;
  order: number;
}
