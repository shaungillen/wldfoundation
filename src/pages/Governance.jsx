import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from 'lucide-react';

const leadership = [
  {
    name: 'Julia Louis-Dreyfus',
    role: 'Board Chair',
    bio: 'Award-winning actress and producer. Julia has been instrumental in shaping the Foundation\'s public programs and educational initiatives.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Robert Charles Louis-Dreyfus',
    role: 'Vice Chair',
    bio: 'Businessman and philanthropist. Robert oversees the Foundation\'s financial stewardship and strategic partnerships.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Marjorie Louis-Dreyfus',
    role: 'Secretary',
    bio: 'Art historian and educator. Marjorie guides the Foundation\'s curatorial direction and scholarship programs.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

const staff = [
  {
    name: 'Dr. Catherine Wells',
    role: 'Executive Director',
    focus: 'Foundation operations and strategic vision',
  },
  {
    name: 'Michael Torres',
    role: 'Director of Collections',
    focus: 'Collection care, loans, and documentation',
  },
  {
    name: 'Sarah Chen',
    role: 'Curator',
    focus: 'Exhibitions, research, and publications',
  },
  {
    name: 'James Patterson',
    role: 'Registrar',
    focus: 'Art handling, conservation, and logistics',
  },
  {
    name: 'Emily Okonkwo',
    role: 'Programs Manager',
    focus: 'Tours, education, and community engagement',
  },
];

export default function Governance() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Leadership
            </span>
            <H1 className="mb-6">
              Caretakers & Governance
            </H1>
            <Lead>
              The Foundation is guided by family members and professionals 
              dedicated to preserving William's legacy and sharing the 
              collection with the world.
            </Lead>
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-12">Board of Directors</H2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white border border-charcoal/10 overflow-hidden">
                <div className="aspect-[4/5] bg-beige/50 overflow-hidden">
                  <img 
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <H3 className="mb-1">{person.name}</H3>
                  <p className="text-olive text-sm mb-4">{person.role}</p>
                  <Body className="text-sm">{person.bio}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-12">Foundation Staff</H2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((person) => (
              <div key={person.name} className="p-6 bg-beige/30">
                <H3 className="mb-1">{person.name}</H3>
                <p className="text-olive text-sm mb-2">{person.role}</p>
                <p className="text-sm text-charcoal/60">{person.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stewardship */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <H2 className="text-cream mb-8">Our Commitment to Stewardship</H2>
            <Body className="text-cream/70 mb-6">
              The William Louis-Dreyfus Foundation operates with a deep 
              sense of responsibility to the artists represented in the 
              collection, to the public who benefits from access to these 
              works, and to future generations who will inherit this legacy.
            </Body>
            <Body className="text-cream/70 mb-6">
              We maintain rigorous conservation standards, ensure proper 
              documentation, and carefully vet all loan requests. Every 
              decision is made with long-term preservation in mind.
            </Body>
            <Body className="text-cream/70">
              As a 501(c)(3) nonprofit organization, we are committed to 
              transparency in our operations and governance. We publish 
              annual reports and maintain full compliance with nonprofit 
              best practices.
            </Body>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Mail className="w-10 h-10 text-olive mx-auto mb-6" />
          <H2 className="mb-6">Get in Touch</H2>
          <Lead className="mb-8 max-w-2xl mx-auto">
            For general inquiries, press requests, or partnership opportunities, 
            please contact us.
          </Lead>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('Contact')}>
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}