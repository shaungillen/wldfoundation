import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H3, Body, Caption } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function RelatedArtists({ artists }) {
  if (!artists || artists.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <Link
          key={artist.id}
          to={createPageUrl(`ArtistDetail?id=${artist.id}`)}
          className="group bg-white border border-charcoal/10 hover:border-olive/30 transition-all duration-200 overflow-hidden"
        >
          <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
            {artist.portrait_url ? (
              <img
                src={artist.portrait_url}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-beige/50">
                <span className="font-serif text-4xl text-charcoal/20">
                  {artist.name?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <H3 className="mb-1 text-lg group-hover:text-olive transition-colors">
              {artist.name}
            </H3>
            {artist.lifespan && (
              <Caption className="mb-2">{artist.lifespan}</Caption>
            )}
            {artist.bio_short && (
              <Body className="text-sm line-clamp-2 mb-3">{artist.bio_short}</Body>
            )}
            <div className="flex items-center text-sm text-olive">
              View Profile
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}