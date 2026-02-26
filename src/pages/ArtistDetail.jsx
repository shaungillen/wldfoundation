import React from 'react';
import ArtistDetailBody from '@/components/detail/ArtistDetailBody';

/**
 * ArtistDetail — full standalone page, wraps ArtistDetailBody in page mode.
 * Reads ?id from window.location.search (Base44 routing convention).
 */
export default function ArtistDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');
  return (
    <div className="min-h-screen bg-cream">
      <ArtistDetailBody artistId={artistId} mode="page" />
    </div>
  );
}
