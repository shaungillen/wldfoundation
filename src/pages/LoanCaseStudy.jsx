import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Calendar, ExternalLink, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';

export default function LoanCaseStudy() {
  const urlParams = new URLSearchParams(window.location.search);
  const loanId = urlParams.get('id');

  const { data: loan, isLoading: loanLoading } = useQuery({
    queryKey: ['loan', loanId],
    queryFn: () => base44.entities.LoanCaseStudy.filter({ id: loanId }),
    enabled: !!loanId,
    select: (data) => data[0],
  });

  const { data: artworks = [] } = useQuery({
    queryKey: ['artworks', 'loan', loanId],
    queryFn: () => base44.entities.Artwork.list('-created_date', 500),
    select: (data) => data.filter(a => loan?.artwork_ids?.includes(a.id)),
    enabled: !!loan?.artwork_ids?.length,
  });

  if (loanLoading) {
    return (
      <div className="min-h-screen py-12 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-[21/9] mb-8" />
          <Skeleton className="h-12 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen py-24 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <H1 className="mb-4">Case Study Not Found</H1>
          <Body className="mb-8">The requested loan case study could not be found.</Body>
          <Button asChild>
            <Link to={createPageUrl('ArtLoanProgram')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Art Loan Program
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isActive = loan.end_date && new Date(loan.end_date) > new Date();

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link 
          to={createPageUrl('ArtLoanProgram')}
          className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Art Loan Program
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Hero Image */}
          {loan.hero_image && (
            <div className="aspect-[21/9] bg-beige/50 overflow-hidden mb-8">
              <img 
                src={loan.hero_image}
                alt={loan.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {isActive && (
              <Badge className="bg-olive/20 text-olive">Current Exhibition</Badge>
            )}
            {loan.location && (
              <span className="flex items-center text-sm text-charcoal/60">
                <MapPin className="w-4 h-4 mr-1" />
                {loan.location}
              </span>
            )}
          </div>

          <H1 className="mb-4">{loan.title}</H1>
          
          <p className="text-xl text-charcoal/70 mb-6">{loan.institution}</p>

          {/* Dates */}
          {(loan.start_date || loan.end_date) && (
            <p className="flex items-center text-charcoal/60 mb-8">
              <Calendar className="w-5 h-5 mr-2" />
              {loan.start_date && format(new Date(loan.start_date), 'MMMM d, yyyy')}
              {loan.start_date && loan.end_date && ' — '}
              {loan.end_date && format(new Date(loan.end_date), 'MMMM d, yyyy')}
            </p>
          )}
        </div>
      </section>

      {/* Overview */}
      {loan.overview && (
        <section className="py-12 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Caption className="block mb-4">Overview</Caption>
              <Lead>{loan.overview}</Lead>
            </div>
          </div>
        </section>
      )}

      {/* Institution Info */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <H2 className="mb-6">Partner Institution</H2>
              <div className="bg-beige/30 p-6 mb-6">
                {loan.institution_logo && (
                  <img 
                    src={loan.institution_logo}
                    alt={loan.institution}
                    className="h-12 mb-4"
                  />
                )}
                <h3 className="font-serif text-xl text-charcoal mb-2">{loan.institution}</h3>
                {loan.location && (
                  <p className="text-charcoal/60 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {loan.location}
                  </p>
                )}
              </div>
              {loan.external_link && (
                <Button asChild variant="outline" className="border-charcoal/20">
                  <a href={loan.external_link} target="_blank" rel="noopener noreferrer">
                    Visit Institution
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>

            {/* Exhibition Context */}
            {loan.exhibition_context && (
              <div className="lg:col-span-2">
                <H3 className="mb-4">Exhibition Context</H3>
                <Body className="whitespace-pre-line">{loan.exhibition_context}</Body>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Artworks Loaned */}
      {artworks.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Works in This Exhibition</H2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} showStatus={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Installation Images */}
      {loan.installation_images?.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Installation Views</H2>
            <div className="grid md:grid-cols-2 gap-6">
              {loan.installation_images.map((image, index) => (
                <div key={index} className="aspect-[4/3] bg-beige/50 overflow-hidden">
                  <img 
                    src={image}
                    alt={`Installation view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Print Materials */}
      {loan.print_materials?.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Print & Physical Materials</H2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loan.print_materials.map((material, index) => (
                <a
                  key={index}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-4 border border-charcoal/10 hover:border-olive/30 transition-colors"
                >
                  <FileText className="w-8 h-8 text-olive flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal truncate">{material.title}</p>
                    <p className="text-sm text-charcoal/60">{material.type}</p>
                  </div>
                  <Download className="w-5 h-5 text-charcoal/40 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact */}
      {loan.impact && (
        <section className="py-16 md:py-24 bg-charcoal text-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Caption className="text-cream/50 block mb-4">Impact & Significance</Caption>
              <Lead className="text-cream/90">{loan.impact}</Lead>
              {loan.visitor_count && (
                <p className="mt-8 text-cream/60">
                  Estimated visitors: {loan.visitor_count.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Explore More Loans</H2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
              <Link to={createPageUrl('ArtLoanProgram')}>
                View All Loans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-charcoal/20">
              <Link to={createPageUrl('LoanInquiry')}>
                Inquire About a Loan
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}