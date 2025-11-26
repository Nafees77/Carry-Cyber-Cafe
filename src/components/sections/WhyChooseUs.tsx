import type { WhyChooseUsItem } from '@/types/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';

interface WhyChooseUsProps {
  items: WhyChooseUsItem[];
}

export default function WhyChooseUs({ items }: WhyChooseUsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          Discover the advantages of choosing our cyber cafe for your needs.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold">{item.titleEN}</CardTitle>
                <p className="text-base font-medium text-muted-foreground">{item.titleHI}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
