import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

const typeConfig = {
  news: { label: 'News', className: 'bg-charcoal/10 text-charcoal/70' },
  essay: { label: 'Essay', className: 'bg-olive/20 text-olive' },
  scholarship: { label: 'Scholarship', className: 'bg-amber-100 text-amber-800' },
  reflection: { label: 'Reflection', className: 'bg-beige text-charcoal/70' },
};

export default function ArticleCard({ article, variant = 'default', className }) {
  const type = typeConfig[article.type] || typeConfig.news;
  const isFeature = variant === 'feature';

  return (
    <Link 
      to={createPageUrl(`ArticleDetail?id=${article.id}`)}
      className={cn(
        "group block",
        className
      )}
    >
      {isFeature ? (
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="aspect-[4/3] bg-beige/50 overflow-hidden">
            {article.hero_image ? (
              <img 
                src={article.hero_image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-2xl text-charcoal/20">Article</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={type.className}>{type.label}</Badge>
              {article.date && (
                <span className="text-sm text-charcoal/50">
                  {format(new Date(article.date), 'MMMM d, yyyy')}
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-olive transition-colors mb-4">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-charcoal/60 line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            )}
            {article.author && (
              <p className="text-sm text-charcoal/50">
                By {article.author}
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="aspect-[16/10] bg-beige/50 overflow-hidden mb-4">
            {article.hero_image ? (
              <img 
                src={article.hero_image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-xl text-charcoal/20">Article</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={cn("text-xs", type.className)}>{type.label}</Badge>
            {article.date && (
              <span className="text-xs text-charcoal/50">
                {format(new Date(article.date), 'MMM d, yyyy')}
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-charcoal/60 line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </>
      )}
    </Link>
  );
}