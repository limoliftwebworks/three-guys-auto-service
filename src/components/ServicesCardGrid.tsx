import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

interface ServicesCardGridProps {
  services: Service[];
}

export default function ServicesCardGrid({ services }: ServicesCardGridProps) {
  if (!services || services.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {service.icon && (
              <div className="text-purple-600 text-3xl mb-4">
                <span dangerouslySetInnerHTML={{ __html: service.icon }} />
              </div>
            )}
            <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {service.link && (
              <Link 
                href={service.link}
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                Learn More →
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 