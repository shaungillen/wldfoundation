import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, Lead, Body } from '@/components/ui/typography';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              About
            </span>
            <H1 className="mb-6">
              Stewardship, Education, and the Art of Sharing
            </H1>
            <Lead>
              The William Louis-Dreyfus Foundation preserves and shares a remarkable collection 
              of contemporary art, ensuring these works remain accessible through museum loans, 
              educational programs, and gallery visits.
            </Lead>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <H2 className="mb-6">Our Mission</H2>
              <Body className="mb-4">
                For over four decades, William Louis-Dreyfus assembled one of the most significant 
                private collections of contemporary art in the United States—focusing on emerging 
                artists and self-taught creators who followed their own vision.
              </Body>
              <Body className="mb-6">
                The Foundation continues this legacy through active stewardship, ensuring these works 
                remain accessible to the public through strategic partnerships with museums, universities, 
                and cultural institutions worldwide.
              </Body>
              <Link 
                to={createPageUrl('Collection')}
                className="text-olive hover:underline inline-flex items-center"
              >
                Explore the Collection <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div>
              <H2 className="mb-6">Core Values</H2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-charcoal mb-2">Stewardship</h3>
                  <Body className="text-sm text-charcoal/70">
                    We are caretakers, not owners. Every decision considers long-term preservation 
                    and accessibility for future generations.
                  </Body>
                </div>
                <div>
                  <h3 className="font-medium text-charcoal mb-2">Access</h3>
                  <Body className="text-sm text-charcoal/70">
                    Great art should not be hidden away. We continually seek new ways to share 
                    the collection with diverse audiences worldwide.
                  </Body>
                </div>
                <div>
                  <h3 className="font-medium text-charcoal mb-2">Education</h3>
                  <Body className="text-sm text-charcoal/70">
                    We support scholarship, publish research, and create resources that deepen 
                    understanding of the artists and movements in the collection.
                  </Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-beige/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-8">Learn More</H2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to={createPageUrl('William')}
              className="p-6 bg-cream border border-charcoal/10 hover:border-olive transition-colors"
            >
              <h3 className="font-serif text-xl text-charcoal mb-2">William Louis-Dreyfus</h3>
              <p className="text-sm text-charcoal/60 mb-4">
                Discover the collector behind the collection
              </p>
              <span className="text-sm text-olive inline-flex items-center">
                Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </Link>

            <Link 
              to={createPageUrl('Programs')}
              className="p-6 bg-cream border border-charcoal/10 hover:border-olive transition-colors"
            >
              <h3 className="font-serif text-xl text-charcoal mb-2">Programs</h3>
              <p className="text-sm text-charcoal/60 mb-4">
                How we share the collection with the world
              </p>
              <span className="text-sm text-olive inline-flex items-center">
                View programs <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </Link>

            <Link 
              to={createPageUrl('Governance')}
              className="p-6 bg-cream border border-charcoal/10 hover:border-olive transition-colors"
            >
              <h3 className="font-serif text-xl text-charcoal mb-2">Governance</h3>
              <p className="text-sm text-charcoal/60 mb-4">
                Leadership and caretakers of the Foundation
              </p>
              <span className="text-sm text-olive inline-flex items-center">
                Meet the team <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}