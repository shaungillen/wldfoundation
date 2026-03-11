import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  in_collection: { label: 'In Collection', className: 'bg-beige text-charcoal/70' },
  on_view: { label: 'On View', className: 'bg-olive/20 text-olive' },
  on_loan: { label: 'On Loan', className: 'bg-amber-100 text-amber-800' },
  family_office: { label: 'Family Office', className: 'bg-charcoal/10 text-charcoal/60' },
  formerly_in_collection: { label: 'Formerly in Collection', className: 'bg-charcoal/5 text-charcoal/40' },
};

/**
 * Ensures ID is a safe, trimmed string before encoding.
 */
function safeId(value) {
  const v = String(value ?? '').trim();
  return v ? encodeURIComponent(v) : '';
}

/**
 * Resolves the path based on the mode and artwork ID.
 */
function resolveArtworkRoute({ id, mode }) {
  const sid = safeId(id);
  if (!sid) return null;
  return mode === 'modal' ? `/collection/${sid}` : `/artworks/${sid}`;
}

export default function ArtworkCard({
  artwork,
  mode = 'page', // 'modal' | 'page'
  showStatus = true,
  className = '',
}) {
  const status = statusConfig[artwork?.status] || statusConfig.in_collection;

  // Guard: require an id and a resolvable route before creating a link
  const to = resolveArtworkRoute({ id: artwork?.id, mode });

  const imageBlock = (
    <div className="relative aspect-[4/5] bg-beige/30 overflow-hidden mb-3 border border-charcoal/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      {artwork?.image_url ? (
        <img
          src={artwork.image_url}
          alt={`${artwork?.title ?? 'Untitled'} by ${artwork?.artist_name ?? 'Unknown Artist'}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-beige/50">
          <span className="text-charcoal/20 text-xs uppercase tracking-wider font-serif">No Image</span>
        </div>
      )}

      {/* Hover medium reveal - slides up from bottom */}
      {artwork?.medium ? (
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-charcoal/90 px-3 py-2">
          <p className="text-cream text-xs leading-snug line-clamp-2">{artwork.medium}</p>
        </div>
      ) : null}
    </div>
  );

  const textBlock = (
    <div className="space-y-0.5">
      <p className="text-charcoal/60" style={{ fontSize: 'var(--text-small)' }}>
        {artwork?.artist_name ?? ''}
      </p>

      <h3
        className="font-serif text-charcoal group-hover:underline transition-all duration-150 line-clamp-2"
        style={{ fontSize: '18px', lineHeight: '1.4' }}
      >
        {artwork?.title ?? 'Untitled'}
      </h3>

      {artwork?.year ? (
        <p className="text-charcoal/50" style={{ fontSize: 'var(--text-small)' }}>
          {artwork.year}
        </p>
      ) : null}

      {showStatus && artwork?.status ? (
        <Badge
          variant="secondary"
          className={cn("text-xs font-normal border hairline mt-2", status.className)}
          style={{
            paddingLeft: 'var(--pill-padding-x)',
            paddingRight: 'var(--pill-padding-x)',
            paddingTop: 'var(--pill-padding-y)',
            paddingBottom: 'var(--pill-padding-y)',
            borderRadius: 'var(--pill-radius)',
          }}
        >
          {status.label}
        </Badge>
      ) : null}
    </div>
  );

  // If route cannot be resolved, render the card as a static block to prevent broken navigation
  if (!to) {
    return (
      <div className={cn("group block opacity-70", className)}>
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
