import React from 'react';
import ArtworkDetailBody from '@/components/detail/ArtworkDetailBody';

/**
 * ArtworkModal — thin wrapper around ArtworkDetailBody in modal mode.
 * Data fetching and content live in ArtworkDetailBody.
 */
export default function ArtworkModal({ artworkId }) {
  return <ArtworkDetailBody artworkId={artworkId} mode="modal" />;
}
