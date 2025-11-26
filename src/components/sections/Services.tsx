import type { Service } from '@/types/firestore';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-12 md:py-20 bg-secondary/20">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {services.map((service) => (
            <div key={service.id} className="w-full h-full">
              <iframe
                srcDoc={service.content}
                className="w-full h-full border-0"
                title={service.id}
                sandbox="" // Added for extra security
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
