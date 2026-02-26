import React from 'react';
import ArtworkDetailBody from '@/components/detail/ArtworkDetailBody';

/**
 * ArtworkDetail — full standalone page, wraps ArtworkDetailBody in page mode.
 * Reads ?id from window.location.search (Base44 routing convention).
 */
export default function ArtworkDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const artworkId = urlParams.get('id');
  return (
    <div className="min-h-screen bg-cream">
      <ArtworkDetailBody artworkId={artworkId} mode="page" />
    </div>
  );
}
