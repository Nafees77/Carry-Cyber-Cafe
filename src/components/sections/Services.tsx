import type { Service } from '@/types/firestore';
import Image from 'next/image';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-16 md:py-20 bg-secondary/20 px-4">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center">
          {services
            .filter((service) => service.src)
            .map((service) => (
              <div key={service.id} className="w-full flex justify-center">
                <Image
                  src={service.src}
                  alt={`Service image ${service.order}`}
                  width={service.width || 300}
                  height={service.height || 200}
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
