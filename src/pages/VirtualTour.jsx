import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { MapPin, Play, Info, Volume2, ArrowRight } from 'lucide-react';

export default function VirtualTour() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Virtual Experience
            </span>
            <H1 className="mb-6">
              360° Virtual Tour
            </H1>
            <Lead>
              Explore the Mount Kisco Gallery from anywhere in the world. 
              Navigate at your own pace, zoom in on works, and access 
              curatorial audio guides.
            </Lead>
          </div>
        </div>
      </section>

      {/* Virtual Tour Placeholder */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="aspect-video bg-charcoal/5 border-2 border-dashed border-charcoal/20 flex flex-col items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-olive/20 flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-olive" />
              </div>
              <H2 className="mb-4">Virtual Tour Coming Soon</H2>
              <Body className="max-w-md mx-auto mb-6">
                We're currently developing an immersive 360° virtual tour 
                experience. In the meantime, explore the collection online 
                or schedule an in-person visit.
              </Body>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl('Collection')}>
                    Browse Collection
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-charcoal/20">
                  <Link to={createPageUrl('Tours')}>
                    Schedule a Visit
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-beige/30 p-6 text-center">
              <MapPin className="w-8 h-8 text-olive mx-auto mb-4" />
              <h3 className="font-serif text-lg text-charcoal mb-2">Navigate Freely</h3>
              <p className="text-sm text-charcoal/60">
                Move through all three gallery spaces at your own pace
              </p>
            </div>
            <div className="bg-beige/30 p-6 text-center">
              <Info className="w-8 h-8 text-olive mx-auto mb-4" />
              <h3 className="font-serif text-lg text-charcoal mb-2">Artwork Details</h3>
              <p className="text-sm text-charcoal/60">
                Click on any work to see full information and zoom capabilities
              </p>
            </div>
            <div className="bg-beige/30 p-6 text-center">
              <Volume2 className="w-8 h-8 text-olive mx-auto mb-4" />
              <h3 className="font-serif text-lg text-charcoal mb-2">Audio Guides</h3>
              <p className="text-sm text-charcoal/60">
                Optional curatorial commentary for selected works
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plan */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Gallery Layout
              </span>
              <H2 className="mb-6">Three Exhibition Spaces</H2>
              <Body className="mb-8">
                The Mount Kisco Gallery comprises three distinct viewing rooms, 
                each designed to foster a different kind of encounter with the 
                work. From intimate study spaces to larger installation areas, 
                the gallery accommodates the full range of the collection.
              </Body>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-olive text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Main Gallery</h4>
                    <p className="text-sm text-charcoal/60">
                      Large-scale paintings and installations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-olive text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Study Room</h4>
                    <p className="text-sm text-charcoal/60">
                      Works on paper and intimate viewing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-olive text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Sculpture Court</h4>
                    <p className="text-sm text-charcoal/60">
                      Three-dimensional works in natural light
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-white border border-charcoal/10 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-charcoal/20 mx-auto mb-4" />
                <p className="text-charcoal/40 text-sm">Floor Plan Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Prefer an In-Person Visit?</H2>
          <Lead className="mb-8 max-w-2xl mx-auto">
            Schedule a guided tour of the Mount Kisco Gallery and experience 
            the collection with curatorial guidance.
          </Lead>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('Tours')}>
              Book a Tour
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}