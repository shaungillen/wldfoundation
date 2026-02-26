import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Body, Caption } from '@/components/ui/typography';
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, ExternalLink, ZoomIn, Calendar, Building } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';
import RelatedWorks from '@/components/artwork/RelatedWorks';
import NotAvailable from '@/components/ui/NotAvailable';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Fallback — demo stability when base44 returns nothing
import { getArtwork as getMockArtwork, getArtworks as getMockArtworks } from '@/components/data/mockData';

const statusConfig = {
    in_collection: { label: 'In Collection', className: 'bg-beige text-charcoal/70' },
    on_view: { label: 'On View — Mount Kisco Gallery', className: 'bg-olive/20 text-olive' },
    on_loan: { label: 'On Loan', className: 'bg-amber-100 text-amber-800' },
    family_office: { label: 'Family Office', className: 'bg-charcoal/10 text-charcoal/60' },
    formerly_in_collection: { label: 'Formerly in Collection', className: 'bg-charcoal/5 text-charcoal/40' },
};

// Uncertainty prefixes that render as plain text (not links)
const UNCERTAINTY_PREFIXES = [
    'Workshop of', 'Follower of', 'Attributed to',
    'Circle of', 'After', 'Style of', 'School of',
];

function ArtistAttribution({ name, id, isLast }) {
    if (!name) return null;
    const isUncertain = UNCERTAINTY_PREFIXES.some(p => name.startsWith(p));
    const sep = isLast ? '' : ', ';
    if (isUncertain || !id) {
        return <span className="text-charcoal/60">{name}{sep}</span>;
    }
    return (
        <>
            <Link
                to={createPageUrl(`ArtistDetail?id=${id}`)}
                className="text-charcoal/60 hover:text-olive transition-colors underline underline-offset-2"
            >
                {name}
            </Link>
            {sep}
        </>
    );
}

/**
 * ArtworkDetailBody
 * Shared between ArtworkModal (mode="modal") and ArtworkDetail page (mode="page").
 *
 * Resolver priority:
 *   1. Base44 API
 *   2. mockData fallback
 *   3. NotAvailable
 */
