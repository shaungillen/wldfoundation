import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Body, Quote, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';
import ArtistTimeline from '@/components/artist/ArtistTimeline';

export default function ArtistModal({ artistId }) {
  const { data: artist, isLoading: artistLoading } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => base44.entities.Artist.filter({ id: artistId }),
    enabled: !!artistId,
    select: (data) => data[0],
  });

  const { data: artworks = [] } = useQuery({
    queryKey: ['artworks', 'artist', artistId],
    queryFn: () => base44.entities.Artwork.filter({ artist_id: artistId }, '-year', 100),
    enabled: !!artistId,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ['loans', 'artist', artistId],
    queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
    enabled: !!artistId,
  });

  const artistLoans = loans.filter(loan => {
    const loanArtworkIds = loan.artwork_ids || [];
    return artworks.some(aw => loanArtworkIds.includes(aw.id));
  });

  const generateTimeline = () => {
    if (!artist) return [];
    
    const events = [];
    
    if (artist.lifespan) {
      const birthYear = artist.lifespan.match(/\d{4}/)?.[0];
      if (birthYear) {
        events.push({
          year: birthYear,
          title: 'Born',
          description: `${artist.name} was born`,
          location: artist.nationality || ''
        });
      }
    }
    
    const significantWorks = artworks
      .filter(aw => aw.year)
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
      .slice(0, 5);
    
    significantWorks.forEach(work => {
      events.push({
        year: work.year,
        title: work.title,
        description: `Created ${work.medium}`,
        location: ''
      });
    });
    
    artistLoans.slice(0, 3).forEach(loan => {
      const year = loan.start_date?.split('-')[0];
      if (year) {
        events.push({
          year: year,
          title: `Exhibition: ${loan.title}`,
          description: loan.overview || `Work exhibited at ${loan.institution}`,
          location: loan.location
        });
      }
    });
    
    return events.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  };

  const timeline = generateTimeline();
  const isCornerstone = artist?.tier === 'cornerstone';
  const isShowcase = artist?.tier === 'showcase' || isCornerstone;

  if (artistLoading) {
    return (
      <div className="p-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <Skeleton className="aspect-[3/4]" />
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="p-8 text-center">
        <H1 className="mb-4">Artist Not Found</H1>
        <Body>The requested artist could not be found.</Body>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="p-6 md:p-8 lg:p-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Portrait */}
          <div>
            <div className="aspect-[3/4] bg-beige/50 overflow-hidden">
              {artist.portrait_url ? (
                <img 
                  src={artist.portrait_url}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-beige/50">
                  <span className="font-serif text-6xl text-charcoal/20">
                    {artist.name?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {artist.nationality && (
                <Badge variant="outline" className="border-charcoal/20">
                  {artist.nationality}
                </Badge>
              )}
              {artist.medium_focus?.map((medium) => (
                <Badge key={medium} variant="outline" className="border-charcoal/20">
                  {medium}
                </Badge>
              ))}
            </div>

            {/* Name */}
            <H1 id="modal-title" className="mb-2">{artist.name}</H1>
            {artist.lifespan && (
              <p className="text-lg text-charcoal/60 mb-6">{artist.lifespan}</p>
            )}

            {/* Short Bio */}
            {artist.bio_short && (
              <Body className="text-lg mb-6">{artist.bio_short}</Body>
            )}

            {/* Quote */}
            {artist.quote && (
              <Quote author={artist.name} className="mb-6">
                {artist.quote}
              </Quote>
            )}

            {/* Long Bio */}
            {artist.bio_long && (
              <div className="mb-6">
                <Body className="whitespace-pre-line">{artist.bio_long}</Body>
              </div>
            )}

            {/* Interview Link */}
            {isShowcase && artist.interview_url && (
              <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream mb-6">
                <a href={artist.interview_url} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Interview
                </a>
              </Button>
            )}

            {/* Stats */}
            <div className="flex gap-8 py-6 border-t border-charcoal/10">
              <div>
                <p className="font-serif text-3xl text-charcoal">{artworks.length}</p>
                <Caption>Works Acquired</Caption>
              </div>
              {artistLoans.length > 0 && (
                <div>
                  <p className="font-serif text-3xl text-charcoal">{artistLoans.length}</p>
                  <Caption>Exhibition Loans</Caption>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="px-6 md:px-8 lg:px-12 py-8 bg-beige/30">
          <H2 className="mb-8">Career Highlights</H2>
          <ArtistTimeline events={timeline} />
        </section>
      )}

      {/* Works Gallery */}
      {artworks.length > 0 && (
        <section className="p-6 md:p-8 lg:p-12">
          <H2 className="mb-6">Works in Collection</H2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {artworks.slice(0, 6).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
          {artworks.length > 6 && (
            <div className="mt-6 text-center">
              <Body className="text-charcoal/60">
                + {artworks.length - 6} more works
              </Body>
            </div>
          )}
        </section>
      )}

      {/* Exhibition History */}
      {isShowcase && artistLoans.length > 0 && (
        <section className="px-6 md:px-8 lg:px-12 py-8 bg-beige/30">
          <H2 className="mb-6">Exhibition History</H2>
          <div className="space-y-3">
            {artistLoans.slice(0, 3).map((loan) => (
              <Link 
                key={loan.id}
                to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                className="block bg-cream p-4 border border-charcoal/10 hover:border-olive/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-lg text-charcoal">{loan.title}</p>
                    <p className="text-sm text-charcoal/60">
                      {loan.institution}, {loan.location}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}