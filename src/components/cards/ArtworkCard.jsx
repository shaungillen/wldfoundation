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
      <div className="relative aspect-[4/5] bg-beige/50 overflow-hidden mb-4">
        {artwork.image_url ? (
          <img 
            src={artwork.image_url} 
            alt={`${artwork.title} by ${artwork.artist_name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-charcoal/20 font-serif text-lg">No Image</span>
          </div>
        )}
        
        {showStatus && artwork.status && (
          <Badge 
            className={cn(
              "absolute top-3 left-3 text-xs font-normal",
              status.className
            )}
          >
            {status.label}
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300" />
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-charcoal/60">
          {artwork.artist_name}
        </p>
        <h3 className="font-serif text-lg text-charcoal group-hover:text-olive transition-colors line-clamp-2">
          {artwork.title}
        </h3>
        <p className="text-sm text-charcoal/50">
          {artwork.year && artwork.year}
          {artwork.year && artwork.medium && ' · '}
          {artwork.medium && artwork.medium}
        </p>
      </div>
    </Link>
  );
}