'use server';

import { z } from 'zod';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }).regex(/^\+?[0-9\s-()]*$/, { message: 'Please enter a valid phone number.'}),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type FormState = {
  errors?: {
    name?: string[];
    phone?: string[];
    message?: string[];
  };
  message?: string | null;
  success: boolean;
};

async function submitMessage(
  prevState: FormState,
  formData: FormData,
  type: 'contact' | 'chatbot'
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to send message. Please check your input.',
      success: false,
    };
  }

  try {
    await addDoc(collection(db, 'messages'), {
      ...validatedFields.data,
      type,
      timestamp: serverTimestamp(),
    });

    revalidatePath('/');
    return { message: 'Your message has been sent successfully!', success: true };
  } catch (error) {
    console.error('Firestore Error:', error);
    return { message: 'Database Error: Failed to send message.', success: false };
  }
}

export async function submitContactForm(prevState: FormState, formData: FormData) {
  return submitMessage(prevState, formData, 'contact');
}

export async function submitChatbotForm(prevState: FormState, formData: FormData) {
  return submitMessage(prevState, formData, 'chatbot');
}
