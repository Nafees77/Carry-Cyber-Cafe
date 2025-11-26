import type { Service } from '@/types/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Printer, Scan, Wifi, Video, Gamepad2, FileText, Monitor, Briefcase, GraduationCap 
} from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  printer: <Printer className="h-8 w-8 text-primary" />,
  scan: <Scan className="h-8 w-8 text-primary" />,
  wifi: <Wifi className="h-8 w-8 text-primary" />,
  video: <Video className="h-8 w-8 text-primary" />,
  gamepad2: <Gamepad2 className="h-8 w-8 text-primary" />,
  filetext: <FileText className="h-8 w-8 text-primary" />,
  monitor: <Monitor className="h-8 w-8 text-primary" />,
  briefcase: <Briefcase className="h-8 w-8 text-primary" />,
  graduationcap: <GraduationCap className="h-8 w-8 text-primary" />,
  default: <Monitor className="h-8 w-8 text-primary" />,
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
    {children}
  </h2>
);

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <section id="services" className="py-12 md:py-20 bg-secondary/20">
      <div className="container">
        <SectionTitle>Services We Offer</SectionTitle>
        <p className="mt-4 text-center text-muted-foreground">
          A wide range of services to meet all your needs.
        </p>

        {categories.map(category => (
          <div key={category} className="mt-12">
            <h3 className="text-2xl font-semibold tracking-tight mb-8 text-center">{category}</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.filter(s => s.category === category).map((service) => (
                <Card key={service.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    {iconMap[service.icon?.toLowerCase() || 'default']}
                    <CardTitle className="text-lg font-semibold">
                      {service.titleEN}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground ml-12 -mt-2">
                      {service.titleHI}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
