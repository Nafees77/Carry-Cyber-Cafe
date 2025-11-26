import type { Faq as FaqType } from '@/types/firestore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface FaqProps {
  faqs: FaqType[];
}

export default function Faq({ faqs }: FaqProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-12 md:py-20">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          Find answers to common questions about our services.
        </p>

        <Accordion type="single" collapsible className="w-full mt-12">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-left">
                <div>
                  <p className="font-semibold text-base">{faq.questionEN}</p>
                  <p className="text-sm text-muted-foreground">{faq.questionHI}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>{faq.answerEN}</p>
                <p>{faq.answerHI}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
