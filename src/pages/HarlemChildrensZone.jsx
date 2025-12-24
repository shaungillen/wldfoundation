import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body, Quote } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Heart } from 'lucide-react';

export default function HarlemChildrensZone() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Community Partner
              </span>
              <H1 className="mb-6">
                Harlem Children's Zone
              </H1>
              <Lead>
                A pioneering organization transforming the lives of children 
                and families in Central Harlem through comprehensive, 
                cradle-to-career support.
              </Lead>
            </div>
            <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                alt="Education and community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Relationship */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <H2 className="mb-8">A Lasting Commitment</H2>
            <Body className="mb-6">
              William Louis-Dreyfus was an early and steadfast supporter of 
              Harlem Children's Zone, drawn to its ambitious vision and 
              evidence-based approach. He believed that investing in children 
              was the most meaningful contribution one could make.
            </Body>
            <Body className="mb-6">
              His involvement went beyond financial support. He served on 
              the board, visited programs regularly, and championed the 
              organization's work within his network. The relationship 
              reflected his core values: a belief in education, a commitment 
              to equity, and an understanding that systemic change requires 
              sustained effort.
            </Body>
            <Quote author="William Louis-Dreyfus">
              Every child deserves the chance to discover what they're capable of. 
              That's not charity—that's common sense.
            </Quote>
          </div>
        </div>
      </section>

      {/* About HCZ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <H2 className="mb-8">About Harlem Children's Zone</H2>
              <Body className="mb-6">
                Founded in 1970, Harlem Children's Zone (HCZ) serves more than 
                27,000 children and adults through a comprehensive pipeline 
                of education, social services, and community-building programs 
                in a 97-block area of Central Harlem.
              </Body>
              <Body className="mb-6">
                HCZ's innovative approach—providing continuous, intensive 
                support from birth through college and career—has become a 
                national model. The organization's results have been studied 
                extensively and replicated in communities across the country.
              </Body>
              <Body>
                Programs include early childhood education, K-12 charter 
                schools, college preparation, health services, community 
                centers, and family support programs. The goal is to create 
                a "tipping point" in the neighborhood where children can 
                succeed regardless of background.
              </Body>
            </div>
            <div className="space-y-6">
              <div className="bg-beige/30 p-6">
                <H3 className="mb-2">27,000+</H3>
                <Body>Children and adults served annually</Body>
              </div>
              <div className="bg-beige/30 p-6">
                <H3 className="mb-2">97 Blocks</H3>
                <Body>Of Central Harlem covered by programs</Body>
              </div>
              <div className="bg-beige/30 p-6">
                <H3 className="mb-2">50+ Years</H3>
                <Body>Of continuous service to the community</Body>
              </div>
              <div className="bg-beige/30 p-6">
                <H3 className="mb-2">90%+</H3>
                <Body>High school graduation rate among program participants</Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation's Role */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-10 h-10 text-olive mx-auto mb-6" />
            <H2 className="text-cream mb-6">Continuing the Legacy</H2>
            <Body className="text-cream/70 mb-8">
              The William Louis-Dreyfus Foundation continues to support 
              Harlem Children's Zone, honoring William's belief that art 
              and education are complementary forces for human flourishing.
            </Body>
            <Body className="text-cream/70 mb-8">
              We encourage friends of the Foundation to learn more about 
              HCZ's transformative work and consider supporting their mission.
            </Body>
            <Button asChild className="bg-cream text-charcoal hover:bg-cream/90">
              <a href="https://hcz.org" target="_blank" rel="noopener noreferrer">
                Visit Harlem Children's Zone
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Other Ways to Engage</H2>
          <Lead className="mb-8 max-w-2xl mx-auto">
            Whether through visiting the gallery, subscribing to our newsletter, 
            or exploring the collection, there are many ways to connect with 
            the Foundation.
          </Lead>
          <Button asChild variant="outline" className="border-charcoal/20">
            <Link to={createPageUrl('GetInvolved')}>
              Get Involved
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}