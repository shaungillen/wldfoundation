import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import CollectionFilters from '@/components/collection/CollectionFilters';
import ArtworkCard from '@/components/cards/ArtworkCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function Collection() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState({
    artist: 'all',
    medium: 'all',
    status: 'all',
    period: 'all',
    movement: 'all',
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [yearRange, setYearRange] = useState([1900, 2025]);

  const { data: artworks = [], isLoading: artworksLoading } = useQuery({
    queryKey: ['artworks'],
    queryFn: () => base44.entities.Artwork.list('-created_date', 500),
  });

  const { data: artists = [] } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list('name', 500),
  });

  const filteredArtworks = useMemo(() => {
    let results = artworks.filter((artwork) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          artwork.title?.toLowerCase().includes(searchLower) ||
          artwork.artist_name?.toLowerCase().includes(searchLower) ||
          artwork.themes?.some(t => t.toLowerCase().includes(searchLower)) ||
          artwork.medium?.toLowerCase().includes(searchLower) ||
          artwork.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Artist filter
      if (filters.artist !== 'all' && artwork.artist_id !== filters.artist) {
        return false;
      }

      // Medium filter
      if (filters.medium !== 'all' && artwork.category !== filters.medium) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && artwork.status !== filters.status) {
        return false;
      }

      // Movement filter
      if (filters.movement !== 'all') {
        const artworkThemes = artwork.themes?.map(t => t.toLowerCase()) || [];
        if (!artworkThemes.includes(filters.movement.replace(/_/g, ' '))) {
          return false;
        }
      }

      // Year range filter
      const year = parseInt(artwork.year);
      if (year && (year < yearRange[0] || year > yearRange[1])) {
        return false;
      }

      // Period filter
      if (filters.period !== 'all') {
        const artworkYear = parseInt(artwork.year);
        if (!artworkYear) return false;
        
        const periodRanges = {
          'pre-1950': [0, 1949],
          '1950s': [1950, 1959],
          '1960s': [1960, 1969],
          '1970s': [1970, 1979],
          '1980s': [1980, 1989],
          '1990s': [1990, 1999],
          '2000s': [2000, 2009],
          '2010s': [2010, 2019],
          '2020s': [2020, 2029],
        };
        
        const [start, end] = periodRanges[filters.period] || [0, 9999];
        if (artworkYear < start || artworkYear > end) return false;
      }

      return true;
    });

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
        case 'date-asc':
          return (parseInt(a.year) || 0) - (parseInt(b.year) || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'artist-asc':
          return (a.artist_name || '').localeCompare(b.artist_name || '');
        case 'artist-desc':
          return (b.artist_name || '').localeCompare(a.artist_name || '');
        default:
          return 0;
      }
    });

    return results;
  }, [artworks, search, filters, sortBy, yearRange]);

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length + 
    (search ? 1 : 0) + 
    (yearRange[0] !== 1900 || yearRange[1] !== 2025 ? 1 : 0);

  const clearFilters = () => {
    setSearch('');
    setFilters({
      artist: 'all',
      medium: 'all',
      status: 'all',
      period: 'all',
      movement: 'all',
    });
    setSortBy('date-desc');
    setYearRange([1900, 2025]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              The Collection
            </span>
            <H1 className="mb-6">
              Four Decades of Contemporary Art
            </H1>
            <Lead className="mb-6">
              Assembled over forty years, this collection reflects one 
              collector's passionate engagement with contemporary art—
              particularly artists working outside the mainstream.
            </Lead>
            <Body>
              Works are actively shared through our Art Loan Program, 
              with pieces regularly traveling to museums and institutions 
              worldwide.{' '}
              <Link to={createPageUrl('ArtLoanProgram')} className="text-olive hover:underline">
                Learn about the Art Loan Program →
              </Link>
            </Body>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-8 md:py-12 bg-cream">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <CollectionFilters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            artists={artists}
            activeFilterCount={activeFilterCount}
            onClear={clearFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            yearRange={yearRange}
            setYearRange={setYearRange}
          />

          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-charcoal/60">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? 'work' : 'works'}
              {activeFilterCount > 0 && ' (filtered)'}
            </p>
          </div>

          {/* Artwork Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {artworksLoading ? (
              Array(12).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : filteredArtworks.length > 0 ? (
              filteredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-charcoal/60 mb-4">
                  No artworks match your current filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Art Loan CTA */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Art Loan Program
              </span>
              <H2 className="mb-6">Art That Travels</H2>
              <Body className="mb-6">
                Works from this collection regularly travel to museums, 
                universities, and cultural institutions. If you're a 
                curator or exhibition organizer interested in borrowing 
                from the collection, we welcome your inquiry.
              </Body>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                  <Link to={createPageUrl('ArtLoanProgram')}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                alt="Museum installation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}