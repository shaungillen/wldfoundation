import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  in_collection: { label: 'In Collection', className: 'bg-beige text-charcoal/70' },
  on_view: { label: 'On View', className: 'bg-olive/20 text-olive' },
  on_loan: { label: 'On Loan', className: 'bg-amber-100 text-amber-800' },
  family_office: { label: 'Family Office', className: 'bg-charcoal/10 text-charcoal/60' },
  formerly_in_collection: { label: 'Formerly in Collection', className: 'bg-charcoal/5 text-charcoal/40' },
};

export default function ArtworkCard({ artwork, showStatus = true, className }) {
  const status = statusConfig[artwork.status] || statusConfig.in_collection;

  return (
    <Link 
      to={createPageUrl(`ArtworkDetail?id=${artwork.id}`)}
      className={cn(
        "group block",
        className
      )}
    >
      <div className="relative aspect-[4/5] bg-beige/30 overflow-hidden mb-3 border hairline">
        {artwork.image_url ? (
          <img 
            src={artwork.image_url} 
            alt={`${artwork.title} by ${artwork.artist_name}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-beige/50">
            <span className="text-charcoal/20 text-xs uppercase tracking-wider">No Image</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-charcoal/60" style={{ fontSize: 'var(--text-small)' }}>
          {artwork.artist_name}
        </p>
        <h3 className="font-serif text-charcoal group-hover:underline transition-all duration-150 line-clamp-2" style={{ fontSize: '18px', lineHeight: '1.4' }}>
          {artwork.title}
        </h3>
        <p className="text-charcoal/50" style={{ fontSize: 'var(--text-small)' }}>
          {artwork.year && artwork.year}
          {artwork.year && artwork.medium && ' · '}
          {artwork.medium && artwork.medium}
        </p>
        {showStatus && artwork.status && (
          <Badge 
            className={cn(
              "text-xs font-normal border hairline mt-2",
              status.className
            )}
          >
            {status.label}
          </Badge>
        )}
      </div>
    </Link>
  );
}