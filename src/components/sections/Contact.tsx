"use client"

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import type { GeneralSettings } from '@/types/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';

interface ContactProps {
  settings: GeneralSettings;
}

function ContactForm() {
  const [state, dispatch] = useFormState(submitContactForm, { success: false });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
      formRef.current?.reset();
    } else if (state?.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
        {state?.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" placeholder="+91 12345 67890" required />
        {state?.errors?.phone && <p className="text-xs text-destructive">{state.errors.phone[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message..." className="min-h-[100px]" required />
        {state?.errors?.message && <p className="text-xs text-destructive">{state.errors.message[0]}</p>}
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}

const InfoItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-primary">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      {href ? (
        <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{value}</a>
      ) : (
        <p className="text-sm text-muted-foreground">{value}</p>
      )}
    </div>
  </div>
);

export default function Contact({ settings }: ContactProps) {
  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          We'd love to hear from you. Here's how you can reach us.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Find our details below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem icon={<MapPin/>} label="Address" value={settings.address} />
                <InfoItem icon={<Phone/>} label="Phone" value={settings.primaryPhone} href={`tel:${settings.primaryPhone}`} />
                <InfoItem icon={<MessageCircle/>} label="WhatsApp" value={settings.whatsappNumber} href={`https://wa.me/${settings.whatsappNumber.replace(/\s+/g, '')}`} />
                <InfoItem icon={<Mail/>} label="Email" value={settings.email} href={`mailto:${settings.email}`} />
                <InfoItem icon={<Clock/>} label="Opening Hours" value={settings.openingHours} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form to contact us directly.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Find us on the map.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <iframe
                  src={settings.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
