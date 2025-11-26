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

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-12 md:py-20 bg-secondary/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
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
    </section>
  );
}
