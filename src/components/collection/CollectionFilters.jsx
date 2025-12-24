import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from 'lucide-react';
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

export default function CollectionFilters({
  search,
  setSearch,
  filters,
  setFilters,
  artists = [],
  activeFilterCount = 0,
  onClear,
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

  return (
    <div className="bg-beige/30 p-4 md:p-6 mb-8">
      {/* Search Row */}
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <Input
            type="text"
            placeholder="Search by artist, title, or theme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-charcoal/10"
          />
        </div>

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
          <SheetContent side="right" className="w-full sm:w-[400px] bg-cream">
            <SheetHeader>
              <SheetTitle>Filter Collection</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterControls isMobile />
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={onClear}
                  className="w-full mt-6 text-charcoal/60"
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
      <div className="hidden md:flex md:items-center md:justify-between">
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
    </div>
  );
}