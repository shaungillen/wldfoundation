import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import CookieBanner from '@/components/layout/CookieBanner';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ScrollToTop />
      <style>{`
        :root {
          --color-cream: #FDFBF7;
          --color-charcoal: #2C2C2C;
          --color-olive: #6B7C5E;
          --color-beige: #E8E4DC;
          --color-warm-gray: #A8A29E;

          /* Layout System */
          --container-max: 1200px;
          --gutter-desktop: 24px;
          --gutter-mobile: 16px;
          --section-padding-y-desktop: 64px;
          --section-padding-y-tablet: 48px;
          --section-padding-y-mobile: 40px;

          /* Typography Scale */
          --text-h1: 48px;
          --text-h1-mobile: 34px;
          --text-h2: 32px;
          --text-h3: 24px;
          --text-body: 17px;
          --text-small: 13px;

          --line-h1: 1.15;
          --line-h2: 1.25;
          --line-h3: 1.35;
          --line-body: 1.65;

          /* Spacing */
          --space-section: 32px;
          --space-group: 24px;
          --space-element: 16px;
          --space-para: 14px;
        }

        .bg-cream { background-color: var(--color-cream); }
        .text-cream { color: var(--color-cream); }
        .bg-charcoal { background-color: var(--color-charcoal); }
        .text-charcoal { color: var(--color-charcoal); }
        .bg-olive { background-color: var(--color-olive); }
        .text-olive { color: var(--color-olive); }
        .bg-beige { background-color: var(--color-beige); }
        .text-beige { color: var(--color-beige); }
        .border-olive { border-color: var(--color-olive); }
        .border-charcoal { border-color: var(--color-charcoal); }
        .border-cream { border-color: var(--color-cream); }
        .border-beige { border-color: var(--color-beige); }

        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: var(--text-body);
          line-height: var(--line-body);
        }

        /* Layout System */
        .section-wrapper {
          padding-top: var(--section-padding-y-desktop);
          padding-bottom: var(--section-padding-y-desktop);
        }

        @media (max-width: 768px) {
          .section-wrapper {
            padding-top: var(--section-padding-y-tablet);
            padding-bottom: var(--section-padding-y-tablet);
          }
        }

        @media (max-width: 640px) {
          .section-wrapper {
            padding-top: var(--section-padding-y-mobile);
            padding-bottom: var(--section-padding-y-mobile);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid var(--color-olive);
          outline-offset: 2px;
        }

        /* Hairline borders */
        .hairline {
          border-width: 1px;
          border-color: rgba(44, 44, 44, 0.15);
        }

        .hairline-light {
          border-width: 1px;
          border-color: rgba(253, 251, 247, 0.15);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-cream);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-warm-gray);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-charcoal);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      <SkipLink />
      <Header />
      
      <main id="main-content" className="flex-1 pt-20">
        {children}
      </main>
      
      <Footer />
      <CookieBanner />
      <Toaster position="bottom-right" />
    </div>
  );
}