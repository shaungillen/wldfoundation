import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

/**
 * Ensures ID is a safe, trimmed string before encoding.
 */
function safeId(value) {
  const v = String(value ?? '').trim();
  return v ? encodeURIComponent(v) : '';
}

/**
 * Resolves the path based on the mode and artist ID.
 */
function resolveArtistRoute({ id, mode }) {
  const sid = safeId(id);
  if (!sid) return null;

  // Spec:
  // modal mode path: /artists/:id
  // page mode path:  /artists/:id
  // Hub uses /Artists (capital A) for the base, so lowercase /artists/:id is the standalone trigger.
  // App.jsx handles the redirect for standalone pages.
  return `/artists/${sid}`;
}

export default function ArtistCard({
  artist,
  mode = 'page', // 'modal' | 'page'
  variant = 'default',
  className = ''
}) {
  const isCompact = variant === 'compact';

  // Guard: require an id and a resolvable route before creating a link
  const to = resolveArtistRoute({ id: artist?.id, mode });

  // Segmented blocks (same pattern as ArtworkCard)
  const imageBlock = (
    <div className={cn(
      "relative overflow-hidden bg-beige/30 border border-charcoal/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
      isCompact ? "aspect-square" : "aspect-[3/4]"
    )}>
      {artist?.portrait_url ? (
        <img
          src={artist.portrait_url}
          alt={artist?.name ?? 'Artist'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-serif text-4xl text-charcoal/20">
            {artist?.name?.charAt(0) ?? ''}
          </span>
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className={cn("mt-3", isCompact && "mt-2")}>
      <h3 className={cn(
        "font-serif text-charcoal group-hover:underline transition-all duration-150",
        isCompact ? "text-lg" : "text-xl"
      )}>
        {artist?.name ?? 'Unknown Artist'}
      </h3>
      {artist?.lifespan ? (
        <p className="text-charcoal/50 mt-1" style={{ fontSize: 'var(--text-small)' }}>
          {artist.lifespan}
        </p>
      ) : null}
      {!isCompact && artist?.bio_short ? (
        <p className="text-charcoal/60 mt-2 line-clamp-2" style={{ fontSize: 'var(--text-small)', lineHeight: '1.55' }}>
          {artist.bio_short}
        </p>
      ) : null}
      {!isCompact && artist?.nationality ? (
        <p className="text-charcoal/40 mt-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>
          {artist.nationality}
        </p>
      ) : null}
    </div>
  );

  // Properly guarded: if route cannot be resolved, render blocks without Link
  if (!to) {
    return (
      <div className={cn("group block", className)}>
        {imageBlock}
        {textBlock}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn("group block", className)}
    >
      {imageBlock}
      {textBlock}
    </Link>
  );
}