export default function ArtworkDetailBody({ artworkId, mode = 'page' }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const isModal = mode === 'modal';

    // --- Base44 queries ---
    const { data: apiArtwork, isLoading: artworkLoading } = useQuery({
        queryKey: ['artwork', artworkId],
        queryFn: () => base44.entities.Artwork.filter({ id: artworkId }),
        enabled: !!artworkId,
        select: (data) => data?.[0] ?? null,
    });

    const { data: relatedArtworks = [] } = useQuery({
        queryKey: ['artworks', 'related', apiArtwork?.artist_id],
        queryFn: () => base44.entities.Artwork.filter({ artist_id: apiArtwork.artist_id }, '-created_date', 5),
        enabled: !!apiArtwork?.artist_id,
    });

    const { data: apiArtist } = useQuery({
        queryKey: ['artist', apiArtwork?.artist_id],
        queryFn: () => base44.entities.Artist.filter({ id: apiArtwork.artist_id }),
        enabled: !!apiArtwork?.artist_id,
        select: (data) => data?.[0] ?? null,
    });

    const { data: relatedLoans = [] } = useQuery({
        queryKey: ['loans', 'artwork', artworkId],
        queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
        select: (data) => data.filter(l => l.artwork_ids?.includes(artworkId)),
        enabled: !!artworkId,
    });

    // --- Fallback resolver ---
    const artwork = !artworkLoading
        ? (apiArtwork ?? getMockArtwork(artworkId) ?? null)
        : null;

    const artist = apiArtist ?? null;

    const otherArtworks = (() => {
        if (relatedArtworks.length > 0) {
            return relatedArtworks.filter(a => a.id !== artworkId).slice(0, 4);
        }
        if (artwork?.artist_id) {
            return getMockArtworks({ artistId: artwork.artist_id })
                .filter(a => a.id !== artworkId)
                .slice(0, 4);
        }
        return [];
    })();

    const px = isModal ? 'px-6 md:px-8 lg:px-12' : 'px-4 md:px-6 lg:px-8';
    const wrap = isModal ? '' : 'max-w-[1440px] mx-auto';

    // --- Loading ---
    if (artworkLoading) {
        return (
            <div className={`${px} py-8`}>
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

    // --- Not found ---
    if (!artworkId || !artwork) {
        if (isModal) {
            return (
                <div className="p-8 text-center">
                    <H1 className="mb-4">Artwork Not Found</H1>
                    <Body className="">The requested artwork could not be found.</Body>
                </div>
            );
        }
        return (
            <NotAvailable
                title="Artwork Not Found"
                message="The requested artwork could not be found in the collection."
                backLabel="Back to Collection"
                backHref="Collection"
            />
        );
    }

    const status = statusConfig[artwork.status] || statusConfig.in_collection;

    return (
        <div>
            {/* Back link — page only */}
            {!isModal && (
                <div className={`${wrap} ${px} py-6`}>
                    <Link to={createPageUrl('Collection')} className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Collection
                    </Link>
                </div>
            )}

            {/* Main content */}
            <section className={`${wrap} ${px} pb-16 md:pb-24`}>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image */}
                    <div>
                        <div className={`space-y-4 ${!isModal ? 'sticky top-24' : ''}`}>
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
                                            <ZoomIn className="w-4 h-4" /> Click to zoom
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="font-serif text-2xl text-charcoal/20">No Image Available</span>
                                    </div>
                                )}
                            </div>
                            {artwork.additional_images?.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    <button onClick={() => setSelectedImage(0)}
                                        className={`aspect-square border-2 transition-colors ${selectedImage === 0 ? 'border-olive' : 'border-charcoal/10 hover:border-charcoal/30'}`}
                                    >
                                        <img src={artwork.image_url} alt="Main view" className="w-full h-full object-cover" />
                                    </button>
                                    {artwork.additional_images.map((img, idx) => (
                                        <button key={idx} onClick={() => setSelectedImage(idx + 1)}
                                            className={`aspect-square border-2 transition-colors ${selectedImage === idx + 1 ? 'border-olive' : 'border-charcoal/10 hover:border-charcoal/30'}`}
                                        >
                                            <img src={img} alt={`View ${idx + 2}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="py-4 lg:py-8">
                        {/* Status Badge */}
                        <Badge variant="secondary" className={`mb-4 ${status.className}`}>{status.label}</Badge>

                        {/* Artist attribution — uncertainty prefix + multi-artist */}
                        <div className="mb-2">
                            {Array.isArray(artwork.artist_ids) && artwork.artist_ids.length > 1
                                ? artwork.artist_ids.map((aid, idx) => (
                                    <ArtistAttribution
                                        key={aid}
                                        name={artwork.artist_names?.[idx] || artwork.artist_name}
                                        id={aid}
                                        isLast={idx === artwork.artist_ids.length - 1}
                                    />
                                ))
                                : <ArtistAttribution name={artwork.artist_name} id={artwork.artist_id} isLast />
                            }
                        </div>

                        <H1 id="modal-title" className="mb-2">{artwork.title}</H1>
                        {artwork.year && <p className="text-lg text-charcoal/60 mb-6">{artwork.year}</p>}

                        {/* Primary Details */}
                        <div className="border-t border-b border-charcoal/10 py-6 mb-6 space-y-4">
                            {artwork.medium && (
                                <div className="grid grid-cols-3 gap-4">
                                    <Caption className="">Medium</Caption>
                                    <p className="col-span-2 text-charcoal/80">{artwork.medium}</p>
                                </div>
                            )}
                            {artwork.dimensions && (
                                <div className="grid grid-cols-3 gap-4">
                                    <Caption className="">Dimensions</Caption>
                                    <p className="col-span-2 text-charcoal/80">{artwork.dimensions}</p>
                                </div>
                            )}
                            {artwork.location && (
                                <div className="grid grid-cols-3 gap-4">
                                    <Caption className="">Location</Caption>
                                    <p className="col-span-2 text-charcoal/80 flex items-center">
                                        <MapPin className="w-4 h-4 mr-1 text-olive" />{artwork.location}
                                    </p>
                                </div>
                            )}
                        </div>

                        {artwork.description && (
                            <div className="mb-8">
                                <Caption className="block mb-3">About This Work</Caption>
                                <Body className="">{artwork.description}</Body>
                            </div>
                        )}

                        {(artwork.acquisition_year || artwork.acquisition_source || artwork.provenance) && (
                            <div className="bg-beige/30 p-6 mb-8 rounded-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Building className="w-4 h-4 text-olive" />
                                    <Caption className="">Provenance &amp; History</Caption>
                                </div>
                                {artwork.acquisition_year && (
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-4 h-4 text-charcoal/40 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-charcoal/70">Acquired {artwork.acquisition_year}</p>
                                            {artwork.acquisition_source && <p className="text-sm text-charcoal/60 mt-1">{artwork.acquisition_source}</p>}
                                        </div>
                                    </div>
                                )}
                                {artwork.provenance && (
                                    <div className="pt-3 border-t border-charcoal/10 mt-3">
                                        <p className="text-sm text-charcoal/70 leading-relaxed whitespace-pre-line">{artwork.provenance}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {artwork.themes?.length > 0 && (
                            <div className="mb-8">
                                <Caption className="block mb-3">Themes</Caption>
                                <div className="flex flex-wrap gap-2">
                                    {artwork.themes.map(theme => (
                                        <Badge key={theme} variant="outline" className="border-charcoal/20">{theme}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            {artwork.status === 'on_view' && (
                                <Link to={createPageUrl('Gallery')}
                                    className="inline-flex items-center gap-2 text-sm bg-charcoal text-cream hover:bg-charcoal/90 px-5 py-2.5 transition-colors"
                                >
                                    <MapPin className="w-4 h-4" /> See in Gallery
                                </Link>
                            )}
                            {artist && (
                                <Link
                                    to={createPageUrl(`ArtistDetail?id=${artwork.artist_id}`)}
                                    className="inline-flex items-center gap-2 text-sm border border-charcoal/20 hover:border-olive/40 text-charcoal/60 hover:text-olive px-5 py-2.5 transition-colors"
                                >
                                    About {artist.name} <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Loan History */}
            {relatedLoans.length > 0 && (
                <section className={`${isModal ? 'px-6 md:px-8 lg:px-12 py-8' : `${px} py-16`} bg-beige/30`}>
                    <div className={wrap}>
                        <H2 className="mb-6">Exhibition History</H2>
                        <div className="space-y-3">
                            {relatedLoans.slice(0, isModal ? 3 : 10).map(loan => (
                                <Link key={loan.id} to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                                    className="block bg-white p-6 border border-charcoal/10 hover:border-olive/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors mb-2">{loan.title}</p>
                                            <div className="flex flex-col gap-1 text-sm text-charcoal/60">
                                                <div className="flex items-center gap-2"><Building className="w-4 h-4" /><span>{loan.institution}</span></div>
                                                {loan.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{loan.location}</span></div>}
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

            {/* Related Works */}
            <section className={`${isModal ? 'p-6 md:p-8 lg:px-12' : `${px} py-16 md:py-24`} bg-cream`}>
                <div className={wrap}>
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">Related Works</span>
                    <RelatedWorks
                        sameArtistWorks={otherArtworks}
                        artistName={artwork.artist_name}
                        artistId={artwork.artist_id}
                    />
                </div>
            </section>
        </div>
    );
}
