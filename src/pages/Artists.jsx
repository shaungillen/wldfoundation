import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { H1, Lead, Body } from '@/components/ui/typography';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';
import ArtistCard from '@/components/cards/ArtistCard';
import Modal from '@/components/modals/Modal';
import ArtistModal from '@/components/modals/ArtistModal';
import { getArtists } from '@/api/dataSource';

export default function Artists() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { artistId } = useParams();

  const artists = getArtists();

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          artist.name?.toLowerCase().includes(searchLower) ||
          artist.nationality?.toLowerCase().includes(searchLower) ||
          artist.bio_short?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Medium focus filter
      if (filter !== 'all') {
        if (!artist.medium_focus?.includes(filter)) return false;
      }

      return true;
    });
  }, [artists, search, filter]);

  // Get unique mediums
  const mediums = useMemo(() => {
    const allMediums = artists.flatMap(a => a.medium_focus || []);
    return [...new Set(allMediums)].sort();
  }, [artists]);

  // Alphabetical grouping
  const groupedArtists = useMemo(() => {
    const groups = {};
    filteredArtists.forEach((artist) => {
      const letter = artist.name?.charAt(0).toUpperCase() || '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(artist);
    });
    return groups;
  }, [filteredArtists]);

  const letters = Object.keys(groupedArtists).sort();

  const handleArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  const handleCloseModal = () => {
    navigate('/artists', { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Modal 
        isOpen={!!artistId} 
        onClose={handleCloseModal}
        size="xl"
      >
        {artistId && <ArtistModal artistId={artistId} />}
      </Modal>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Artists
            </span>
            <H1 className="mb-6">
              The Artists in Our Collection
            </H1>
            <Lead>
              Over four decades, William Louis-Dreyfus developed relationships 
              with artists whose work spoke to him personally—many of whom 
              were underrepresented in major institutions at the time.
            </Lead>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-beige/30 p-4 md:p-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <Input
                type="text"
                placeholder="Search by name or nationality..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-charcoal/10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white border-charcoal/10">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mediums</SelectItem>
                {mediums.map((medium) => (
                  <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Artist Index */}
      <section className="py-8 pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Alphabet Nav */}
          <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-charcoal/10">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center text-sm text-charcoal/60 hover:text-olive hover:bg-olive/10 rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-charcoal/60 mb-8">
            {filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'}
          </p>

          {filteredArtists.length > 0 ? (
            <div className="space-y-16">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`}>
                  <h2 className="font-serif text-4xl text-charcoal/20 mb-8">{letter}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                    {groupedArtists[letter].map((artist) => (
                      <div
                        key={artist.id}
                        onClick={() => handleArtistClick(artist.id)}
                        className="cursor-pointer"
                      >
                        <ArtistCard artist={artist} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Body className="text-charcoal/60">
                No artists match your search.
              </Body>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}