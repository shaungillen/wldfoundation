import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t hairline"
      style={{ padding: 'var(--gutter-desktop)' }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 pr-4">
          <p className="text-charcoal/70">
            We use cookies to enhance your experience and analyze site usage. 
            By continuing, you agree to our{' '}
            <Link 
              to={createPageUrl('Privacy')} 
              className="text-olive hover:underline transition-all duration-150"
            >
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="border-charcoal/20 text-charcoal/70 hover:bg-charcoal/5 h-11 px-5 transition-colors duration-150"
          >
            Decline
          </Button>
          <Button 
            onClick={handleAccept}
            className="bg-charcoal hover:bg-charcoal/90 text-cream h-11 px-5 transition-colors duration-150"
          >
            Accept All
          </Button>
        </div>
        <button 
          onClick={handleDecline}
          className="absolute top-4 right-4 md:hidden text-charcoal/50 hover:text-charcoal"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}