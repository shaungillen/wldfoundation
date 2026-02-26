import React from 'react';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import ArtworkCard from '@/components/cards/ArtworkCard';
import { ArrowRight } from 'lucide-react';

/**
 * RelatedWorks — shows other works related to the current artwork.
 * Selection priority:
 *   1. Same artist works (passed as `sameArtistWorks`)
 *   2. Shared movement/medium works (passed as `sharedWorks`)
 *   3. Empty state
 */
export default function RelatedWorks({ sameArtistWorks = [], sharedWorks = [], artistName, artistId }) {
    const works = sameArtistWorks.length > 0 ? sameArtistWorks : sharedWorks;

    if (works.length === 0) {
        return (
            <div className="py-12 text-center border border-charcoal/10 bg-beige/20">
                <p className="text-sm text-charcoal/40 italic">No related works available at this time.</p>
            </div>
        );
    }

    const label = sameArtistWorks.length > 0
        ? `More by ${artistName || 'this artist'}`
        : 'Related Works';

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-charcoal">{label}</h3>
                {artistId && sameArtistWorks.length > 0 && (
                    <Link
                        to={createPageUrl(`ArtistDetail?id=${artistId}`)}
                        className="inline-flex items-center text-sm text-olive hover:text-olive/80 transition-colors"
                    >
                        View all
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {works.slice(0, 4).map((work) => (
                    <ArtworkCard key={work.id} artwork={work} showStatus={false} className="" />
                ))}
            </div>
        </div>
    );
}
