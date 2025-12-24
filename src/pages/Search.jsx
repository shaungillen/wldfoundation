import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Body } from '@/components/ui/typography';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search as SearchIcon } from 'lucide-react';
import ArtworkCard from '@/components/cards/ArtworkCard';
import ArtistCard from '@/components/cards/ArtistCard';
import ArticleCard from '@/components/cards/ArticleCard';
import LoanCard from '@/components/cards/LoanCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');

  const { data: artworks = [], isLoading: artworksLoading } = useQuery({
    queryKey: ['artworks'],
    queryFn: () => base44.entities.Artwork.list('-created_date', 500),
  });

  const { data: artists = [], isLoading: artistsLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list('name', 500),
  });

  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list('-date', 100),
  });

  const { data: loans = [], isLoading: loansLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: () => base44.entities.LoanCaseStudy.list('-start_date', 100),
  });

  const isLoading = artworksLoading || artistsLoading || articlesLoading || loansLoading;

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return { artworks: [], artists: [], articles: [], loans: [] };
    }

    const query = searchQuery.toLowerCase();

    const filteredArtworks = artworks.filter(a => 
      a.title?.toLowerCase().includes(query) ||
      a.artist_name?.toLowerCase().includes(query) ||
      a.medium?.toLowerCase().includes(query) ||
      a.themes?.some(t => t.toLowerCase().includes(query))
    );

    const filteredArtists = artists.filter(a =>
      a.name?.toLowerCase().includes(query) ||
      a.nationality?.toLowerCase().includes(query) ||
      a.bio_short?.toLowerCase().includes(query)
    );

    const filteredArticles = articles.filter(a =>
      a.title?.toLowerCase().includes(query) ||
      a.excerpt?.toLowerCase().includes(query) ||
      a.author?.toLowerCase().includes(query)
    );

    const filteredLoans = loans.filter(l =>
      l.title?.toLowerCase().includes(query) ||
      l.institution?.toLowerCase().includes(query) ||
      l.location?.toLowerCase().includes(query)
    );

    return {
      artworks: filteredArtworks,
      artists: filteredArtists,
      articles: filteredArticles,
      loans: filteredLoans,
    };
  }, [searchQuery, artworks, artists, articles, loans]);

  const totalResults = results.artworks.length + results.artists.length + 
                       results.articles.length + results.loans.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update URL for bookmarking
    const url = new URL(window.location);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Search Header */}
      <section className="py-12 md:py-16 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <H1 className="mb-8">Search</H1>
          
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <Input
                type="text"
                placeholder="Search artworks, artists, articles, exhibitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-white border-charcoal/10"
              />
            </div>
            <Button type="submit" className="h-12 px-8 bg-charcoal hover:bg-charcoal/90 text-cream">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          {searchQuery.trim() && (
            <p className="text-charcoal/60 mb-8">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} for "{searchQuery}"
            </p>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5]" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 bg-beige/50">
                <TabsTrigger value="all">
                  All ({totalResults})
                </TabsTrigger>
                <TabsTrigger value="artworks">
                  Artworks ({results.artworks.length})
                </TabsTrigger>
                <TabsTrigger value="artists">
                  Artists ({results.artists.length})
                </TabsTrigger>
                <TabsTrigger value="articles">
                  Writing ({results.articles.length})
                </TabsTrigger>
                <TabsTrigger value="loans">
                  Exhibitions ({results.loans.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {totalResults === 0 ? (
                  <div className="py-12 text-center">
                    <Body className="text-charcoal/60">
                      No results found. Try a different search term.
                    </Body>
                  </div>
                ) : (
                  <div className="space-y-16">
                    {results.artworks.length > 0 && (
                      <div>
                        <H2 className="mb-6">Artworks</H2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                          {results.artworks.slice(0, 8).map((artwork) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} />
                          ))}
                        </div>
                      </div>
                    )}

                    {results.artists.length > 0 && (
                      <div>
                        <H2 className="mb-6">Artists</H2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                          {results.artists.slice(0, 4).map((artist) => (
                            <ArtistCard key={artist.id} artist={artist} variant="compact" />
                          ))}
                        </div>
                      </div>
                    )}

                    {results.articles.length > 0 && (
                      <div>
                        <H2 className="mb-6">Writing</H2>
                        <div className="grid md:grid-cols-3 gap-6">
                          {results.articles.slice(0, 3).map((article) => (
                            <ArticleCard key={article.id} article={article} />
                          ))}
                        </div>
                      </div>
                    )}

                    {results.loans.length > 0 && (
                      <div>
                        <H2 className="mb-6">Exhibitions</H2>
                        <div className="grid md:grid-cols-3 gap-6">
                          {results.loans.slice(0, 3).map((loan) => (
                            <LoanCard key={loan.id} loan={loan} variant="compact" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="artworks">
                {results.artworks.length === 0 ? (
                  <div className="py-12 text-center">
                    <Body className="text-charcoal/60">No artworks found.</Body>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {results.artworks.map((artwork) => (
                      <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="artists">
                {results.artists.length === 0 ? (
                  <div className="py-12 text-center">
                    <Body className="text-charcoal/60">No artists found.</Body>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {results.artists.map((artist) => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="articles">
                {results.articles.length === 0 ? (
                  <div className="py-12 text-center">
                    <Body className="text-charcoal/60">No articles found.</Body>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {results.articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="loans">
                {results.loans.length === 0 ? (
                  <div className="py-12 text-center">
                    <Body className="text-charcoal/60">No exhibitions found.</Body>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {results.loans.map((loan) => (
                      <LoanCard key={loan.id} loan={loan} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="py-12 text-center">
              <Body className="text-charcoal/60">
                Enter a search term to find artworks, artists, articles, and exhibitions.
              </Body>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}