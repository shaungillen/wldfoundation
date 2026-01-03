import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Body, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, ExternalLink, ZoomIn, Calendar, Building } from 'lucide-react';
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

export default function ArtworkModal({ artworkId }) {
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
      <div className="p-8">
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
    );
  }

  if (!artwork) {
    return (
      <div className="p-8 text-center">
        <H1 className="mb-4">Artwork Not Found</H1>
        <Body>The requested artwork could not be found.</Body>
      </div>
    );
  }

  const status = statusConfig[artwork.status] || statusConfig.in_collection;
  const otherArtworks = relatedArtworks.filter(a => a.id !== artwork.id).slice(0, 4);

  return (
    <div>
      {/* Main Content */}
      <section className="p-6 md:p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div>
            <div className="space-y-4">
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

              {/* Thumbnails */}
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
          <div>
            <Badge className={`mb-4 ${status.className}`}>
              {status.label}
            </Badge>

            <Link 
              to={createPageUrl(`Artists/${artwork.artist_id}`)}
              className="block text-charcoal/60 hover:text-olive transition-colors mb-2"
            >
              {artwork.artist_name}
            </Link>

            <H1 id="modal-title" className="mb-2">{artwork.title}</H1>

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
              <div className="mb-6">
                <Caption className="block mb-3">About This Work</Caption>
                <Body>{artwork.description}</Body>
              </div>
            )}

            {/* Themes */}
            {artwork.themes?.length > 0 && (
              <div className="mb-6">
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
            <div className="flex flex-wrap gap-3">
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
                  <Link to={createPageUrl(`Artists/${artwork.artist_id}`)}>
                    About {artist.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Loans */}
      {relatedLoans.length > 0 && (
        <section className="px-6 md:px-8 lg:px-12 py-8 bg-beige/30">
          <H2 className="mb-6">Exhibition History</H2>
          <div className="space-y-3">
            {relatedLoans.slice(0, 3).map((loan) => (
              <Link 
                key={loan.id}
                to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                className="block bg-cream p-4 border border-charcoal/10 hover:border-olive/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-lg text-charcoal group-hover:text-olive transition-colors mb-1">
                      {loan.title}
                    </p>
                    <p className="text-sm text-charcoal/60">
                      {loan.institution}, {loan.location}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* More by Artist */}
      {otherArtworks.length > 0 && (
        <section className="p-6 md:p-8 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <H2>More by {artwork.artist_name}</H2>
            <Button asChild variant="outline" className="border-charcoal/20" size="sm">
              <Link to={createPageUrl(`Artists/${artwork.artist_id}`)}>
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherArtworks.map((work) => (
              <ArtworkCard key={work.id} artwork={work} showStatus={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}