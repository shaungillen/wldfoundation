import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const mediums = [
  { value: 'all', label: 'All Mediums' },
  { value: 'painting', label: 'Painting' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'works_on_paper', label: 'Works on Paper' },
  { value: 'photography', label: 'Photography' },
  { value: 'mixed_media', label: 'Mixed Media' },
  { value: 'installation', label: 'Installation' },
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'in_collection', label: 'In Collection' },
  { value: 'on_view', label: 'On View — Mount Kisco' },
  { value: 'on_loan', label: 'On Loan' },
  { value: 'family_office', label: 'Family Office' },
  { value: 'formerly_in_collection', label: 'Formerly in Collection' },
];

const periods = [
  { value: 'all', label: 'All Periods' },
  { value: 'pre-1950', label: 'Pre-1950' },
  { value: '1950s', label: '1950s' },
  { value: '1960s', label: '1960s' },
  { value: '1970s', label: '1970s' },
  { value: '1980s', label: '1980s' },
  { value: '1990s', label: '1990s' },
  { value: '2000s', label: '2000s' },
  { value: '2010s', label: '2010s' },
  { value: '2020s', label: '2020s' },
];

const movements = [
  { value: 'all', label: 'All Movements' },
  { value: 'abstract_expressionism', label: 'Abstract Expressionism' },
  { value: 'pop_art', label: 'Pop Art' },
  { value: 'minimalism', label: 'Minimalism' },
  { value: 'conceptual_art', label: 'Conceptual Art' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'modern', label: 'Modern' },
  { value: 'postmodern', label: 'Postmodern' },
  { value: 'surrealism', label: 'Surrealism' },
  { value: 'impressionism', label: 'Impressionism' },
];

const sortOptions = [
  { value: 'date-desc', label: 'Date: Newest First' },
  { value: 'date-asc', label: 'Date: Oldest First' },
  { value: 'title-asc', label: 'Title: A-Z' },
  { value: 'title-desc', label: 'Title: Z-A' },
  { value: 'artist-asc', label: 'Artist: A-Z' },
  { value: 'artist-desc', label: 'Artist: Z-A' },
];

export default function CollectionFilters({
  search,
  setSearch,
  filters,
  setFilters,
  artists = [],
  activeFilterCount = 0,
  onClear,
  sortBy,
  setSortBy,
  yearRange,
  setYearRange,
}) {
  const FilterControls = ({ isMobile = false }) => (
    <div className={isMobile ? "space-y-4" : "flex flex-wrap gap-4"}>
      {/* Artist Select */}
      <Select 
        value={filters.artist || 'all'} 
        onValueChange={(v) => setFilters({ ...filters, artist: v })}
      >
        <SelectTrigger className={isMobile ? "w-full" : "w-48"}>
          <SelectValue placeholder="Artist" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Artists</SelectItem>
          {artists.map((artist) => (
            <SelectItem key={artist.id} value={artist.id}>
              {artist.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Medium Select */}
      <Select 
        value={filters.medium || 'all'} 
        onValueChange={(v) => setFilters({ ...filters, medium: v })}
      >
        <SelectTrigger className={isMobile ? "w-full" : "w-40"}>
          <SelectValue placeholder="Medium" />
        </SelectTrigger>
        <SelectContent>
          {mediums.map((m) => (
            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Select */}
      <Select 
        value={filters.status || 'all'} 
        onValueChange={(v) => setFilters({ ...filters, status: v })}
      >
        <SelectTrigger className={isMobile ? "w-full" : "w-48"}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Movement Select */}
      <Select 
        value={filters.movement || 'all'} 
        onValueChange={(v) => setFilters({ ...filters, movement: v })}
      >
        <SelectTrigger className={isMobile ? "w-full" : "w-48"}>
          <SelectValue placeholder="Movement" />
        </SelectTrigger>
        <SelectContent>
          {movements.map((m) => (
            <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Period Select */}
      <Select 
        value={filters.period || 'all'} 
        onValueChange={(v) => setFilters({ ...filters, period: v })}
      >
        <SelectTrigger className={isMobile ? "w-full" : "w-36"}>
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {periods.map((p) => (
            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const YearRangeControl = ({ isMobile = false }) => (
    <div className={isMobile ? "space-y-3 py-4" : "w-full py-4"}>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium text-charcoal/70">Year Range</Label>
        <span className="text-xs text-charcoal/50">
          {yearRange[0]} - {yearRange[1]}
        </span>
      </div>
      <Slider
        min={1900}
        max={2025}
        step={1}
        value={yearRange}
        onValueChange={setYearRange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-charcoal/40">
        <span>1900</span>
        <span>2025</span>
      </div>
    </div>
  );

  return (
    <div className="bg-beige/30 p-4 md:p-6 mb-8">
      {/* Search & Sort Row */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <Input
            type="text"
            placeholder="Search by artist, title, theme, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-charcoal/10"
          />
        </div>

        {/* Sort Select - Desktop */}
        <Select 
          value={sortBy} 
          onValueChange={setSortBy}
          className="hidden md:block"
        >
          <SelectTrigger className="w-48 bg-white border-charcoal/10">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" className="border-charcoal/20 relative">
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-olive text-cream text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] bg-cream overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter & Sort Collection</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Sort - Mobile */}
              <div>
                <Label className="text-sm font-medium text-charcoal/70 mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <Label className="text-sm font-medium text-charcoal/70 mb-3 block">Filters</Label>
                <FilterControls isMobile />
              </div>

              <YearRangeControl isMobile />

              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={onClear}
                  className="w-full text-charcoal/60"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block space-y-4">
        <div className="flex items-center justify-between">
          <FilterControls />
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClear}
              className="text-charcoal/60"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <YearRangeControl />
      </div>
    </div>
  );
}