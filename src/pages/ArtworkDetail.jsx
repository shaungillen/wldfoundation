import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Body, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, ExternalLink, ZoomIn, Calendar, Building } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const statusConfig = {
  in_collection: { label: 'In Collection', className: 'bg-beige text-charcoal/70' },
  on_view: { label: 'On View — Mount Kisco Gallery', className: 'bg-olive/20 text-olive' },
  on_loan: { label: 'On Loan', className: 'bg-amber-100 text-amber-800' },
  family_office: { label: 'Family Office', className: 'bg-charcoal/10 text-charcoal/60' },
  formerly_in_collection: { label: 'Formerly in Collection', className: 'bg-charcoal/5 text-charcoal/40' },
};

export default function ArtworkDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const artworkId = urlParams.get('id');
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: artwork, isLoading: artworkLoading } = useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: () => base44.entities.Artwork.filter({ id: artworkId }),
    enabled: !!artworkId,
    select: (data) => data[0],
  });

  const { data: relatedArtworks = [] } = useQuery({
    queryKey: ['artworks', 'related', artwork?.artist_id],
    queryFn: () => base44.entities.Artwork.filter({ artist_id: artwork.artist_id }, '-created_date', 5),
    enabled: !!artwork?.artist_id,
  });

  const { data: artist } = useQuery({
    queryKey: ['artist', artwork?.artist_id],
    queryFn: () => base44.entities.Artist.filter({ id: artwork.artist_id }),
    enabled: !!artwork?.artist_id,
    select: (data) => data[0],
  });

  const { data: relatedLoans = [] } = useQuery({
    queryKey: ['loans', 'artwork', artworkId],
    queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
    select: (data) => data.filter(loan => loan.artwork_ids?.includes(artworkId)),
    enabled: !!artworkId,
  });

  if (artworkLoading) {
    return (
      <div className="min-h-screen py-12 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-[4/5]" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen py-24 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <H1 className="mb-4">Artwork Not Found</H1>
          <Body className="mb-8">The requested artwork could not be found.</Body>
          <Button asChild>
            <Link to={createPageUrl('Collection')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const status = statusConfig[artwork.status] || statusConfig.in_collection;
  const otherArtworks = relatedArtworks.filter(a => a.id !== artwork.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link 
          to={createPageUrl('Collection')}
          className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Link>
      </div>

      {/* Main Content */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div>
              <div className="space-y-4 sticky top-24">
                {/* Main Image */}
                <div className="aspect-[4/5] bg-beige/50 overflow-hidden relative group border border-charcoal/10">
                  {artwork.image_url ? (
                    <>
                      <Zoom>
                        <img 
                          src={artwork.image_url}
                          alt={`${artwork.title} by ${artwork.artist_name}`}
                          className="w-full h-full object-contain"
                        />
                      </Zoom>
                      <div className="absolute bottom-4 right-4 bg-charcoal/80 text-cream px-3 py-2 rounded-sm text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                        Click to zoom
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-2xl text-charcoal/20">No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Additional Images Thumbnails */}
                {artwork.additional_images?.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedImage(0)}
                      className={`aspect-square border-2 transition-colors ${selectedImage === 0 ? 'border-olive' : 'border-charcoal/10 hover:border-charcoal/30'}`}
                    >
                      <img 
                        src={artwork.image_url}
                        alt="Main view"
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {artwork.additional_images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx + 1)}
                        className={`aspect-square border-2 transition-colors ${selectedImage === idx + 1 ? 'border-olive' : 'border-charcoal/10 hover:border-charcoal/30'}`}
                      >
                        <img 
                          src={img}
                          alt={`View ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="py-4 lg:py-8">
              {/* Status Badge */}
              <Badge className={`mb-4 ${status.className}`}>
                {status.label}
              </Badge>

              {/* Artist */}
              <Link 
                to={createPageUrl(`ArtistDetail?id=${artwork.artist_id}`)}
                className="block text-charcoal/60 hover:text-olive transition-colors mb-2"
              >
                {artwork.artist_name}
              </Link>

              {/* Title */}
              <H1 className="mb-2">{artwork.title}</H1>

              {/* Year */}
              {artwork.year && (
                <p className="text-lg text-charcoal/60 mb-6">{artwork.year}</p>
              )}

              {/* Primary Details */}
              <div className="border-t border-b border-charcoal/10 py-6 mb-6 space-y-4">
                {artwork.medium && (
                  <div className="grid grid-cols-3 gap-4">
                    <Caption>Medium</Caption>
                    <p className="col-span-2 text-charcoal/80">{artwork.medium}</p>
                  </div>
                )}
                {artwork.dimensions && (
                  <div className="grid grid-cols-3 gap-4">
                    <Caption>Dimensions</Caption>
                    <p className="col-span-2 text-charcoal/80">{artwork.dimensions}</p>
                  </div>
                )}
                {artwork.location && (
                  <div className="grid grid-cols-3 gap-4">
                    <Caption>Location</Caption>
                    <p className="col-span-2 text-charcoal/80 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-olive" />
                      {artwork.location}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {artwork.description && (
                <div className="mb-8">
                  <Caption className="block mb-3">About This Work</Caption>
                  <Body>{artwork.description}</Body>
                </div>
              )}

              {/* Acquisition / Provenance */}
              {(artwork.acquisition_year || artwork.acquisition_source || artwork.provenance) && (
                <div className="bg-beige/30 p-6 mb-8 rounded-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-4 h-4 text-olive" />
                    <Caption>Provenance & History</Caption>
                  </div>
                  
                  <div className="space-y-3">
                    {artwork.acquisition_year && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-charcoal/40 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-charcoal/70">
                            Acquired {artwork.acquisition_year}
                          </p>
                          {artwork.acquisition_source && (
                            <p className="text-sm text-charcoal/60 mt-1">
                              {artwork.acquisition_source}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {artwork.provenance && (
                      <div className="pt-3 border-t border-charcoal/10">
                        <p className="text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">
                          {artwork.provenance}
                        </p>
                      </div>
                    )}
                    
                    {!artwork.acquisition_year && !artwork.acquisition_source && !artwork.provenance && (
                      <p className="text-sm text-charcoal/50 italic">
                        Part of the William Louis-Dreyfus Foundation Collection
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Themes */}
              {artwork.themes?.length > 0 && (
                <div className="mb-8">
                  <Caption className="block mb-3">Themes</Caption>
                  <div className="flex flex-wrap gap-2">
                    {artwork.themes.map((theme) => (
                      <Badge key={theme} variant="outline" className="border-charcoal/20">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                {artwork.status === 'on_view' && (
                  <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                    <Link to={createPageUrl('Gallery')}>
                      <MapPin className="w-4 h-4 mr-2" />
                      See in Gallery
                    </Link>
                  </Button>
                )}
                {artist && (
                  <Button asChild variant="outline" className="border-charcoal/20">
                    <Link to={createPageUrl(`ArtistDetail?id=${artwork.artist_id}`)}>
                      About {artist.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Loans */}
      {relatedLoans.length > 0 && (
        <section className="py-16 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-8">
              <H2 className="mb-2">Exhibition History</H2>
              <Body className="text-charcoal/60">
                This work has been featured in {relatedLoans.length} exhibition{relatedLoans.length !== 1 ? 's' : ''} as part of our Art Loan Program.
              </Body>
            </div>
            <div className="space-y-4">
              {relatedLoans.map((loan) => (
                <Link 
                  key={loan.id}
                  to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                  className="block bg-white p-6 border border-charcoal/10 hover:border-olive/30 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors mb-2">
                        {loan.title}
                      </p>
                      <div className="flex flex-col gap-1 text-sm text-charcoal/60">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{loan.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{loan.location}</span>
                        </div>
                        {(loan.start_date || loan.end_date) && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {loan.start_date && new Date(loan.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                              {loan.start_date && loan.end_date && ' – '}
                              {loan.end_date && new Date(loan.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-charcoal/40 group-hover:text-olive transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More by Artist */}
      {otherArtworks.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <H2>More by {artwork.artist_name}</H2>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl(`ArtistDetail?id=${artwork.artist_id}`)}>
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherArtworks.map((work) => (
                <ArtworkCard key={work.id} artwork={work} showStatus={false} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}