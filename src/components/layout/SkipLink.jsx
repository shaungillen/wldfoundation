import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-cream focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
    >
      Skip to main content
    </a>
  );
}