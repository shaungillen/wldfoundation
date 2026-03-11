import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

/**
 * Ensures ID is a safe, trimmed string before encoding.
 */
function safeId(value) {
  const v = String(value ?? '').trim();
  return v ? encodeURIComponent(v) : '';
}

/**
 * Resolves the path based on the mode and loan ID.
 */
function resolveLoanRoute({ id, mode }) {
  const sid = safeId(id);
  if (!sid) return null;
  // Page name in createPageUrl was LoanCaseStudy?id=${loan.id}
  return `/LoanCaseStudy?id=${sid}`;
}

export default function LoanCard({
  loan,
  variant = 'default',
  className = '',
  mode = 'page'
}) {
  const isCompact = variant === 'compact';
  const isActive = loan?.end_date && new Date(loan.end_date) > new Date();

  // Guard: require an id and a resolvable route before creating a link
  const to = resolveLoanRoute({ id: loan?.id, mode });

  const imageBlock = (
    <div className={cn(
      "bg-beige/50 overflow-hidden",
      isCompact ? "aspect-[16/10]" : "aspect-[4/3]"
    )}>
      {loan?.hero_image ? (
        <img
          src={loan.hero_image}
          alt={loan?.title ?? 'Loan'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-serif text-2xl text-charcoal/20">
            {loan?.institution?.charAt(0) ?? 'L'}
          </span>
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className={cn("mt-4", isCompact && "mt-3")}>
      <div className="flex items-center gap-2 mb-2">
        {isActive && (
          <Badge variant="secondary" className="bg-olive/20 text-olive text-xs" style={{ paddingLeft: 'var(--pill-padding-x)', paddingRight: 'var(--pill-padding-x)', paddingTop: 'var(--pill-padding-y)', paddingBottom: 'var(--pill-padding-y)', borderRadius: 'var(--pill-radius)' }}>
            Current
          </Badge>
        )}
        {loan?.location && (
          <span className="flex items-center text-xs text-charcoal/50">
            <MapPin className="w-3 h-3 mr-1" />
            {loan.location}
          </span>
        )}
      </div>

      <h3 className={cn(
        "font-serif text-charcoal group-hover:text-olive transition-colors",
        isCompact ? "text-lg line-clamp-1" : "text-xl line-clamp-2"
      )}>
        {loan?.title ?? 'Untitled Loan'}
      </h3>

      <p className="text-sm text-charcoal/60 mt-1">
        {loan?.institution ?? 'Unknown Institution'}
      </p>

      {!isCompact && (loan?.start_date || loan?.end_date) && (
        <p className="flex items-center text-xs text-charcoal/50 mt-2">
          <Calendar className="w-3 h-3 mr-1" />
          {loan.start_date && format(new Date(loan.start_date), 'MMM yyyy')}
          {loan.start_date && loan.end_date && ' – '}
          {loan.end_date && format(new Date(loan.end_date), 'MMM yyyy')}
        </p>
      )}
    </div>
  );

  // If route cannot be resolved, render static block
  if (!to) {
    return (
      <div className={cn("group block opacity-70", className)}>
        {imageBlock}
        {textBlock}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn("group block", className)}
    >
      {imageBlock}
      {textBlock}
    </Link>
  );
}