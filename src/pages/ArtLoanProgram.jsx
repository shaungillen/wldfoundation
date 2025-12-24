import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Calendar, Globe, Users } from 'lucide-react';
import LoanCard from '@/components/cards/LoanCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtLoanProgram() {
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
  });

  const featuredLoans = loans.filter(l => l.featured).slice(0, 3);
  const allLoans = loans;

  // Mock stats
  const stats = {
    institutions: 45,
    yearsActive: 25,
    totalLoans: 120,
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-charcoal text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Art Loan Program
            </span>
            <H1 className="text-cream mb-6">
              Sharing Art with the World
            </H1>
            <Lead className="text-cream/80">
              Since the 1990s, works from the collection have traveled to 
              museums, universities, and cultural institutions worldwide—
              extending William's vision of art as a shared resource.
            </Lead>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <Building2 className="w-8 h-8 text-olive mx-auto mb-3" />
              <p className="font-serif text-4xl text-charcoal mb-1">{stats.institutions}+</p>
              <Caption>Partner Institutions</Caption>
            </div>
            <div>
              <Calendar className="w-8 h-8 text-olive mx-auto mb-3" />
              <p className="font-serif text-4xl text-charcoal mb-1">{stats.yearsActive}</p>
              <Caption>Years Active</Caption>
            </div>
            <div>
              <Globe className="w-8 h-8 text-olive mx-auto mb-3" />
              <p className="font-serif text-4xl text-charcoal mb-1">{stats.totalLoans}+</p>
              <Caption>Total Loans</Caption>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <H2 className="mb-6">Why We Lend</H2>
              <Body className="mb-6">
                William Louis-Dreyfus believed that a private collection 
                should not remain private. Throughout his life, he actively 
                lent works to institutions, seeing each loan as an opportunity 
                for broader engagement and scholarly study.
              </Body>
              <Body className="mb-6">
                The Art Loan Program continues this practice. We work with 
                museums of all sizes, from major metropolitan institutions 
                to university galleries and regional art centers. Our goal 
                is to ensure that these works are seen, studied, and 
                appreciated by diverse audiences.
              </Body>
              <Body>
                Each loan is carefully considered to ensure proper care, 
                appropriate context, and meaningful educational impact. 
                We prioritize exhibitions that advance scholarship or 
                bring art to underserved communities.
              </Body>
            </div>
            <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                alt="Museum installation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredLoans.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-olive mb-2 block">
                  Featured
                </span>
                <H2>Recent & Notable Loans</H2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {featuredLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Loans Archive */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <H2 className="mb-12">Loan Archive</H2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3]" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : allLoans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-beige/30 border border-charcoal/10">
              <Body className="text-charcoal/60 mb-4">
                Loan archive coming soon.
              </Body>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="py-16 md:py-24 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="w-10 h-10 text-olive mx-auto mb-6" />
            <H2 className="text-cream mb-6">Interested in a Loan?</H2>
            <Body className="text-cream/70 mb-8">
              We welcome inquiries from museums, galleries, and cultural 
              institutions. If you're planning an exhibition and are 
              interested in works from our collection, we'd be glad to 
              hear from you.
            </Body>
            <Button asChild className="bg-cream text-charcoal hover:bg-cream/90">
              <Link to={createPageUrl('LoanInquiry')}>
                Submit an Inquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}