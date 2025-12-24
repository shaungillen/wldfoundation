import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { cn } from "@/lib/utils";

export default function ArtistCard({ artist, variant = 'default', className }) {
  const isCompact = variant === 'compact';

  return (
    <Link 
      to={createPageUrl(`ArtistDetail?id=${artist.id}`)}
      className={cn(
        "group block",
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden bg-beige/30 border hairline",
        isCompact ? "aspect-square" : "aspect-[3/4]"
      )}>
        {artist.portrait_url ? (
          <img 
            src={artist.portrait_url} 
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-4xl text-charcoal/20">
              {artist.name?.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className={cn("mt-3", isCompact && "mt-2")}>
        <h3 className={cn(
          "font-serif text-charcoal group-hover:underline transition-all duration-150",
          isCompact ? "text-lg" : "text-xl"
        )}>
          {artist.name}
        </h3>
        {artist.lifespan && (
          <p className="text-charcoal/50 mt-1" style={{ fontSize: 'var(--text-small)' }}>
            {artist.lifespan}
          </p>
        )}
        {!isCompact && artist.bio_short && (
          <p className="text-charcoal/60 mt-2 line-clamp-2" style={{ fontSize: 'var(--text-small)', lineHeight: '1.55' }}>
            {artist.bio_short}
          </p>
        )}
        {!isCompact && artist.nationality && (
          <p className="text-charcoal/40 mt-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>
            {artist.nationality}
          </p>
        )}
      </div>
    </Link>
  );
}