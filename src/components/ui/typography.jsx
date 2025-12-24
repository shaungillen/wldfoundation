import React from 'react';
import { cn } from "@/lib/utils";

export function H1({ children, className, ...props }) {
  return (
    <h1 
      className={cn(
        "font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-charcoal leading-tight",
        className
      )} 
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
        "font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal leading-tight",
        className
      )} 
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
        "font-serif text-2xl md:text-3xl font-light text-charcoal leading-snug",
        className
      )} 
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
        "text-lg md:text-xl text-charcoal/80 leading-relaxed font-light",
        className
      )} 
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
        "text-base text-charcoal/70 leading-relaxed",
        className
      )} 
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
        "text-sm text-charcoal/60 leading-relaxed",
        className
      )} 
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