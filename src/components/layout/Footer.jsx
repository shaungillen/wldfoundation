import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await base44.entities.NewsletterSubscription.create({ email });
      toast.success('Thank you for subscribing');
      setEmail('');
    } catch (error) {
      toast.error('Unable to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    explore: [
      { label: 'Collection', href: 'Collection' },
      { label: 'Artists', href: 'Artists' },
      { label: 'Art Loan Program', href: 'ArtLoanProgram' },
      { label: 'News & Writing', href: 'News' },
    ],
    visit: [
      { label: 'Gallery — Mount Kisco', href: 'Gallery' },
      { label: 'Tours', href: 'Tours' },
      { label: 'Virtual Tour', href: 'VirtualTour' },
      { label: 'Contact', href: 'Contact' },
    ],
    about: [
      { label: 'About the Foundation', href: 'About' },
      { label: 'William Louis-Dreyfus', href: 'William' },
      { label: 'Caretakers & Governance', href: 'Governance' },
      { label: 'Harlem Children\'s Zone', href: 'HarlemChildrensZone' },
    ],
    legal: [
      { label: 'Privacy Policy', href: 'Privacy' },
      { label: 'Accessibility', href: 'Accessibility' },
      { label: 'Terms of Use', href: 'Privacy' },
    ],
  };

  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Newsletter Section */}
      <div className="border-b hairline-light">
        <div className="max-w-[1200px] mx-auto py-12 md:py-16" style={{ paddingLeft: 'var(--gutter-desktop)', paddingRight: 'var(--gutter-desktop)' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-3xl text-cream mb-2">
                Stay Connected
              </h3>
              <p className="text-cream/60">
                Receive occasional updates on exhibitions, new acquisitions, and foundation news.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-olive h-11"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 flex-shrink-0 h-11 px-6 transition-colors duration-150"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto py-12 md:py-16" style={{ paddingLeft: 'var(--gutter-desktop)', paddingRight: 'var(--gutter-desktop)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to={createPageUrl('Home')} className="inline-block">
              <span className="font-serif text-xl text-cream">
                William Louis-Dreyfus
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-olive mt-1">
                Foundation
              </span>
            </Link>
            <p className="mt-6 text-sm text-cream/50 max-w-xs">
              A private foundation dedicated to the stewardship and sharing of a significant collection of contemporary art.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-cream/50 hover:text-cream transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/50 hover:text-cream transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/50 hover:text-cream transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-cream/40 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={createPageUrl(link.href)}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-cream/40 mb-5">
              Visit
            </h4>
            <ul className="space-y-3">
              {footerLinks.visit.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={createPageUrl(link.href)}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-cream/40 mb-5">
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={createPageUrl(link.href)}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-cream/40 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={createPageUrl(link.href)}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t hairline-light">
        <div className="max-w-[1200px] mx-auto py-6" style={{ paddingLeft: 'var(--gutter-desktop)', paddingRight: 'var(--gutter-desktop)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-cream/40 space-y-4 md:space-y-0">
            <p>
              © {new Date().getFullYear()} William Louis-Dreyfus Foundation. All rights reserved.
            </p>
            <p>
              A 501(c)(3) nonprofit organization
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}