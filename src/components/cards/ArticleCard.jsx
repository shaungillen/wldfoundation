import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

const typeConfig = {
  news: { label: 'News', className: 'bg-charcoal/10 text-charcoal/70' },
  essay: { label: 'Essay', className: 'bg-olive/20 text-olive' },
  scholarship: { label: 'Scholarship', className: 'bg-amber-100 text-amber-800' },
  reflection: { label: 'Reflection', className: 'bg-beige text-charcoal/70' },
};

/**
 * Ensures ID is a safe, trimmed string before encoding.
 */
function safeId(value) {
  const v = String(value ?? '').trim();
  return v ? encodeURIComponent(v) : '';
}

/**
 * Resolves the path based on the mode and article ID.
 */
function resolveArticleRoute({ id, mode }) {
  const sid = safeId(id);
  if (!sid) return null;
  // Canonical path from createPageUrl
  return `/ArticleDetail?id=${sid}`;
}

export default function ArticleCard({
  article,
  variant = 'default',
  className = '',
  mode = 'page'
}) {
  const type = typeConfig[article?.type] || typeConfig.news;
  const isFeature = variant === 'feature';

  // Guard: require an id and a resolvable route before creating a link
  const to = resolveArticleRoute({ id: article?.id, mode });

  const imageBlock = (
    <div className={cn(
      "bg-beige/50 overflow-hidden",
      isFeature ? "aspect-[4/3]" : "aspect-[16/10]",
      !isFeature && "mb-4"
    )}>
      {article?.hero_image ? (
        <img
          src={article.hero_image}
          alt={article?.title ?? 'Article'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-serif text-xl text-charcoal/20">Article</span>
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className={cn(isFeature && "flex flex-col justify-center")}>
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="secondary" className={type.className} style={{ paddingLeft: 'var(--pill-padding-x)', paddingRight: 'var(--pill-padding-x)', paddingTop: 'var(--pill-padding-y)', paddingBottom: 'var(--pill-padding-y)', borderRadius: 'var(--pill-radius)' }}>
          {type.label}
        </Badge>
        {article?.date && (
          <span className={cn("text-charcoal/50", isFeature ? "text-sm" : "text-xs")}>
            {format(new Date(article.date), isFeature ? 'MMMM d, yyyy' : 'MMM d, yyyy')}
          </span>
        )}
      </div>
      <h3 className={cn(
        "font-serif text-charcoal group-hover:text-olive transition-colors mb-4",
        isFeature ? "text-2xl md:text-3xl" : "text-xl line-clamp-2"
      )}>
        {article?.title ?? 'Untitled Article'}
      </h3>
      {article?.excerpt && (
        <p className={cn("text-charcoal/60 line-clamp-3 mb-4", !isFeature && "text-sm line-clamp-2")}>
          {article.excerpt}
        </p>
      )}
      {isFeature && article?.author && (
        <p className="text-sm text-charcoal/50">
          By {article.author}
        </p>
      )}
    </div>
  );

  // If route cannot be resolved, render static block
  if (!to) {
    return (
      <div className={cn("group block opacity-70", className)}>
        {isFeature ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {imageBlock}
            {textBlock}
          </div>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn("group block", className)}
    >
      {isFeature ? (
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {imageBlock}
          {textBlock}
        </div>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </Link>
  );
}