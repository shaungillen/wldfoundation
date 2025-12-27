import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body, Quote, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';
import ArticleCard from '@/components/cards/ArticleCard';
import ArtistTimeline from '@/components/artist/ArtistTimeline';
import RelatedArtists from '@/components/artist/RelatedArtists';

export default function ArtistDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

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

  const { data: articles = [] } = useQuery({
    queryKey: ['articles', 'artist', artistId],
    queryFn: () => base44.entities.Article.list('-date', 100),
    select: (data) => data.filter(a => a.related_artist_ids?.includes(artistId)),
    enabled: !!artistId,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ['loans', 'artist', artistId],
    queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
    enabled: !!artistId,
  });

  const { data: allArtists = [] } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list('name', 500),
  });

  // Filter loans that include works by this artist
  const artistLoans = loans.filter(loan => {
    const loanArtworkIds = loan.artwork_ids || [];
    return artworks.some(aw => loanArtworkIds.includes(aw.id));
  });

  // Get related artists
  const relatedArtists = allArtists.filter(a => {
    if (a.id === artistId) return false;
    if (artist?.related_artist_ids?.includes(a.id)) return true;
    
    // Find artists with similar tags/medium focus
    const artistTags = artist?.tags || [];
    const artistMediums = artist?.medium_focus || [];
    const otherTags = a.tags || [];
    const otherMediums = a.medium_focus || [];
    
    const hasCommonTag = artistTags.some(tag => otherTags.includes(tag));
    const hasCommonMedium = artistMediums.some(m => otherMediums.includes(m));
    
    return hasCommonTag || hasCommonMedium;
  }).slice(0, 6);

  // Generate timeline from artist data and artworks
  const generateTimeline = () => {
    if (!artist) return [];
    
    const events = [];
    
    // Birth/start
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
    
    // Add major works from collection
    const significantWorks = artworks
      .filter(aw => aw.year)
      .sort((a, b) => {
        const yearA = parseInt(a.year);
        const yearB = parseInt(b.year);
        return yearA - yearB;
      })
      .slice(0, 5);
    
    significantWorks.forEach(work => {
      events.push({
        year: work.year,
        title: work.title,
        description: `Created ${work.medium}`,
        location: ''
      });
    });
    
    // Add exhibition history
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
    
    // Sort by year
    return events.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  };

  const timeline = generateTimeline();

  if (artistLoading) {
    return (
      <div className="min-h-screen py-12 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <Skeleton className="aspect-[3/4]" />
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen py-24 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <H1 className="mb-4">Artist Not Found</H1>
          <Body className="mb-8">The requested artist could not be found.</Body>
          <Button asChild>
            <Link to={createPageUrl('Artists')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Artists
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isCornerstone = artist.tier === 'cornerstone';
  const isShowcase = artist.tier === 'showcase' || isCornerstone;

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link 
          to={createPageUrl('Artists')}
          className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Artists
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Portrait */}
            <div>
              <div className="aspect-[3/4] bg-beige/50 overflow-hidden sticky top-24">
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
            <div className="lg:col-span-2 py-4 lg:py-8">
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
              <H1 className="mb-2">{artist.name}</H1>
              {artist.lifespan && (
                <p className="text-lg text-charcoal/60 mb-6">{artist.lifespan}</p>
              )}

              {/* Short Bio */}
              {artist.bio_short && (
                <Lead className="mb-8">{artist.bio_short}</Lead>
              )}

              {/* Quote */}
              {artist.quote && (
                <Quote author={artist.name} className="mb-8">
                  {artist.quote}
                </Quote>
              )}

              {/* Long Bio */}
              {artist.bio_long && (
                <div className="prose prose-charcoal max-w-none mb-8">
                  <Body className="whitespace-pre-line">{artist.bio_long}</Body>
                </div>
              )}

              {/* Relationship with WLD - Cornerstone only */}
              {isCornerstone && artist.wld_relationship && (
                <div className="bg-beige/30 p-6 mb-8">
                  <H3 className="mb-4">Relationship with William Louis-Dreyfus</H3>
                  <Body>{artist.wld_relationship}</Body>
                </div>
              )}

              {/* Interview Link - Showcase+ */}
              {isShowcase && artist.interview_url && (
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream mb-8">
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
        </div>
      </section>

      {/* Biography Section */}
      {artist.bio_long && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Biography
              </span>
              <H2 className="mb-8">Life & Work</H2>
              <div className="prose prose-lg prose-charcoal max-w-none">
                <Body className="text-lg leading-relaxed whitespace-pre-line">
                  {artist.bio_long}
                </Body>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl">
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Timeline
              </span>
              <H2 className="mb-12">Career Highlights</H2>
              <ArtistTimeline events={timeline} />
            </div>
          </div>
        </section>
      )}

      {/* Works Gallery */}
      {artworks.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Collection
            </span>
            <H2 className="mb-8">Works in the Louis-Dreyfus Collection</H2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exhibition History - Showcase+ */}
      {isShowcase && artistLoans.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Exhibition History</H2>
            <div className="space-y-4">
              {artistLoans.map((loan) => (
                <Link 
                  key={loan.id}
                  to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                  className="block bg-white p-4 md:p-6 border border-charcoal/10 hover:border-olive/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg text-charcoal">{loan.title}</p>
                      <p className="text-sm text-charcoal/60">
                        {loan.institution}, {loan.location}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-charcoal/40" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles - Showcase+ */}
      {isShowcase && articles.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <H2>Related Writing</H2>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('News')}>
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Related Artists
              </span>
              <H2 className="mb-2">Explore Similar Artists</H2>
              <Body className="text-charcoal/60">
                Discover other artists with similar styles, movements, or mediums
              </Body>
            </div>
            <RelatedArtists artists={relatedArtists} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Explore More Artists</H2>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('Artists')}>
              View All Artists
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}