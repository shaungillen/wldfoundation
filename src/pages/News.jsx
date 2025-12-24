import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H1, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from '@/components/cards/ArticleCard';
import { Skeleton } from "@/components/ui/skeleton";

const typeLabels = {
  all: 'All',
  news: 'News',
  essay: 'Essays',
  scholarship: 'Scholarship',
  reflection: 'Reflections',
};

export default function News() {
  const [activeType, setActiveType] = useState('all');

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list('-date', 100),
  });

  const filteredArticles = useMemo(() => {
    if (activeType === 'all') return articles;
    return articles.filter(a => a.type === activeType);
  }, [articles, activeType]);

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const remainingArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              News & Writing
            </span>
            <H1 className="mb-6">
              Insights from the Collection
            </H1>
            <Lead>
              Essays, scholarship, and reflections on the artists, works, 
              and ideas that shape our collection.
            </Lead>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <Tabs value={activeType} onValueChange={setActiveType}>
            <TabsList className="bg-beige/50 p-1">
              {Object.entries(typeLabels).map(([value, label]) => (
                <TabsTrigger 
                  key={value} 
                  value={value}
                  className="data-[state=active]:bg-white data-[state=active]:text-charcoal"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-8">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <ArticleCard article={featuredArticle} variant="feature" />
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-sm text-charcoal/60 mb-8">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10]" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : remainingArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {remainingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : filteredArticles.length <= 1 ? (
            <div className="py-12 text-center bg-beige/30 border border-charcoal/10">
              <Body className="text-charcoal/60">
                {filteredArticles.length === 0 
                  ? 'No articles found in this category.' 
                  : 'More articles coming soon.'}
              </Body>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}