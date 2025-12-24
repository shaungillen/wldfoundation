import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body, Quote } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              About the Foundation
            </span>
            <H1 className="mb-6">
              Stewardship, Education, and the Art of Sharing
            </H1>
            <Lead>
              The William Louis-Dreyfus Foundation preserves and shares a 
              remarkable collection of contemporary art, honoring the vision 
              of a collector who believed that art belongs to the world.
            </Lead>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Our Mission
              </span>
              <H2 className="mb-6">
                A Collection in Service of the Public Good
              </H2>
              <Body className="mb-6">
                For over four decades, William Louis-Dreyfus assembled one of 
                the most significant private collections of contemporary art 
                in the United States. His approach was distinctive: he collected 
                not for status or speculation, but out of genuine passion for 
                the work and deep respect for artists.
              </Body>
              <Body className="mb-6">
                The Foundation continues this legacy through active stewardship—
                lending works to museums and institutions worldwide, supporting 
                scholarship and education, and welcoming visitors to experience 
                the collection at our Mount Kisco Gallery.
              </Body>
              <Body>
                We believe that great art should be accessible. Through our 
                programs, thousands of people each year encounter these works, 
                whether in person at a partner institution, through our virtual 
                tours, or in the pages of scholarly publications.
              </Body>
            </div>
            <div>
              <div className="aspect-[4/5] bg-beige/50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=800&q=80"
                  alt="Gallery interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Our Values
            </span>
            <H2>Principles That Guide Us</H2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-olive">01</span>
              </div>
              <H3 className="mb-4">Stewardship</H3>
              <Body>
                We are caretakers, not owners. Every decision we make considers 
                the long-term preservation and accessibility of these works for 
                future generations.
              </Body>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-olive">02</span>
              </div>
              <H3 className="mb-4">Access</H3>
              <Body>
                Great art should not be hidden away. Through loans, tours, and 
                digital initiatives, we continually seek new ways to share the 
                collection with diverse audiences.
              </Body>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-olive">03</span>
              </div>
              <H3 className="mb-4">Education</H3>
              <Body>
                We support scholarship, publish research, and create resources 
                that deepen understanding of the artists and movements 
                represented in the collection.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 md:py-24 bg-charcoal">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream/90 italic leading-relaxed mb-8">
              "The true value of a collection lies not in what you own, 
              but in what you share. Art that is seen, studied, and loved 
              fulfills its purpose."
            </blockquote>
            <cite className="text-cream/60 text-sm not-italic">
              — William Louis-Dreyfus, 1932–2016
            </cite>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] bg-beige/50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="William Louis-Dreyfus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Our History
              </span>
              <H2 className="mb-6">
                A Collector's Journey
              </H2>
              <Body className="mb-6">
                William Louis-Dreyfus began collecting art in the 1960s, 
                initially drawn to works on paper and prints. Over time, 
                his interests expanded to embrace painting, sculpture, and 
                photography, always with an emphasis on artists working 
                outside the mainstream.
              </Body>
              <Body className="mb-6">
                He was particularly drawn to artists who had been overlooked 
                or undervalued—women, artists of color, and those working in 
                unfashionable styles or mediums. Many artists he championed 
                early have since received major museum retrospectives.
              </Body>
              <Body className="mb-8">
                Following William's passing in 2016, the Foundation was 
                established to ensure his collection would continue to 
                be shared and studied. Today, works from the collection 
                are on view at partner institutions around the world.
              </Body>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('William')}>
                  Learn More About William
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <H2 className="mb-6">Experience the Collection</H2>
            <Lead className="mb-8">
              Whether through a visit to our gallery, a virtual tour, or 
              exploring the collection online, we invite you to discover 
              the artists and works that make this collection extraordinary.
            </Lead>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                <Link to={createPageUrl('Collection')}>
                  Browse Collection
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Tours')}>
                  Plan a Visit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}