import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Search, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Modal from '@/components/modals/Modal';
import ArtworkModal from '@/components/modals/ArtworkModal';
import {
  filterLibraryArtworks,
  filterLibraryResources,
  resourceKind,
  resourceKinds,
  resourceYear,
} from '@/components/library/libraryFilters';

const tone = {
  page: '#FAF8F5',
  rule: '#E9E5DE',
  ink: '#1E1E1E',
  accent: '#7F7454',
};

const resourceLabel = (kind) =>
  resourceKinds.find((entry) => entry.value === kind)?.label || 'Stories';

function ResourceCard({ resource }) {
  const kind = resourceKind(resource);
  const link = resource.id ? `/ArticleDetail?id=${encodeURIComponent(resource.id)}` : null;
  return (
    <article className="min-w-0">
      {resource.hero_image ? (
        <div className="aspect-[16/10] overflow-hidden bg-[#E9E5DE] mb-4">
          <img src={resource.hero_image} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-[#E9E5DE] mb-4 flex items-center justify-center">
          <span className="font-serif text-2xl text-[#8D877B]">WLD</span>
        </div>
      )}
      <p className="text-[11px] uppercase tracking-[.09em] text-[#78736F] mb-2">{resourceLabel(kind)}</p>
      <h3 className="font-serif text-[24px] leading-[1.16] text-[#1E1E1E]">
        {link ? <Link to={link} className="hover:underline underline-offset-4">{resource.title}</Link> : resource.title}
      </h3>
      <p className="mt-2 text-[13px] text-[#78736F]">
        {[resource.author, resourceYear(resource)].filter(Boolean).join(' · ')}
      </p>
      {resource.excerpt && <p className="mt-3 text-sm leading-relaxed text-[#57524F] line-clamp-3">{resource.excerpt}</p>}
    </article>
  );
}

function ArtworkPreview({ artwork, onQuickView }) {
  return (
    <article className="min-w-0">
      <button
        type="button"
        className="group block w-full overflow-hidden bg-[#E9E5DE] aspect-square focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E1E1E]"
        onClick={() => onQuickView(artwork.id)}
        aria-label={`Quick view: ${artwork.title} by ${artwork.artist_name}`}
      >
        {artwork.image_url ? (
          <img
            src={artwork.image_url}
            alt={`${artwork.title} by ${artwork.artist_name}`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]"
          />
        ) : <span className="text-sm text-[#78736F]">Image unavailable</span>}
      </button>
      <p className="mt-3 text-[11px] text-[#78736F]">{artwork.artist_name}</p>
      <h3 className="mt-1 font-serif text-[21px] leading-tight">{artwork.title}</h3>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-[13px]">
        <button type="button" onClick={() => onQuickView(artwork.id)} className="underline underline-offset-4 hover:text-[#7F7454]">
          Quick view
        </button>
        <Link to={`/ArtworkDetail?id=${encodeURIComponent(artwork.id)}`} className="inline-flex gap-1 items-center underline underline-offset-4 hover:text-[#7F7454]">
          Full detail <ArrowRight aria-hidden="true" size={13} />
        </Link>
      </div>
    </article>
  );
}

export default function LibraryArchive() {
  const [kind, setKind] = useState('all');
  const [search, setSearch] = useState('');
  const [artistId, setArtistId] = useState('all');
  const [year, setYear] = useState('all');
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  const articlesQuery = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list('-date', 100),
  });
  const artworksQuery = useQuery({
    queryKey: ['artworks'],
    queryFn: () => base44.entities.Artwork.list('-created_date', 500),
  });
  const artistsQuery = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list('name', 500),
  });

  const articles = articlesQuery.data || [];
  const artworks = artworksQuery.data || [];
  const artists = artistsQuery.data || [];

  const years = useMemo(() => [...new Set(articles.map(resourceYear).filter(Boolean))].sort().reverse(), [articles]);
  const filteredResources = useMemo(
    () => filterLibraryResources(articles, { kind, search, artistId, year }),
    [articles, kind, search, artistId, year]
  );
  const matchingArtworks = useMemo(() => filterLibraryArtworks(artworks, search), [artworks, search]);
  const featured = filteredResources.find((article) => article.featured) || filteredResources[0];
  const remaining = filteredResources.filter((article) => article !== featured);
  const haveFilters = kind !== 'all' || !!search.trim() || artistId !== 'all' || year !== 'all';

  const clearFilters = () => {
    setKind('all');
    setSearch('');
    setArtistId('all');
    setYear('all');
  };

  return (
    <main className="min-h-screen text-[#1E1E1E]" style={{ backgroundColor: tone.page, color: tone.ink }}>
      <Modal
        isOpen={Boolean(selectedArtworkId)}
        onClose={() => setSelectedArtworkId(null)}
        title="Artwork"
        size="xl"
      >
        {selectedArtworkId && <ArtworkModal artworkId={selectedArtworkId} />}
      </Modal>

      <header className="border-b" style={{ borderColor: tone.rule }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <p className="text-[11px] uppercase tracking-[.1em] text-[#77716B]">Archive · Publications · Media</p>
          <h1 className="font-serif font-normal text-[54px] md:text-[68px] leading-none mt-4 mb-4">Library</h1>
          <p className="max-w-[610px] text-[15px] leading-[1.7] text-[#5D5854]">
            Publications, films, conversations, photographs, and archival materials
            extending the stories of the artists, exhibitions, and ideas represented
            by the William Louis-Dreyfus Foundation.
          </p>
        </div>
      </header>

      <section aria-label="Library search and filters" className="border-b" style={{ borderColor: tone.rule }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex gap-x-6 gap-y-3 overflow-x-auto pb-1" role="group" aria-label="Resource types">
              {resourceKinds.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setKind(value)}
                  aria-pressed={kind === value}
                  className={`shrink-0 text-[13px] pb-2 border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${kind === value ? 'font-semibold border-[#1E1E1E]' : 'border-transparent text-[#66615D] hover:text-[#1E1E1E]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="relative flex w-full lg:w-[285px] shrink-0 items-center">
              <Search aria-hidden="true" size={15} className="absolute left-3 text-[#77716B]" />
              <span className="sr-only">Search the Library</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the Library"
                className="w-full h-10 rounded-[3px] border border-[#D9D3C9] bg-transparent pl-10 pr-3 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
              />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="library-artist">Filter by artist</label>
            <select
              id="library-artist"
              value={artistId}
              onChange={(event) => setArtistId(event.target.value)}
              className="h-9 rounded-[3px] border border-[#D9D3C9] bg-transparent px-3 text-[13px]"
            >
              <option value="all">All artists</option>
              {artists.map((artist) => <option key={artist.id} value={artist.id}>{artist.name}</option>)}
            </select>
            <label className="sr-only" htmlFor="library-year">Filter by year</label>
            <select
              id="library-year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="h-9 rounded-[3px] border border-[#D9D3C9] bg-transparent px-3 text-[13px]"
            >
              <option value="all">All years</option>
              {years.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
            {haveFilters && (
              <button type="button" onClick={clearFilters} className="inline-flex gap-1 items-center text-[13px] underline underline-offset-4">
                <X size={13} aria-hidden="true" /> Clear filters
              </button>
            )}
            <span className="ml-auto text-[12px] text-[#88827C]" role="status">
              {articlesQuery.isLoading ? 'Loading resources…' : `${filteredResources.length} resources shown`}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {articlesQuery.isError && (
          <p role="alert" className="mt-8 border border-[#B2563D] p-4 text-sm">
            The Library could not load its resources. Please try again later.
          </p>
        )}
        {articlesQuery.isLoading && <p role="status" className="py-16 text-[#77716B]">Loading the archive…</p>}
        {!articlesQuery.isLoading && !articlesQuery.isError && !featured && (
          <section className="py-16">
            <h2 className="font-serif text-3xl">No resources found</h2>
            <p className="mt-3 text-sm text-[#625B56]">
              {haveFilters ? 'Try a different search or clear the filters.' : 'No Library resources are currently available in the connected content collection.'}
            </p>
          </section>
        )}

        {featured && !articlesQuery.isError && (
          <section aria-label="Featured Library resource" className="py-10 md:py-12">
            <p className="text-[11px] uppercase tracking-[.08em] text-[#88827C] mb-6">Featured {resourceLabel(resourceKind(featured)).replace(/s$/, '')}</p>
            <div className="grid gap-7 md:gap-12 md:grid-cols-[minmax(0,35%)_minmax(0,1fr)] items-center">
              <div className="aspect-[5/4] bg-[#E9E5DE] overflow-hidden flex items-center justify-center">
                {featured.hero_image ? (
                  <img src={featured.hero_image} alt="" className="w-full h-full object-contain" />
                ) : <span className="font-serif text-5xl text-[#8C8174]">WLD</span>}
              </div>
              <div className="min-w-0">
                <h2 className="font-serif font-normal text-[38px] md:text-[48px] leading-[1.1]">{featured.title}</h2>
                <p className="mt-3 text-[14px] text-[#77716B]">
                  {[resourceLabel(resourceKind(featured)), featured.author, resourceYear(featured)].filter(Boolean).join(' · ')}
                </p>
                {featured.excerpt && <p className="mt-6 text-[15px] leading-[1.75] text-[#5D5854] max-w-[680px]">{featured.excerpt}</p>}
                {featured.id && (
                  <Link to={`/ArticleDetail?id=${encodeURIComponent(featured.id)}`} className="mt-6 inline-flex items-center gap-2 min-h-11 px-5 text-white text-[13px] font-medium hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]" style={{ backgroundColor: tone.accent }}>
                    Read Resource <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {remaining.length > 0 && !articlesQuery.isError && (
          <section className="py-8 md:py-12">
            <div className="flex justify-between items-end gap-4 mb-6">
              <h2 className="font-serif text-[34px] md:text-[38px]">More from the Library</h2>
              <span className="text-xs text-[#77716B]">{remaining.length} additional resources</span>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {remaining.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
            </div>
          </section>
        )}

        <section aria-label="Explore artworks" className="border-t py-10 md:py-16" style={{ borderColor: tone.rule }}>
          <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[.09em] text-[#88827C] mb-2">From the collection</p>
              <h2 className="font-serif text-[34px] md:text-[38px]">Explore the Artworks</h2>
            </div>
            <Link to="/Collection" className="inline-flex gap-2 items-center text-[13px] underline underline-offset-4">
              View all artworks <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
          {artworksQuery.isError ? (
            <p role="alert" className="text-sm text-[#B2563D]">Artworks could not be loaded.</p>
          ) : artworksQuery.isLoading ? (
            <p role="status" className="text-sm text-[#77716B]">Loading artworks…</p>
          ) : matchingArtworks.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-10">
              {matchingArtworks.slice(0, 6).map((artwork) => (
                <ArtworkPreview key={artwork.id} artwork={artwork} onQuickView={setSelectedArtworkId} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#77716B]">No artworks match this search.</p>
          )}
        </section>
      </div>
    </main>
  );
}
