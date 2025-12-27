import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H2, Lead, Quote } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Our Mission
            </span>
            <H2 className="mb-6">
              Preserving & Sharing a Lifetime of Collecting
            </H2>
            <Lead className="mb-6">
              The William Louis-Dreyfus Foundation is dedicated to the stewardship, 
              study, and public sharing of a significant private collection of 
              contemporary art assembled over four decades.
            </Lead>
            <p className="text-charcoal/60 mb-8">
              Through our Art Loan Program, educational initiatives, and the Mount Kisco 
              Gallery, we honor William's vision of art as a living, breathing dialogue 
              between artists, works, and viewers. Every loan, every tour, every encounter 
              extends the reach of these remarkable works.
            </p>
            <Button asChild variant="outline" className="border-charcoal/20 hover:bg-charcoal/5">
              <Link to={createPageUrl('About')}>
                About the Foundation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Portrait & Quote */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] bg-beige/50 overflow-hidden">
                <img 
                  src="https://wldfoundation.org/images/image-foundation.jpg"
                  alt="William Louis-Dreyfus"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-6 md:p-8 shadow-lg -mt-20 mx-4 md:mx-8 relative z-10">
                <Quote author="William Louis-Dreyfus">
                  Collecting is not about possession—it's about preservation, 
                  about ensuring these works continue their conversation with 
                  the world.
                </Quote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}