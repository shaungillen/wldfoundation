import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import CookieBanner from '@/components/layout/CookieBanner';
import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <style>{`
        :root {
          --color-cream: #FDFBF7;
          --color-charcoal: #2C2C2C;
          --color-olive: #6B7C5E;
          --color-beige: #E8E4DC;
          --color-warm-gray: #A8A29E;
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