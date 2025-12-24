import React from 'react';
import { cn } from "@/lib/utils";

export function H1({ children, className, ...props }) {
  return (
    <h1 
      className={cn(
        "font-serif text-charcoal font-light tracking-tight",
        className
      )}
      style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--line-h1)' }}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }) {
  return (
    <h2 
      className={cn(
        "font-serif text-charcoal font-light tracking-tight",
        className
      )}
      style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--line-h2)' }}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }) {
  return (
    <h3 
      className={cn(
        "font-serif text-charcoal font-light",
        className
      )}
      style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--line-h3)' }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }) {
  return (
    <h4 
      className={cn(
        "font-serif text-xl md:text-2xl font-normal text-charcoal leading-snug",
        className
      )} 
      {...props}
    >
      {children}
    </h4>
  );
}

export function Lead({ children, className, ...props }) {
  return (
    <p 
      className={cn(
        "text-charcoal/80 font-light",
        className
      )}
      style={{ fontSize: '20px', lineHeight: '1.6', maxWidth: '65ch' }}
      {...props}
    >
      {children}
    </p>
  );
}

export function Body({ children, className, ...props }) {
  return (
    <p 
      className={cn(
        "text-charcoal/70",
        className
      )}
      style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--line-body)' }}
      {...props}
    >
      {children}
    </p>
  );
}

export function Small({ children, className, ...props }) {
  return (
    <p 
      className={cn(
        "text-charcoal/60",
        className
      )}
      style={{ fontSize: 'var(--text-small)', lineHeight: '1.55' }}
      {...props}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className, ...props }) {
  return (
    <span 
      className={cn(
        "text-xs uppercase tracking-widest text-charcoal/50 font-medium",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
}

export function Quote({ children, author, className, ...props }) {
  return (
    <blockquote 
      className={cn(
        "border-l-2 border-olive pl-6 py-2",
        className
      )} 
      {...props}
    >
      <p className="font-serif text-xl md:text-2xl text-charcoal/80 italic leading-relaxed">
        "{children}"
      </p>
      {author && (
        <cite className="block mt-4 text-sm text-charcoal/60 not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}