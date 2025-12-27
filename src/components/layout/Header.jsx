import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Search, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.explore'), href: 'Explore' },
    { label: t('nav.collection'), href: 'Collection' },
    { label: t('nav.programs'), href: 'Programs' },
    { label: t('nav.visit'), href: 'Visit' },
    { label: t('nav.news'), href: 'News' },
  ];

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-cream"
      )}
    >
      {/* Top Utility Bar */}
      <div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-6"
          style={{ paddingLeft: 'var(--gutter-desktop)', paddingRight: 'var(--gutter-desktop)' }}
        >
          <div className="flex items-center justify-end h-10 gap-4">
            <Link
              to={createPageUrl('Contact')}
              className="flex items-center gap-2 text-xs text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Contact</span>
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={cn(
          "border-b transition-all duration-200",
          isScrolled 
            ? "border-charcoal/15" 
            : "border-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-6"
          style={{ paddingLeft: 'var(--gutter-desktop)', paddingRight: 'var(--gutter-desktop)' }}
        >
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={createPageUrl('Home')} 
            className="flex-shrink-0 group"
          >
            <div className="flex flex-col">
              <span className="font-serif text-xl text-charcoal tracking-tight leading-none">
                William Louis-Dreyfus
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mt-1">
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
                  "px-3 py-2 text-sm transition-colors duration-150 relative",
                  isActive(item.href)
                    ? "text-olive"
                    : "text-charcoal/70 hover:text-charcoal"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-olive" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Input + Mobile Menu */}
          <div className="flex items-center gap-3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const searchValue = e.target.search.value;
                if (searchValue) {
                  window.location.href = createPageUrl(`Search?q=${encodeURIComponent(searchValue)}`);
                }
              }}
              className="hidden lg:flex items-center"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search collection..."
                  className="pl-9 pr-4 py-1.5 text-sm border border-charcoal/10 rounded-sm bg-cream hover:border-charcoal/20 focus:border-olive focus:outline-none transition-colors w-48"
                />
              </div>
            </form>
            
            <Link
              to={createPageUrl('Search')}
              className="lg:hidden p-2 text-charcoal/70 hover:text-charcoal transition-colors duration-150"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <button 
                  className="p-2 text-charcoal/70 hover:text-charcoal transition-colors duration-150"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-cream p-0 border-l hairline">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-6 border-b hairline">
                    <span className="font-serif text-xl text-charcoal">Menu</span>
                    <SheetClose asChild>
                      <button className="p-2 -mr-2 text-charcoal/70 hover:text-charcoal" style={{ minHeight: '44px', minWidth: '44px' }}>
                        <X className="w-5 h-5" />
                      </button>
                    </SheetClose>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-8 px-2">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          to={createPageUrl(item.href)}
                          className={cn(
                            "block px-6 py-4 text-lg transition-colors duration-150 rounded-sm",
                            isActive(item.href)
                              ? "text-olive"
                              : "text-charcoal/70 hover:text-charcoal"
                          )}
                          style={{ minHeight: '56px' }}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-6 py-6 border-t hairline space-y-2">
                    <Link
                      to={createPageUrl('Search')}
                      className="flex items-center space-x-3 text-charcoal/70 hover:text-charcoal py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Search className="w-5 h-5" />
                      <span className="text-base">Search Collection</span>
                    </Link>
                    <Link
                      to={createPageUrl('Contact')}
                      className="flex items-center space-x-3 text-charcoal/70 hover:text-charcoal py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-base">Contact</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}