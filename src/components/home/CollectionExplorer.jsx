import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H2, Lead } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight } from 'lucide-react';
import ArtworkCard from '@/components/cards/ArtworkCard';
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from '@/components/LanguageContext';

export default function CollectionExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    medium: 'all',
    status: 'all',
  });
  const { t } = useLanguage();

  const { data: artworks = [], isLoading } = useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: () => base44.entities.Artwork.filter({ featured: true }, '-created_date', 9),
  });

  const { data: artists = [] } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list('-name', 100),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = createPageUrl(`Collection?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              {t('home.collection.eyebrow')}
            </span>
            <H2>{t('home.collection.title')}</H2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto border-charcoal/20">
            <Link to={createPageUrl('Collection')}>
              {t('home.collection.cta')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="bg-beige/30 p-4 md:p-6 mb-8 rounded-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <Input
                type="text"
                placeholder="Search by artist, title, or theme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-charcoal/10"
              />
            </div>
            <Select 
              value={filters.medium} 
              onValueChange={(v) => setFilters({ ...filters, medium: v })}
            >
              <SelectTrigger className="w-full md:w-40 bg-white border-charcoal/10">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mediums</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="works_on_paper">Works on Paper</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="mixed_media">Mixed Media</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={filters.status} 
              onValueChange={(v) => setFilters({ ...filters, status: v })}
            >
              <SelectTrigger className="w-full md:w-40 bg-white border-charcoal/10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on_view">On View</SelectItem>
                <SelectItem value="in_collection">In Collection</SelectItem>
                <SelectItem value="on_loan">On Loan</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="bg-charcoal hover:bg-charcoal/90 text-cream">
              Search
            </Button>
          </form>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {isLoading ? (
            Array(9).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : artworks.length > 0 ? (
            artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))
          ) : (
            Array(9).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-beige/50 flex items-center justify-center">
                  <span className="font-serif text-charcoal/20">Artwork</span>
                </div>
                <p className="text-sm text-charcoal/40">Sample Artist</p>
                <p className="font-serif text-charcoal/60">Sample Title</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}