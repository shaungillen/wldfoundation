import React from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import MissionSection from '@/components/home/MissionSection';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import CollectionExplorer from '@/components/home/CollectionExplorer';
import ArtistSpotlight from '@/components/home/ArtistSpotlight';
import VirtualTourPreview from '@/components/home/VirtualTourPreview';
import GetInvolvedSection from '@/components/home/GetInvolvedSection';

export default function Home() {
  return (
    <div className="-mt-20">
      <HeroCarousel />
      <MissionSection />
      <FeaturedPrograms />
      <CollectionExplorer />
      <ArtistSpotlight />
      <VirtualTourPreview />
      <GetInvolvedSection />
    </div>
  );
}