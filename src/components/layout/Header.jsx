import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: 'About', href: 'About' },
  { label: 'William Louis-Dreyfus', href: 'William' },
  { label: 'Collection', href: 'Collection' },
  { label: 'Gallery', href: 'Gallery' },
  { label: 'Tours', href: 'Tours' },
  { label: 'Artists', href: 'Artists' },
  { label: 'Art Loan Program', href: 'ArtLoanProgram' },
  { label: 'News & Writing', href: 'News' },
  { label: 'Get Involved', href: 'GetInvolved' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    const currentPath = location.pathname.replace('/', '');
    return currentPath === href || (currentPath === '' && href === 'Home');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-cream/95 backdrop-blur-sm shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to={createPageUrl('Home')} 
            className="flex-shrink-0 group"
          >
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl text-charcoal tracking-tight leading-none">
                William Louis-Dreyfus
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={createPageUrl(item.href)}
                className={cn(
                  "px-3 py-2 text-sm transition-colors duration-200",
                  isActive(item.href)
                    ? "text-olive"
                    : "text-charcoal/70 hover:text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Link
              to={createPageUrl('Search')}
              className="p-2 text-charcoal/70 hover:text-charcoal transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <button 
                  className="p-2 text-charcoal/70 hover:text-charcoal transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-cream p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                    <span className="font-serif text-lg text-charcoal">Menu</span>
                    <SheetClose asChild>
                      <button className="p-2 -mr-2 text-charcoal/70 hover:text-charcoal">
                        <X className="w-5 h-5" />
                      </button>
                    </SheetClose>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-6">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          to={createPageUrl(item.href)}
                          className={cn(
                            "block px-6 py-3 text-lg transition-colors",
                            isActive(item.href)
                              ? "text-olive bg-olive/5"
                              : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="p-6 border-t border-charcoal/10">
                    <Link
                      to={createPageUrl('Search')}
                      className="flex items-center space-x-3 text-charcoal/70 hover:text-charcoal"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Search className="w-5 h-5" />
                      <span>Search Collection</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}