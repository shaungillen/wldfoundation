import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import ArtworkCard from '@/components/cards/ArtworkCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function Gallery() {
  const { data: onViewArtworks = [], isLoading } = useQuery({
    queryKey: ['artworks', 'on_view'],
    queryFn: () => base44.entities.Artwork.filter({ status: 'on_view' }, '-created_date', 50),
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=1920&q=80"
          alt="Mount Kisco Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1440px] mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/70 mb-4 block">
              Visit
            </span>
            <H1 className="text-cream mb-4">Mount Kisco Gallery</H1>
            <p className="text-cream/80 text-lg max-w-2xl">
              Experience the collection in an intimate setting designed 
              for contemplation and discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Visitor Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <H2 className="mb-6">Plan Your Visit</H2>
              <Body className="mb-8 max-w-2xl">
                The Mount Kisco Gallery offers a unique opportunity to experience 
                works from the collection in a setting that encourages close looking 
                and quiet engagement. All visits are by appointment, ensuring an 
                unhurried experience.
              </Body>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-beige/30 p-6">
                  <Clock className="w-6 h-6 text-olive mb-4" />
                  <H3 className="mb-2">Hours</H3>
                  <p className="text-charcoal/70">
                    By appointment only<br />
                    Tuesday – Saturday<br />
                    10:00 AM – 5:00 PM
                  </p>
                </div>
                <div className="bg-beige/30 p-6">
                  <MapPin className="w-6 h-6 text-olive mb-4" />
                  <H3 className="mb-2">Location</H3>
                  <p className="text-charcoal/70">
                    Mount Kisco, NY<br />
                    <span className="text-sm text-charcoal/50">
                      Full address provided upon booking
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-olive/10 p-6 md:p-8 mb-8">
                <H3 className="mb-4">Book a Tour</H3>
                <Body className="mb-6">
                  We offer guided tours for individuals, small groups, and 
                  educational institutions. Tours last approximately 90 minutes 
                  and can be tailored to specific interests.
                </Body>
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl('Tours')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Tour
                  </Link>
                </Button>
              </div>

              <div>
                <H3 className="mb-4">Accessibility</H3>
                <Body>
                  The gallery is wheelchair accessible. If you require 
                  accommodations, please let us know when booking your visit. 
                  We are committed to making the collection accessible to all.
                </Body>
                <Link 
                  to={createPageUrl('Accessibility')}
                  className="inline-flex items-center text-olive mt-4 hover:underline"
                >
                  View Accessibility Information
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Contact Card */}
            <div>
              <div className="bg-white p-6 border border-charcoal/10 sticky top-24">
                <H3 className="mb-6">Contact</H3>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:visits@wldfoundation.org"
                    className="flex items-center text-charcoal/70 hover:text-olive transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-3 text-olive" />
                    visits@wldfoundation.org
                  </a>
                  <a 
                    href="tel:+19145551234"
                    className="flex items-center text-charcoal/70 hover:text-olive transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3 text-olive" />
                    (914) 555-1234
                  </a>
                </div>

                <hr className="my-6 border-charcoal/10" />

                <Button asChild className="w-full bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl('Tours')}>
                    Request a Visit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currently On View */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-2 block">
                Currently On View
              </span>
              <H2>Works in the Gallery</H2>
            </div>
            <Button asChild variant="outline" className="border-charcoal/20">
              <Link to={createPageUrl('Collection')}>
                Full Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5]" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          ) : onViewArtworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {onViewArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} showStatus={false} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white border border-charcoal/10">
              <Body className="text-charcoal/60 mb-4">
                Installation information coming soon.
              </Body>
              <Button asChild variant="outline">
                <Link to={createPageUrl('Collection')}>
                  Browse Full Collection
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Can't Visit in Person?</H2>
          <Lead className="mb-8 max-w-2xl mx-auto">
            Explore the gallery from anywhere with our immersive 360° virtual tour, 
            complete with curatorial audio guides and detailed artwork information.
          </Lead>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('VirtualTour')}>
              Start Virtual Tour
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}