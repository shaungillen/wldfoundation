import React from 'react';
import ArtistDetailBody from '@/components/detail/ArtistDetailBody';

/**
 * ArtistModal — thin wrapper around ArtistDetailBody in modal mode.
 * Data fetching and content live in ArtistDetailBody.
 */
export default function ArtistModal({ artistId }) {
  return <ArtistDetailBody artistId={artistId} mode="modal" />;
}
