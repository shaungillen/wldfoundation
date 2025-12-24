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
        "relative overflow-hidden bg-beige/50",
        isCompact ? "aspect-square" : "aspect-[3/4]"
      )}>
        {artist.portrait_url ? (
          <img 
            src={artist.portrait_url} 
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-beige/50">
            <span className="font-serif text-4xl text-charcoal/20">
              {artist.name?.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {!isCompact && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-cream/80 text-sm line-clamp-2">
              {artist.bio_short}
            </p>
          </div>
        )}
      </div>
      
      <div className={cn("mt-4", isCompact && "mt-3")}>
        <h3 className={cn(
          "font-serif text-charcoal group-hover:text-olive transition-colors",
          isCompact ? "text-lg" : "text-xl"
        )}>
          {artist.name}
        </h3>
        {artist.lifespan && (
          <p className="text-sm text-charcoal/50 mt-0.5">
            {artist.lifespan}
          </p>
        )}
        {!isCompact && artist.nationality && (
          <p className="text-sm text-charcoal/60 mt-1">
            {artist.nationality}
          </p>
        )}
      </div>
    </Link>
  );
}