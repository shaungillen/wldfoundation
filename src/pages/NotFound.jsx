import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream">
      <div className="max-w-xl mx-auto px-4 text-center">
        <span className="font-serif text-8xl text-charcoal/10 block mb-8">404</span>
        <H1 className="mb-4">Page Not Found</H1>
        <Lead className="mb-8">
          The page you're looking for doesn't exist or has been moved.
        </Lead>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <Link to={createPageUrl('Home')}>
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-charcoal/20">
            <Link to={createPageUrl('Search')}>
              <Search className="w-4 h-4 mr-2" />
              Search the Site
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <Body className="text-charcoal/60 mb-4">
            Looking for something specific?
          </Body>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to={createPageUrl('Collection')} className="text-olive hover:underline">
              Browse Collection
            </Link>
            <Link to={createPageUrl('Artists')} className="text-olive hover:underline">
              View Artists
            </Link>
            <Link to={createPageUrl('Tours')} className="text-olive hover:underline">
              Plan a Visit
            </Link>
            <Link to={createPageUrl('Contact')} className="text-olive hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}