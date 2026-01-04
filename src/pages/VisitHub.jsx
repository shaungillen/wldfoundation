import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, Phone, Info, ArrowRight } from 'lucide-react';

const visitOptions = [
  {
    icon: MapPin,
    title: 'Visit the Gallery',
    description: 'Experience works from the collection in person at our Mount Kisco location.',
    details: [
      'By appointment only',
      'Tuesday – Saturday',
      'Intimate viewing experience',
    ],
    cta: 'Gallery Information',
    href: 'VisitGallery',
  },
  {
    icon: Calendar,
    title: 'Guided Tours',
    description: 'Book a curated tour led by knowledgeable guides who provide context and insight.',
    details: [
      '90-minute guided experience',
      'Small group settings',
      'Thematic tours available',
    ],
    cta: 'Request Tour',
    href: 'Tours',
  },
  {
    icon: Clock,
    title: 'Virtual Tour',
    description: 'Explore the gallery remotely through our immersive room-by-room virtual experience.',
    details: [
      'Available anytime',
      'Self-guided exploration',
      'View works in each room',
    ],
    cta: 'Start Virtual Tour',
    href: 'VirtualTourRooms',
  },
];

export default function VisitHub() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Plan Your Visit
            </span>
            <H1 className="mb-6">
              Experience the Collection
            </H1>
            <Lead>
              The William Louis-Dreyfus Foundation gallery in Mount Kisco, New York 
              welcomes visitors by appointment. We offer both in-person and virtual 
              tour options.
            </Lead>
          </div>
        </div>
      </section>

      {/* Visit Options */}
      <section className="py-12 md:py-16 bg-beige/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {visitOptions.map((option) => (
              <div 
                key={option.title}
                className="bg-cream p-8 border border-charcoal/10"
              >
                <option.icon className="w-10 h-10 text-olive mb-4" />
                <H3 className="mb-3">{option.title}</H3>
                <Body className="mb-6">{option.description}</Body>
                <ul className="space-y-2 mb-6">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-charcoal/70 flex items-start">
                      <span className="text-olive mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl(option.href)}>
                    {option.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <H2 className="mb-6">Location & Hours</H2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-olive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal mb-1">Address</p>
                      <Body className="text-charcoal/70">
                        William Louis-Dreyfus Foundation<br />
                        Mount Kisco, New York 10549
                      </Body>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Clock className="w-5 h-5 text-olive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal mb-1">Gallery Hours</p>
                      <Body className="text-charcoal/70">
                        Tuesday – Saturday<br />
                        By appointment only
                      </Body>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Phone className="w-5 h-5 text-olive mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal mb-1">Contact</p>
                      <Body className="text-charcoal/70">
                        Phone: (914) 555-0100<br />
                        <a href="mailto:visits@wldfoundation.org" className="text-olive hover:underline">
                          visits@wldfoundation.org
                        </a>
                      </Body>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-charcoal/10">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-charcoal/50 mt-1 flex-shrink-0" />
                  <Body className="text-sm text-charcoal/60">
                    The gallery is a private space with limited capacity. Advance booking 
                    is required. We typically respond to tour requests within 2 business days.
                  </Body>
                </div>
              </div>
            </div>

            <div className="aspect-square bg-beige/50 overflow-hidden">
              <img 
                src="https://wldfoundation.org/images/gallery/MKG_005.jpg"
                alt="Gallery exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Guidelines */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-8">Visitor Guidelines</H2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <H3 className="mb-4">Before You Visit</H3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-olive mr-2">•</span>
                  <Body>Book your tour at least one week in advance</Body>
                </li>
                <li className="flex items-start">
                  <span className="text-olive mr-2">•</span>
                  <Body>Arrive 10 minutes before your scheduled time</Body>
                </li>
                <li className="flex items-start">
                  <span className="text-olive mr-2">•</span>
                  <Body>Photography is permitted for personal use only</Body>
                </li>
                <li className="flex items-start">
                  <span className="text-olive mr-2">•</span>
                  <Body>Large bags and backpacks should be checked</Body>
                </li>
              </ul>
            </div>
            <div>
              <H3 className="mb-4">Accessibility</H3>
              <Body className="mb-4">
                We are committed to making the gallery accessible to all visitors. 
                The space is wheelchair accessible, and accommodations can be arranged 
                for visitors with specific needs.
              </Body>
              <Body>
                Please let us know when booking if you have any accessibility requirements 
                or questions.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-4">Ready to Visit?</H2>
          <Body className="text-charcoal/60 mb-8 max-w-2xl mx-auto">
            Book your visit to experience the collection firsthand
          </Body>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
              <Link to={createPageUrl('Tours')}>
                Schedule a Visit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-charcoal/20">
              <Link to={createPageUrl('VirtualTourRooms')}>
                Try Virtual Tour
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}