import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, Lead, Body, Quote } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from 'lucide-react';

const timeline = [
  { year: '1932', event: 'Born in New York City' },
  { year: '1954', event: 'Graduated from Duke University' },
  { year: '1960s', event: 'Began collecting prints and works on paper' },
  { year: '1970s', event: 'Expanded collection to include painting and sculpture' },
  { year: '1980s', event: 'Focused on underrepresented artists and emerging voices' },
  { year: '1990s', event: 'Began systematic Art Loan Program with museums' },
  { year: '2000s', event: 'Established Mount Kisco Gallery for public access' },
  { year: '2016', event: 'Passed away; Foundation established in his honor' },
];

export default function William() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                The Collector
              </span>
              <H1 className="mb-6">
                William Louis-Dreyfus
              </H1>
              <p className="text-charcoal/50 text-lg mb-6">1932 – 2016</p>
              <Lead>
                Lawyer, businessman, and a principal of the Louis Dreyfus Group 
                from 1969 until his retirement in 2006. A passionate supporter 
                of the arts who received the Smithsonian American Art Museum's 
                Robert and Betsy Feinberg Prize for the Advancement of American 
                Art award in 2014.
              </Lead>
            </div>
            <div className="aspect-[4/5] bg-beige/50 overflow-hidden">
              <img 
                src="https://wldfoundation.org/images/image-foundation.jpg"
                alt="William Louis-Dreyfus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <H2 className="mb-8">A Life in Art</H2>
            
            <Body className="mb-6">
              William Louis-Dreyfus was born into a family of commodities traders, 
              but his true passions lay elsewhere—in poetry, in art, and in the 
              quiet observation of human creativity. While he spent his professional 
              life in business, eventually leading the family's trading company, 
              his deepest commitment was to building a collection that reflected 
              his personal vision.
            </Body>
            
            <Body className="mb-6">
              Unlike many collectors of his generation, William was never drawn 
              to the market's darlings or the fashionable names of the moment. 
              Instead, he followed his own eye, acquiring work by artists who 
              were often undervalued or overlooked—many of them women, artists 
              of color, or those working in unfashionable mediums.
            </Body>

            <Quote author="William Louis-Dreyfus" className="my-10">
              I never bought a work of art as an investment. I bought them 
              because they spoke to me, because I couldn't imagine not having 
              them in my life.
            </Quote>

            <Body className="mb-6">
              His approach to collecting was methodical yet deeply personal. 
              He visited studios, attended exhibitions at smaller galleries, 
              and developed lasting relationships with artists whose work he 
              admired. Many of the artists he collected early in their careers 
              have since achieved major recognition—though William never 
              collected for the prospect of fame or fortune.
            </Body>

            <Body className="mb-6">
              Beyond collecting, William was a devoted poet. He published 
              several volumes of poetry and found in verse a complement to 
              his engagement with visual art. Both, he believed, required 
              attention, patience, and a willingness to see beyond the surface.
            </Body>

            <Body>
              His philanthropic work, particularly his longtime support of 
              Harlem Children's Zone, reflected the same values: a belief in 
              education, in access, and in the transformative power of 
              sustained attention and care.
            </Body>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Timeline
            </span>
            <H2 className="mb-12">A Life in Milestones</H2>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-charcoal/10" />
              
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-20 pb-8 last:pb-0">
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-olive border-4 border-cream" />
                  <span className="text-xs uppercase tracking-widest text-olive block mb-1">
                    {item.year}
                  </span>
                  <p className="text-charcoal/80">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poetry */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-10 h-10 text-olive mx-auto mb-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Poetry
            </span>
            <H2 className="text-cream mb-8">The Poet's Eye</H2>
            
            <p className="text-cream/70 mb-8">
              In addition to collecting visual art, William was a published poet. 
              His verse shares qualities with his collecting: precision, emotional 
              depth, and an attention to the overlooked.
            </p>

            <div className="bg-cream/5 p-8 rounded-sm mb-8">
              <p className="font-serif text-xl text-cream/90 italic leading-relaxed mb-4">
                The canvas holds what words cannot—<br />
                a silence more articulate<br />
                than any phrase I've caught<br />
                or shaped or tried to make.
              </p>
              <cite className="text-cream/50 text-sm not-italic">
                — From "Museum Hours," 2003
              </cite>
            </div>

            <Button variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
              <BookOpen className="w-4 h-4 mr-2" />
              Poetry Archive (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Collecting Philosophy */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Philosophy
            </span>
            <H2 className="mb-8">On Collecting</H2>

            <div className="space-y-8">
              <div className="border-l-2 border-olive pl-6">
                <H3 className="mb-4">Look Where Others Don't</H3>
                <Body>
                  William believed that the most rewarding discoveries came from 
                  looking beyond the consensus. He frequented smaller galleries, 
                  artist studios, and regional art fairs, finding exceptional 
                  work that larger collectors overlooked.
                </Body>
              </div>

              <div className="border-l-2 border-olive pl-6">
                <H3 className="mb-4">Collect with Conviction</H3>
                <Body>
                  He never bought to match trends or impress others. Each 
                  acquisition reflected genuine enthusiasm—works he wanted 
                  to live with, return to, and understand more deeply over time.
                </Body>
              </div>

              <div className="border-l-2 border-olive pl-6">
                <H3 className="mb-4">Support the Living</H3>
                <Body>
                  While he appreciated historical work, William was particularly 
                  committed to supporting living artists. He believed that 
                  collectors bore a responsibility to the creative community.
                </Body>
              </div>

              <div className="border-l-2 border-olive pl-6">
                <H3 className="mb-4">Share What You Have</H3>
                <Body>
                  From the beginning, William lent works to institutions. 
                  He saw the collection not as a private treasure but as 
                  a resource for education and public enrichment.
                </Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <H2 className="mb-6">Explore His Legacy</H2>
            <Lead className="mb-8">
              Discover the collection that William spent a lifetime building, 
              and the artists whose work he championed.
            </Lead>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                <Link to={createPageUrl('Collection')}>
                  Browse Collection
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Artists')}>
                  View Artists
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}