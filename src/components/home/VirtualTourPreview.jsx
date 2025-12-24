import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H2, Lead } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Play, MapPin } from 'lucide-react';

export default function VirtualTourPreview() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image with Play Button */}
          <div className="relative group">
            <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=1200&q=80"
                alt="Mount Kisco Gallery interior"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors" />
            </div>
            
            <Link 
              to={createPageUrl('VirtualTour')}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Start virtual tour"
            >
              <div className="w-20 h-20 rounded-full bg-cream/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-charcoal ml-1" />
              </div>
            </Link>

            {/* Floor Plan Teaser */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-sm shadow-md hidden md:flex items-center gap-3">
              <MapPin className="w-5 h-5 text-olive" />
              <div>
                <p className="text-xs text-charcoal/60">Gallery Floor Plan</p>
                <p className="text-sm text-charcoal font-medium">3 Exhibition Spaces</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Virtual Experience
            </span>
            <H2 className="mb-6">
              Explore the Gallery from Anywhere
            </H2>
            <Lead className="mb-6">
              Step inside our Mount Kisco Gallery through an immersive 
              360° virtual tour. Navigate through the collection at your 
              own pace, zooming in on works that capture your attention.
            </Lead>
            <p className="text-charcoal/60 mb-8">
              Our virtual tour includes curatorial audio guides, detailed 
              artwork information, and thematic pathways through the collection. 
              Perfect for educators, researchers, and art enthusiasts who 
              cannot visit in person.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                <Link to={createPageUrl('VirtualTour')}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Virtual Tour
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Gallery')}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Plan an In-Person Visit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}