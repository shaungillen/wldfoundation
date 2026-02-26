import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, H3, Lead, Body, Quote, Caption } from '@/components/ui/typography';
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Play, Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkCard from '@/components/cards/ArtworkCard';
import ArticleCard from '@/components/cards/ArticleCard';
import ArtistTimeline from '@/components/artist/ArtistTimeline';
import RelatedArtists from '@/components/artist/RelatedArtists';
import NotAvailable from '@/components/ui/NotAvailable';

// Fallback import — keeps demo stable when Base44 data is absent
import { getArtist as getMockArtist, getArtworks as getMockArtworks } from '@/components/data/mockData';

const WORKS_PER_PAGE = 50;

/**
 * ArtistDetailBody
 * Shared between ArtistModal (mode="modal") and ArtistDetail page (mode="page").
 *
 * Resolver priority:
 *   1. Base44 API (real data)
 *   2. mockData fallback (demo stability)
 *   3. NotAvailable (neither source has the artist)
 */
export default function ArtistDetailBody({ artistId, mode = 'page' }) {
    const [worksPage, setWorksPage] = useState(1);
    const isModal = mode === 'modal';

    // --- Base44 queries ---
    const { data: apiArtist, isLoading: artistLoading } = useQuery({
        queryKey: ['artist', artistId],
        queryFn: () => base44.entities.Artist.filter({ id: artistId }),
        enabled: !!artistId,
        select: (data) => data?.[0] ?? null,
    });

    const { data: apiArtworks = [] } = useQuery({
        queryKey: ['artworks', 'artist', artistId],
        queryFn: () => base44.entities.Artwork.filter({ artist_id: artistId }, 'year', 500),
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

    // --- Fallback resolver ---
    // If base44 returned nothing (not loading), fall back to mockData
    const artist = !artistLoading
        ? (apiArtist ?? getMockArtist(artistId) ?? null)
        : null;

    const artworks = useMemo(() => {
        const source = apiArtworks.length > 0 ? apiArtworks : getMockArtworks({ artistId });
        return [...source].sort((a, b) => {
            const ya = parseInt(a.year) || 9999;
            const yb = parseInt(b.year) || 9999;
            return ya - yb;
        });
    }, [apiArtworks, artistId]);

    // Featured works (data flag: artwork.featured === true)
    const featuredWorks = useMemo(
        () => artworks.filter(w => w.featured === true).slice(0, 5),
        [artworks]
    );

    // Loans with this artist's works
    const artistLoans = loans.filter(loan => {
        const loanArtworkIds = loan.artwork_ids || [];
        return artworks.some(aw => loanArtworkIds.includes(aw.id));
    });

    // Related artists: explicit → shared tags → shared mediums
    const relatedArtists = allArtists.filter(a => {
        if (a.id === artistId) return false;
        if (artist?.related_artist_ids?.includes(a.id)) return true;
        const hasCommonTag = (artist?.tags || []).some(t => (a.tags || []).includes(t));
        const hasCommonMedium = (artist?.medium_focus || []).some(m => (a.medium_focus || []).includes(m));
        return hasCommonTag || hasCommonMedium;
    }).slice(0, 6);

    // Timeline
    const timeline = useMemo(() => {
        if (!artist) return [];
        const events = [];
        if (artist.lifespan) {
            const yr = artist.lifespan.match(/\d{4}/)?.[0];
            if (yr) events.push({ year: yr, title: 'Born', description: `${artist.name} was born`, location: artist.nationality || '' });
        }
        artworks.filter(w => w.year).slice(0, 5).forEach(w =>
            events.push({ year: w.year, title: w.title, description: `Created ${w.medium || ''}`, location: '' })
        );
        artistLoans.slice(0, 3).forEach(loan => {
            const yr = loan.start_date?.split('-')[0];
            if (yr) events.push({ year: yr, title: `Exhibition: ${loan.title}`, description: `${loan.institution}`, location: loan.location });
        });
        return events.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }, [artist, artworks, artistLoans]);

    // --- Pagination ---
    const totalPages = Math.ceil(artworks.length / WORKS_PER_PAGE);
    const pagedWorks = artworks.slice((worksPage - 1) * WORKS_PER_PAGE, worksPage * WORKS_PER_PAGE);

    const isCornerstone = artist?.tier === 'cornerstone';
    const isShowcase = artist?.tier === 'showcase' || isCornerstone;

    // Padding adapts to mode
    const px = isModal ? 'px-6 md:px-8 lg:px-12' : 'px-4 md:px-6 lg:px-8';
    const sectionPy = isModal ? 'py-8' : 'py-16 md:py-24';
    const wrap = isModal ? '' : 'max-w-[1440px] mx-auto';

    // --- Loading state ---
    if (artistLoading) {
        return (
            <div className={`${px} ${sectionPy}`}>
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

    // --- Not found ---
    if (!artistId || !artist) {
        if (isModal) {
            return (
                <div className="p-8 text-center">
                    <H1 className="mb-4">Artist Not Found</H1>
                    <Body className="">The requested artist could not be found.</Body>
                </div>
            );
        }
        return (
            <NotAvailable
                title="Artist Not Found"
                message="The requested artist could not be found in the collection."
                backLabel="Back to Artists"
                backHref="Artists"
            />
        );
    }

    return (
        <div>
            {/* Back link — page mode only */}
            {!isModal && (
                <div className={`${wrap} ${px} py-6`}>
                    <Link to={createPageUrl('Artists')} className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Artists
                    </Link>
                </div>
            )}

            {/* Hero */}
            <section className={`${wrap} ${px} pb-12`}>
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                    {/* Portrait */}
                    <div>
                        <div className={`aspect-[3/4] bg-beige/50 overflow-hidden ${!isModal ? 'sticky top-24' : ''}`}>
                            {artist.portrait_url ? (
                                <img src={artist.portrait_url} alt={artist.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-beige/50">
                                    <span className="font-serif text-6xl text-charcoal/20">{artist.name?.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-2 py-4 lg:py-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {artist.nationality && <Badge variant="outline" className="border-charcoal/20">{artist.nationality}</Badge>}
                            {artist.medium_focus?.map(m => (
                                <Badge key={m} variant="outline" className="border-charcoal/20">{m}</Badge>
                            ))}
                        </div>

                        <H1 id="modal-title" className="mb-2">{artist.name}</H1>
                        {artist.lifespan && <p className="text-lg text-charcoal/60 mb-6">{artist.lifespan}</p>}
                        {artist.bio_short && <Lead className="mb-8">{artist.bio_short}</Lead>}
                        {artist.quote && <Quote author={artist.name} className="mb-8">{artist.quote}</Quote>}
                        {artist.bio_long && (
                            <div className="prose prose-charcoal max-w-none mb-8">
                                <Body className="whitespace-pre-line">{artist.bio_long}</Body>
                            </div>
                        )}
                        {isCornerstone && artist.wld_relationship && (
                            <div className="bg-beige/30 p-6 mb-8">
                                <H3 className="mb-4">Relationship with William Louis-Dreyfus</H3>
                                <Body className="">{artist.wld_relationship}</Body>
                            </div>
                        )}
                        {isShowcase && artist.interview_url && (
                            <div className="mb-8">
                                <H3 className="mb-4">In Conversation</H3>
                                <div className="aspect-video bg-charcoal/5 border border-charcoal/10 overflow-hidden">
                                    {artist.interview_url.includes('youtube.com') || artist.interview_url.includes('youtu.be') ? (
                                        <iframe
                                            src={artist.interview_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                            className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Interview with ${artist.name}`}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                                            <Play className="w-12 h-12 text-olive mb-4" />
                                            <a href={artist.interview_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-olive hover:underline">
                                                <ExternalLink className="w-4 h-4" />Watch Interview
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="flex gap-8 py-6 border-t border-charcoal/10">
                            <div>
                                <p className="font-serif text-3xl text-charcoal">{artworks.length}</p>
                                <Caption className="">Works in Collection</Caption>
                            </div>
                            {artistLoans.length > 0 && (
                                <div>
                                    <p className="font-serif text-3xl text-charcoal">{artistLoans.length}</p>
                                    <Caption className="">Exhibition Loans</Caption>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Works */}
            {featuredWorks.length > 0 && (
                <section className={`${isModal ? 'px-6 md:px-8 lg:px-12 py-8' : `${px} py-12`} bg-beige/20 border-t border-charcoal/10`}>
                    <div className={wrap}>
                        <div className="flex items-center gap-3 mb-8">
                            <Star className="w-4 h-4 text-olive" />
                            <span className="text-xs uppercase tracking-[0.2em] text-olive">Featured Works</span>
                        </div>
                        <div className={`grid gap-4 md:gap-6 ${isModal ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
                            {featuredWorks.map(artwork => (
                                <ArtworkCard key={artwork.id} artwork={artwork} showStatus={false} className="" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Timeline — showcase+ page mode only */}
            {!isModal && isShowcase && timeline.length > 0 && (
                <section className={`${px} ${sectionPy} bg-beige/30`}>
                    <div className={`${wrap} max-w-4xl mx-auto`}>
                        <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">Timeline</span>
                        <H2 className="mb-4">Career Highlights</H2>
                        <Lead className="text-charcoal/70 mb-12">
                            Key moments in {artist.name}'s artistic journey.
                        </Lead>
                        <ArtistTimeline events={timeline} />
                    </div>
                </section>
            )}

            {/* Works Gallery */}
            <section className={`${isModal ? 'p-6 md:p-8 lg:p-12' : `${px} ${sectionPy}`} bg-cream`}>
                <div className={wrap}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-3 block">Gallery</span>
                            <H2 className="mb-2">Works in Collection</H2>
                            <Body className="text-charcoal/60">
                                {artworks.length} {artworks.length === 1 ? 'work' : 'works'} · Chronological order
                            </Body>
                        </div>
                        {!isModal && (
                            <Link
                                to={createPageUrl('Collection') + `?search=${encodeURIComponent(artist.name)}`}
                                className="inline-flex items-center text-sm text-charcoal/60 hover:text-olive border border-charcoal/20 hover:border-olive/40 px-4 py-2 transition-colors"
                            >
                                Filter in Collection <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        )}
                    </div>

                    {artworks.length === 0 ? (
                        <div className="py-12 text-center border border-charcoal/10 bg-beige/20">
                            <p className="text-sm text-charcoal/40 italic">No works currently in the collection.</p>
                        </div>
                    ) : (
                        <>
                            <div className={`grid gap-4 md:gap-6 ${isModal ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'}`}>
                                {(isModal ? artworks.slice(0, 6) : pagedWorks).map(artwork => (
                                    <ArtworkCard key={artwork.id} artwork={artwork} className="" />
                                ))}
                            </div>
                            {/* Modal overflow count */}
                            {isModal && artworks.length > 6 && (
                                <div className="mt-6 text-center">
                                    <Link
                                        to={createPageUrl(`ArtistDetail?id=${artistId}`)}
                                        className="inline-flex items-center text-sm text-olive hover:underline"
                                    >
                                        + {artworks.length - 6} more works <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            )}
                            {/* Page mode pagination */}
                            {!isModal && totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <button
                                        onClick={() => setWorksPage(p => Math.max(1, p - 1))}
                                        disabled={worksPage === 1}
                                        className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal disabled:opacity-30 transition-colors border border-charcoal/20 hover:border-charcoal/40 px-4 py-2"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Previous
                                    </button>
                                    <span className="text-sm text-charcoal/60">
                                        Page {worksPage} of {totalPages} · {artworks.length} works
                                    </span>
                                    <button
                                        onClick={() => setWorksPage(p => Math.min(totalPages, p + 1))}
                                        disabled={worksPage === totalPages}
                                        className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal disabled:opacity-30 transition-colors border border-charcoal/20 hover:border-charcoal/40 px-4 py-2"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Exhibition History — page + showcase only */}
            {!isModal && isShowcase && artistLoans.length > 0 && (
                <section className={`${px} ${sectionPy} bg-beige/20`}>
                    <div className={wrap}>
                        <span className="text-xs uppercase tracking-[0.2em] text-olive mb-3 block">Exhibitions</span>
                        <H2 className="mb-4">Notable Exhibitions</H2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {artistLoans.slice(0, 6).map(loan => (
                                <Link key={loan.id} to={createPageUrl(`LoanCaseStudy?id=${loan.id}`)}
                                    className="block bg-cream border border-charcoal/10 hover:border-olive/40 transition-all group overflow-hidden"
                                >
                                    {loan.hero_image && (
                                        <div className="aspect-[16/9] overflow-hidden bg-beige/50">
                                            <img src={loan.hero_image} alt={loan.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <Caption className="text-olive mb-2">{loan.start_date && new Date(loan.start_date).getFullYear()}</Caption>
                                        <H3 className="mb-3 group-hover:text-olive transition-colors text-xl">{loan.title}</H3>
                                        <p className="text-charcoal/60 text-sm">{loan.institution}</p>
                                        {loan.location && <p className="text-charcoal/50 text-sm">{loan.location}</p>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Articles — page + showcase only */}
            {!isModal && isShowcase && articles.length > 0 && (
                <section className={`${px} ${sectionPy} bg-beige/30`}>
                    <div className={wrap}>
                        <H2 className="mb-8">Related Writing</H2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {articles.slice(0, 3).map(article => (
                                <ArticleCard key={article.id} article={article} className="" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Artists — page only */}
            {!isModal && relatedArtists.length > 0 && (
                <section className={`${px} ${sectionPy} bg-beige/30`}>
                    <div className={wrap}>
                        <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">Related Artists</span>
                        <H2 className="mb-2">Explore Similar Artists</H2>
                        <Body className="text-charcoal/60 mb-12">Discover other artists with similar styles, movements, or mediums</Body>
                        <RelatedArtists artists={relatedArtists} />
                    </div>
                </section>
            )}
        </div>
    );
}
