import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, H2, Lead, Body, Quote, Caption } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import ArtworkCard from '@/components/cards/ArtworkCard';
import ArtistCard from '@/components/cards/ArtistCard';

const typeConfig = {
  news: { label: 'News', className: 'bg-charcoal/10 text-charcoal/70' },
  essay: { label: 'Essay', className: 'bg-olive/20 text-olive' },
  scholarship: { label: 'Scholarship', className: 'bg-amber-100 text-amber-800' },
  reflection: { label: 'Reflection', className: 'bg-beige text-charcoal/70' },
};

export default function ArticleDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');

  const { data: article, isLoading: articleLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => base44.entities.Article.filter({ id: articleId }),
    enabled: !!articleId,
    select: (data) => data[0],
  });

  const { data: relatedArtworks = [] } = useQuery({
    queryKey: ['artworks', 'article', articleId],
    queryFn: () => base44.entities.Artwork.list('-created_date', 500),
    select: (data) => data.filter(a => article?.related_artwork_ids?.includes(a.id)),
    enabled: !!article?.related_artwork_ids?.length,
  });

  const { data: relatedArtists = [] } = useQuery({
    queryKey: ['artists', 'article', articleId],
    queryFn: () => base44.entities.Artist.list('name', 500),
    select: (data) => data.filter(a => article?.related_artist_ids?.includes(a.id)),
    enabled: !!article?.related_artist_ids?.length,
  });

  if (articleLoading) {
    return (
      <div className="min-h-screen py-12 bg-cream">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <Skeleton className="aspect-[16/9] mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-24 bg-cream text-center">
        <div className="max-w-xl mx-auto px-4">
          <H1 className="mb-4">Article Not Found</H1>
          <Body className="mb-8">The requested article could not be found.</Body>
          <Button asChild>
            <Link to={createPageUrl('News')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const type = typeConfig[article.type] || typeConfig.news;

  return (
    <div className="min-h-screen bg-cream">
      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link 
          to={createPageUrl('News')}
          className="inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News & Writing
        </Link>
      </div>

      {/* Article Header */}
      <article className="pb-16 md:pb-24">
        <header className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={type.className}>{type.label}</Badge>
            {article.date && (
              <span className="flex items-center text-sm text-charcoal/50">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(article.date), 'MMMM d, yyyy')}
              </span>
            )}
          </div>

          <H1 className="mb-4">{article.title}</H1>

          {article.author && (
            <p className="flex items-center text-charcoal/60">
              <User className="w-4 h-4 mr-2" />
              By {article.author}
            </p>
          )}
        </header>

        {/* Hero Image */}
        {article.hero_image && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
            <div className="aspect-[16/9] bg-beige/50 overflow-hidden">
              <img 
                src={article.hero_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Excerpt/Lead */}
          {article.excerpt && (
            <Lead className="mb-8 pb-8 border-b border-charcoal/10">
              {article.excerpt}
            </Lead>
          )}

          {/* Pull Quote */}
          {article.pull_quote && (
            <Quote className="my-12">
              {article.pull_quote}
            </Quote>
          )}

          {/* Main Content */}
          {article.body && (
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-olive prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          )}

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-charcoal/10">
              <Caption className="block mb-3">Topics</Caption>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-charcoal/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <section className="py-16 md:py-24 bg-beige/30">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Related Works</H2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} showStatus={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <H2 className="mb-8">Featured Artists</H2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More Articles CTA */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <H2 className="mb-6">Continue Reading</H2>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('News')}>
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}