import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import type { 
  ChatbotSettings,
  Faq,
  GeneralSettings,
  QuickLink,
  Review,
  Service,
  SocialLinks,
  WhyChooseUsItem
} from '@/types/firestore';
import { PlaceHolderImages } from './placeholder-images';
import { unstable_noStore as noStore } from 'next/cache';

async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  } catch (error) {
    console.error(`Error fetching document ${collectionName}/${docId}:`, error);
    return null;
  }
}

async function getCollection<T>(collectionName: string, orderField: string, orderDirection: 'asc' | 'desc' = 'asc'): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), orderBy(orderField, orderDirection));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

export const defaultGeneralSettings: GeneralSettings = {
  siteName: 'Carry Cyber Cafe',
  logoUrl: PlaceHolderImages.find(p => p.id === 'logo')?.imageUrl || '',
  primaryPhone: '+1 (234) 567-890',
  whatsappNumber: '+1 (234) 567-890',
  email: 'hello@carrycyber.com',
  address: '123 Tech Street, Silicon Valley, CA 94000',
  googleMapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.332331505307!2d-122.084!3d37.422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba024251648b%3A0x1d3c0b8f2c3d4f4!2sGoogleplex!5e0!3m2!1sen!2sus!4v1623838289431!5m2!1sen!2sus',
  openingHours: 'Mon - Fri: 9am - 9pm | Sat - Sun: 10am - 7pm',
  footerText: 'Your premier destination for internet services, gaming, and digital solutions.'
};

export const defaultChatbotSettings: ChatbotSettings = {
  enabled: true,
  chatbotIconUrl: PlaceHolderImages.find(p => p.id === 'chatbot-icon')?.imageUrl || '',
  sendTo: 'whatsapp',
  receiverWhatsappNumber: '1234567890',
  receiverTelegramID: 'your_telegram_id',
};

export async function getWebsiteData() {
  noStore();
  try {
    const [
      general,
      chatbot,
      services,
      whyChooseUs,
      reviews,
      faqs,
      quickLinks,
      socialLinks,
    ] = await Promise.all([
      getDocument<GeneralSettings>('websiteSettings', 'general'),
      getDocument<ChatbotSettings>('websiteSettings', 'chatbot'),
      getCollection<Service>('services', 'order'),
      getCollection<WhyChooseUsItem>('whyChooseUs', 'order'),
      getCollection<Review>('reviews', 'timestamp', 'desc'),
      getCollection<Faq>('faqs', 'order'),
      getCollection<QuickLink>('quickLinks', 'order'),
      getDocument<SocialLinks>('socialLinks', 'main'),
    ]);

    return {
      settings: {
        general: general || defaultGeneralSettings,
        chatbot: chatbot || defaultChatbotSettings,
      },
      services,
      whyChooseUs,
      reviews,
      faqs,
      quickLinks,
      socialLinks: socialLinks || {},
    };
  } catch (error) {
    console.error("Failed to fetch website data:", error);
    return null;
  }
}
