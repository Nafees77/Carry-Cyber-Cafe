"use client";

import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useActionState } from 'react';
import { useEffect, useRef } from 'react';

import type { ChatbotSettings } from '@/types/firestore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitChatbotForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ChatbotProps {
  settings: ChatbotSettings;
}

function SubmitButton() {
  return (
    <Button type="submit" className="w-full">
      Send Message
    </Button>
  );
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export default function Chatbot({ settings }: ChatbotProps) {
  const [state, dispatch] = useActionState(submitChatbotForm, { success: false });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
      formRef.current?.reset();
    } else if (state?.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  if (!settings.enabled) {
    return null;
  }

  const showIcon = settings.chatbotIconUrl && isValidUrl(settings.chatbotIconUrl);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-primary shadow-lg transition-transform hover:scale-110"
            aria-label="Open chat"
          >
            {showIcon ? (
              <Image
                src={settings.chatbotIconUrl}
                alt="Chatbot Icon"
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint="chat icon"
              />
            ) : (
              <MessageCircle className="h-7 w-7" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Quick Message</h4>
              <p className="text-sm text-muted-foreground">
                Leave your details and we'll get in touch!
              </p>
            </div>
            <form ref={formRef} action={dispatch} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
                {state?.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="Your Phone" required />
                 {state?.errors?.phone && <p className="text-xs text-destructive">{state.errors.phone[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="How can we help?" required />
                {state?.errors?.message && <p className="text-xs text-destructive">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
