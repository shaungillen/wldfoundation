import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-9xl font-serif text-olive/20">404</span>
        </div>
        <H1 className="mb-4">Page Not Found</H1>
        <Body className="mb-8 text-charcoal/70">
          The page you're looking for doesn't exist or has been moved.
        </Body>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="border-charcoal/20">
            <Link to={createPageUrl('Home')}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
}