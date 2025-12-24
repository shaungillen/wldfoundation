import React from 'react';
import { H2, Lead } from '@/components/ui/typography';
import ProgramCard from '@/components/cards/ProgramCard';
import { MapPin, Truck, Newspaper } from 'lucide-react';

const programs = [
  {
    title: 'Tours & Visits',
    description: 'Experience the collection in person at our Mount Kisco Gallery, or explore virtually from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80',
    href: 'Tours',
    icon: MapPin,
  },
  {
    title: 'Art Loan Program',
    description: 'Our collection travels to museums, universities, and cultural institutions worldwide, extending William\'s vision of shared access.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    href: 'ArtLoanProgram',
    icon: Truck,
  },
  {
    title: 'News & Insights',
    description: 'Essays, scholarship, and reflections on the artists, works, and ideas that shape our collection.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    href: 'News',
    icon: Newspaper,
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="py-16 md:py-24 bg-beige/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
            Programs
          </span>
          <H2 className="mb-4">
            Engage With the Collection
          </H2>
          <Lead>
            Multiple pathways to experience and learn from this remarkable 
            body of contemporary art.
          </Lead>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program) => (
            <ProgramCard
              key={program.title}
              title={program.title}
              description={program.description}
              image={program.image}
              href={program.href}
              icon={program.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}