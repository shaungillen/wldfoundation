import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, GraduationCap, Users } from 'lucide-react';
import LoanCard from '@/components/cards/LoanCard';
import { Skeleton } from "@/components/ui/skeleton";

const programAreas = [
  {
    icon: Building,
    title: 'Art Loan Program',
    description: 'We actively share works from the collection with museums, universities, and cultural institutions worldwide.',
    href: 'ArtLoanProgram',
    linkText: 'Explore Loans',
  },
  {
    icon: GraduationCap,
    title: 'Education & Research',
    description: 'Supporting scholarly research and educational initiatives that advance the understanding of contemporary art.',
    href: 'HarlemChildrensZone',
    linkText: 'Learn More',
  },
  {
    icon: Users,
    title: 'Partnerships',
    description: 'Building meaningful collaborations with institutions that share our commitment to public engagement with art.',
    href: 'ArtLoanProgram',
    linkText: 'View Partners',
  },
];

export default function Programs() {
  const { data: featuredLoans = [], isLoading } = useQuery({
    queryKey: ['loans', 'featured'],
    queryFn: () => base44.entities.LoanCaseStudy.filter({ featured: true }, '-start_date', 3),
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Programs
            </span>
            <H1 className="mb-6">
              Engaging With Art & Community
            </H1>
            <Lead>
              Our programs reflect a commitment to sharing art beyond our walls—
              through loans, educational partnerships, and community engagement.
            </Lead>
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-12 md:py-16 bg-beige/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {programAreas.map((program) => (
              <div 
                key={program.title}
                className="bg-cream p-8 border border-charcoal/10"
              >
                <program.icon className="w-10 h-10 text-olive mb-4" />
                <H3 className="mb-3">{program.title}</H3>
                <Body className="mb-6">{program.description}</Body>
                <Button asChild variant="ghost" className="px-0 text-charcoal hover:text-olive">
                  <Link to={createPageUrl(program.href)}>
                    {program.linkText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Loans */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <H2 className="mb-2">Recent Exhibitions</H2>
              <Body className="text-charcoal/60">
                Works from the collection recently on view
              </Body>
            </div>
            <Button asChild variant="outline" className="border-charcoal/20 hidden md:flex">
              <Link to={createPageUrl('ArtLoanProgram')}>
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3]" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : featuredLoans.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-beige/20">
              <Body className="text-charcoal/60">
                No featured exhibitions at this time
              </Body>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="border-charcoal/20">
              <Link to={createPageUrl('ArtLoanProgram')}>
                View All Exhibitions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-4 text-cream">Partner With Us</H2>
          <Body className="text-cream/80 mb-8 max-w-2xl mx-auto">
            If you're a curator, educator, or institutional leader interested in 
            collaborating with the William Louis-Dreyfus Foundation, we'd like to hear from you.
          </Body>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-olive hover:bg-olive/90 text-cream border-0">
              <Link to={createPageUrl('LoanInquiry')}>
                Submit Loan Inquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
              <Link to={createPageUrl('Contact')}>
                General Contact
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}