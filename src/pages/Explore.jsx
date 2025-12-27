import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, H4, Lead, Body } from '@/components/ui/typography';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

// Hero Carousel Data
const heroSlides = [
  {
    id: 'mission',
    eyebrow: 'Explore',
    title: 'Stewardship, Education, and the Art of Sharing',
    description: 'Discover how we preserve and share a remarkable collection of contemporary art, honoring the vision of a collector who believed that art belongs to the world.',
    ctas: [
      { label: 'Explore the Collection', url: 'Collection' },
      { label: 'Plan a Visit', url: 'Visit' },
    ],
    image: 'https://wldfoundation.org/images/gallery/MKG_005.jpg',
  },
  {
    id: 'william',
    eyebrow: 'The Collector',
    title: 'A Life in Art',
    description: 'William Louis-Dreyfus (1932–2016) assembled one of the most significant private collections of contemporary art in America through four decades of passionate engagement.',
    ctas: [
      { label: 'Learn About William', url: 'William' },
    ],
    image: 'https://wldfoundation.org/images/image-foundation.jpg',
  },
  {
    id: 'governance',
    eyebrow: 'Leadership',
    title: 'Caretakers & Governance',
    description: "The Foundation is guided by family members and professionals dedicated to preserving William's legacy and ensuring the collection serves the public good.",
    ctas: [
      { label: 'View Governance', url: 'Governance' },
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80',
  },
  {
    id: 'community',
    eyebrow: 'Community Partner',
    title: "Harlem Children's Zone",
    description: "William's longtime commitment to education and equity lives on through the Foundation's continued support of HCZ's transformative work.",
    ctas: [
      { label: 'Learn More', url: 'HarlemChildrensZone' },
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80',
  },
];

// William Chapters Data
const williamChapters = [
  {
    id: 'life',
    title: 'A Life in Art',
    teaser: 'From commodities trader to visionary collector',
    content: 'William Louis-Dreyfus was born into a family of commodities traders, but his true passions lay elsewhere—in poetry, in art, and in the quiet observation of human creativity.',
  },
  {
    id: 'poet',
    title: "The Poet's Eye",
    teaser: 'Published poet and literary sensibility',
    content: 'Beyond collecting, William was a devoted poet. He published several volumes of poetry and found in verse a complement to his engagement with visual art.',
  },
  {
    id: 'collecting',
    title: 'On Collecting',
    teaser: "Philosophy: look where others don't",
    content: "Unlike many collectors of his generation, William was never drawn to the market's darlings. Instead, he followed his own eye, acquiring work by artists who were often undervalued.",
  },
  {
    id: 'timeline',
    title: 'Timeline',
    teaser: 'Key milestones from 1932 to present',
    content: 'Born in 1932, William began collecting in the 1960s and expanded the collection systematically over five decades. The Foundation was established following his passing in 2016.',
  },
  {
    id: 'legacy',
    title: 'Legacy',
    teaser: 'Continuing his vision of art as public good',
    content: "Following William's passing, the Foundation was established to ensure his collection would continue to be shared and studied.",
  },
];

// Collection Movement Data
const collectionMovement = [
  { title: 'On View', description: 'Experience works at our Mount Kisco Gallery', link: 'Gallery' },
  { title: 'On Loan', description: 'Artworks traveling to museums worldwide', link: 'ArtLoanProgram' },
  { title: 'Virtual Tour', description: 'Explore the gallery from anywhere', link: 'VirtualTour' },
  { title: 'Writing & Scholarship', description: 'Essays, research, and curatorial insights', link: 'News' },
  { title: 'Artists', description: 'Discover the creators behind the collection', link: 'Artists' },
];

// Programs Data
const programs = [
  {
    title: 'Art Loan Program',
    description: 'Works from the collection travel to museums, universities, and cultural institutions worldwide.',
    link: 'ArtLoanProgram',
  },
  {
    title: 'Tours & Education',
    description: 'Guided visits, virtual experiences, and educational programs designed to deepen engagement.',
    link: 'Tours',
  },
  {
    title: 'News & Writing',
    description: 'Scholarship, essays, and reflections on the collection and contemporary art.',
    link: 'News',
  },
];

// Providence Chips Data
const providenceChips = [
  {
    id: 'choice',
    label: 'Choice',
    content: 'William believed that every acquisition should reflect genuine conviction, not trend or speculation. Each work in the collection was chosen because it spoke to him personally—a practice of discernment over decades.',
  },
  {
    id: 'attention',
    label: 'Attention',
    content: 'True appreciation requires sustained looking. William spent time with works, returned to them, and understood that meaning deepens with repeated engagement.',
  },
  {
    id: 'responsibility',
    label: 'Responsibility',
    content: 'Collectors bear responsibility to artists, to the public, and to future generations. William saw himself as a temporary caretaker of works that would outlive him.',
  },
  {
    id: 'access',
    label: 'Access',
    content: 'Great art should not be hidden. From the beginning, William lent works to institutions and welcomed visitors.',
  },
  {
    id: 'care',
    label: 'Care',
    content: 'Stewardship means rigorous conservation, proper documentation, and thoughtful presentation. The Foundation maintains the highest standards.',
  },
];

// Board Members
const boardMembers = [
  { name: 'Julia Louis-Dreyfus', role: 'Board Chair' },
  { name: 'Robert Charles Louis-Dreyfus', role: 'Vice Chair' },
  { name: 'Marjorie Louis-Dreyfus', role: 'Secretary' },
];

// Staff Members
const staffMembers = [
  { name: 'Dr. Catherine Wells', role: 'Executive Director' },
  { name: 'Michael Torres', role: 'Director of Collections' },
  { name: 'Sarah Chen', role: 'Curator' },
];

export default function Explore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [selectedProvidence, setSelectedProvidence] = useState('choice');
  const [showHCZExpanded, setShowHCZExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  const heroIntervalRef = useRef(null);
  const chaptersScrollRef = useRef(null);
  const movementScrollRef = useRef(null);

  // Hero Carousel Auto-play
  useEffect(() => {
    if (!isHoveringHero) {
      heroIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
    }
    return () => clearInterval(heroIntervalRef.current);
  }, [isHoveringHero]);

  // Intersection Observer for Active Section
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  // Nav items
  const navItems = [
    { id: 'mission', number: '01', label: 'Mission' },
    { id: 'principles', number: '02', label: 'Principles' },
    { id: 'william', number: '03', label: 'William' },
    { id: 'collection', number: '04', label: 'Collection' },
    { id: 'programs', number: '05', label: 'Programs' },
    { id: 'providence', number: '06', label: 'Providence' },
    { id: 'governance', number: '07', label: 'Governance' },
    { id: 'community', number: '08', label: 'Community' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Story Carousel */}
      <section 
        className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
                <div className="max-w-2xl">
                  <span className="text-xs uppercase tracking-[0.2em] text-cream/80 mb-3 block">
                    {slide.eyebrow}
                  </span>
                  <H1 className="text-cream mb-4">{slide.title}</H1>
                  <p className="text-cream/90 text-lg mb-6 leading-relaxed">{slide.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {slide.ctas.map((cta, ctaIndex) => (
                      <Link
                        key={ctaIndex}
                        to={createPageUrl(cta.url)}
                        className="text-cream hover:text-cream/80 text-sm inline-flex items-center underline underline-offset-4 transition-colors"
                      >
                        {cta.label}
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentSlide ? 'bg-cream w-8' : 'bg-cream/40 hover:bg-cream/60 w-2'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Mobile Index */}
      <div className="lg:hidden border-b hairline bg-cream">
        <div className="px-4 py-4">
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-charcoal"
          >
            {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            On this page
          </button>
          
          {showMobileNav && (
            <nav className="mt-4 space-y-2 border-t hairline pt-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setShowMobileNav(false)}
                  className={cn(
                    "flex items-center gap-3 py-2 text-sm transition-colors",
                    activeSection === item.id
                      ? 'text-charcoal font-medium'
                      : 'text-charcoal/60 hover:text-charcoal'
                  )}
                >
                  <span className="text-xs font-mono text-charcoal/40">{item.number}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Main Content Grid with Vertical Rail */}
      <div className="relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-20 py-12 lg:py-16">
            {/* Desktop Vertical Sticky Rail */}
            <aside className="hidden lg:block">
              <nav className="sticky top-32 pl-4 border-l hairline relative">
                <p className="text-xs uppercase tracking-[0.15em] text-charcoal/30 mb-5 font-normal" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
                  Explore Index
                </p>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "flex items-center gap-3 py-1.5 transition-all relative group",
                      activeSection === item.id
                        ? 'text-charcoal'
                        : 'text-charcoal/40 hover:text-charcoal/70'
                    )}
                    style={{ fontSize: '13px', lineHeight: '1.4' }}
                  >
                    <span className={cn(
                      "font-mono transition-colors w-5",
                      activeSection === item.id ? 'text-charcoal/50' : 'text-charcoal/25'
                    )}
                    style={{ fontSize: '11px' }}>
                      {item.number}
                    </span>
                    <span className="relative">
                      {item.label}
                      {activeSection === item.id && (
                        <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-olive" 
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="space-y-24 md:space-y-28">
              {/* Mission Module */}
              <section id="mission" className="scroll-mt-28">
                <div className="max-w-3xl">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                    Our Mission
                  </span>
                  <H2 className="mb-6">A Collection in Service of the Public Good</H2>
                  <Lead className="mb-6">
                    For over four decades, William Louis-Dreyfus assembled one of the most significant 
                    private collections of contemporary art in the United States.
                  </Lead>
                  
                  <div className="space-y-4 mb-8">
                    <Body>
                      His approach was distinctive: he collected not for status or speculation, but out of 
                      genuine passion for the work and deep respect for artists. The Foundation continues 
                      this legacy through active stewardship.
                    </Body>
                    
                    {expandedPrinciple === 'mission' && (
                      <div className="space-y-4 border-t hairline pt-6 mt-6">
                        <Body>
                          We believe that great art should be accessible. Through our programs, thousands 
                          of people each year encounter these works, whether in person at a partner 
                          institution, through our virtual tours, or in scholarly publications.
                        </Body>
                        <ul className="space-y-2 text-charcoal/70" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--line-body)' }}>
                          <li><strong>Stewardship:</strong> Rigorous conservation and documentation</li>
                          <li><strong>Access:</strong> Active loan program and public engagement</li>
                          <li><strong>Education:</strong> Research support and programming</li>
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'mission' ? null : 'mission')}
                      className="text-olive hover:underline text-sm"
                    >
                      {expandedPrinciple === 'mission' ? 'Show less' : 'Read more'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <Link to={createPageUrl('Collection')} className="text-olive hover:underline inline-flex items-center">
                      Explore Collection <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <span className="text-charcoal/20">·</span>
                    <Link to={createPageUrl('ArtLoanProgram')} className="text-olive hover:underline inline-flex items-center">
                      Art Loan Program <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <span className="text-charcoal/20">·</span>
                    <Link to={createPageUrl('Visit')} className="text-olive hover:underline inline-flex items-center">
                      Plan a Visit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Principles - 3 Column Editorial Layout */}
              <section id="principles" className="scroll-mt-28 border-t hairline pt-20">
                <div className="mb-14">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                    Our Values
                  </span>
                  <H2>Principles That Guide Us</H2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 md:gap-0 md:divide-x hairline">
                  {/* Stewardship */}
                  <div className="md:pr-10">
                    <span className="text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3 block">
                      Stewardship
                    </span>
                    <H3 className="mb-4">Caretakers, Not Owners</H3>
                    <Body className="text-sm mb-4 text-charcoal/70">
                      Every decision considers long-term preservation and accessibility for future 
                      generations. We maintain rigorous conservation standards.
                    </Body>
                    {expandedPrinciple === 'stewardship' && (
                      <Body className="text-sm mb-4 border-t hairline pt-4 text-charcoal/70">
                        We work with leading conservators, maintain climate-controlled storage, and 
                        carefully vet all loan requests to ensure works are handled with the highest care.
                      </Body>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'stewardship' ? null : 'stewardship')}
                      className="text-olive hover:underline text-sm"
                    >
                      {expandedPrinciple === 'stewardship' ? 'Close' : 'Expand'}
                    </button>
                  </div>

                  {/* Access */}
                  <div className="md:px-10">
                    <span className="text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3 block">
                      Access
                    </span>
                    <H3 className="mb-4">Art Should Be Shared</H3>
                    <Body className="text-sm mb-4 text-charcoal/70">
                      Great art should not be hidden away. We continually seek new ways to share 
                      the collection with diverse audiences worldwide.
                    </Body>
                    {expandedPrinciple === 'access' && (
                      <Body className="text-sm mb-4 border-t hairline pt-4 text-charcoal/70">
                        Through loans, gallery tours, virtual experiences, and online resources, we make 
                        contemporary art accessible to students, scholars, and the public.
                      </Body>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'access' ? null : 'access')}
                      className="text-olive hover:underline text-sm"
                    >
                      {expandedPrinciple === 'access' ? 'Close' : 'Expand'}
                    </button>
                  </div>

                  {/* Education */}
                  <div className="md:pl-10">
                    <span className="text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3 block">
                      Education
                    </span>
                    <H3 className="mb-4">Deepening Understanding</H3>
                    <Body className="text-sm mb-4 text-charcoal/70">
                      We support scholarship, publish research, and create resources that deepen 
                      understanding of the artists and movements in the collection.
                    </Body>
                    {expandedPrinciple === 'education' && (
                      <Body className="text-sm mb-4 border-t hairline pt-4 text-charcoal/70">
                        We publish essays, support curatorial research, and offer educational programs 
                        to foster deeper engagement with contemporary art.
                      </Body>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'education' ? null : 'education')}
                      className="text-olive hover:underline text-sm"
                    >
                      {expandedPrinciple === 'education' ? 'Close' : 'Expand'}
                    </button>
                  </div>
                </div>
              </section>

              {/* William Module */}
              <section id="william" className="scroll-mt-28 border-t hairline pt-20">
                <div className="mb-4 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive block">
                    The Collector
                  </span>
                  <Link 
                    to={createPageUrl('William')}
                    className="hidden lg:inline-flex text-sm text-olive hover:underline items-center"
                  >
                    Explore William's Page <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
                
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
                  {/* Left: Intro */}
                  <div>
                    <H2 className="mb-6">William Louis-Dreyfus</H2>
                    <Lead className="text-charcoal/70">
                      A lawyer and businessman who became one of the most discerning collectors 
                      of contemporary art—following his own eye and believing that art should be shared.
                    </Lead>
                  </div>

                  {/* Right: Chapter List (Desktop) */}
                  <div className="hidden lg:block space-y-0 divide-y hairline">
                    {williamChapters.map((chapter, index) => (
                      <Link
                        key={chapter.id}
                        to={createPageUrl('William')}
                        className="block py-5 group hover:bg-beige/20 transition-colors -mx-4 px-4"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-xs font-mono text-charcoal/30 mt-1 flex-shrink-0">
                            Chapter {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <H4 className="mb-1 group-hover:text-olive transition-colors">{chapter.title}</H4>
                            <p className="text-sm text-charcoal/60 leading-relaxed mb-2">{chapter.teaser}</p>
                            <span className="text-xs text-olive inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              Read more <ArrowRight className="w-3 h-3 ml-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Horizontal Scroll (Mobile/Tablet) */}
                <div className="lg:hidden mt-10 relative">
                  <div 
                    ref={chaptersScrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {williamChapters.map((chapter, index) => (
                      <Link
                        key={chapter.id}
                        to={createPageUrl('William')}
                        className="flex-shrink-0 w-[280px] snap-start border-b hairline pb-6 group"
                      >
                        <span className="text-xs font-mono text-charcoal/40 mb-2 block">
                          Chapter {String(index + 1).padStart(2, '0')}
                        </span>
                        <H3 className="mb-2 group-hover:text-olive transition-colors">{chapter.title}</H3>
                        <p className="text-sm text-charcoal/60 mb-4 leading-relaxed">{chapter.teaser}</p>
                        <span className="text-sm text-olive inline-flex items-center">
                          Read more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => scrollCarousel(chaptersScrollRef, 'prev')}
                      className="w-9 h-9 rounded-full border hairline flex items-center justify-center hover:bg-beige/50 transition-colors"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4 text-charcoal" />
                    </button>
                    <button
                      onClick={() => scrollCarousel(chaptersScrollRef, 'next')}
                      className="w-9 h-9 rounded-full border hairline flex items-center justify-center hover:bg-beige/50 transition-colors"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 lg:hidden">
                  <Link 
                    to={createPageUrl('William')}
                    className="text-olive hover:underline inline-flex items-center"
                  >
                    Explore William's Page <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </section>

              {/* Collection as Public Good */}
              <section id="collection" className="scroll-mt-28 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-24 bg-charcoal text-cream">
                <div className="max-w-[1200px]">
                  <div className="mb-14">
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                      Explore
                    </span>
                    <H2 className="text-cream mb-4">Collection as a Public Good</H2>
                    <p className="text-cream/70 max-w-2xl leading-relaxed" style={{ fontSize: 'var(--text-body)' }}>
                      Art fulfills its purpose when it is seen, studied, and shared. Discover the many 
                      ways the collection moves through the world.
                    </p>
                  </div>

                  <div className="relative">
                    <div 
                      ref={movementScrollRef}
                      className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {collectionMovement.map((item, index) => (
                        <Link
                          key={index}
                          to={createPageUrl(item.link)}
                          className="flex-shrink-0 w-[280px] snap-start border-b hairline-light pb-6 hover:border-cream/40 transition-colors group"
                        >
                          <H4 className="text-cream mb-2 group-hover:text-cream/80 transition-colors">{item.title}</H4>
                          <p className="text-sm text-cream/60 mb-4 leading-relaxed">{item.description}</p>
                          <span className="text-sm text-olive inline-flex items-center">
                            Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => scrollCarousel(movementScrollRef, 'prev')}
                        className="w-9 h-9 rounded-full border hairline-light flex items-center justify-center hover:bg-cream/10 transition-colors"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-4 h-4 text-cream" />
                      </button>
                      <button
                        onClick={() => scrollCarousel(movementScrollRef, 'next')}
                        className="w-9 h-9 rounded-full border hairline-light flex items-center justify-center hover:bg-cream/10 transition-colors"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-4 h-4 text-cream" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Programs */}
              <section id="programs" className="scroll-mt-28 border-t hairline pt-20">
                <div className="flex items-end justify-between mb-14">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                      Explore
                    </span>
                    <H2>Programs</H2>
                  </div>
                  <Link 
                    to={createPageUrl('Programs')}
                    className="hidden md:inline-flex text-sm text-olive hover:underline items-center"
                  >
                    Browse all <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
                  {programs.map((program, index) => (
                    <div key={index} className="border-t hairline pt-8 md:border-t-0 md:pt-0 first:border-t-0 first:pt-0">
                      <H3 className="mb-4">{program.title}</H3>
                      <Body className="text-sm text-charcoal/70 mb-4 leading-relaxed">{program.description}</Body>
                      <Link 
                        to={createPageUrl(program.link)}
                        className="text-sm text-olive hover:underline inline-flex items-center"
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-8 md:hidden">
                  <Link 
                    to={createPageUrl('Programs')}
                    className="text-sm text-olive hover:underline inline-flex items-center"
                  >
                    Browse all programs <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </section>

              {/* Providence */}
              <section id="providence" className="scroll-mt-28 border-t hairline pt-20">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                      A Lens
                    </span>
                    <H2 className="mb-4">Providence</H2>
                    <Body className="text-charcoal/70">
                      Core values that shaped William's approach to collecting and continue to guide 
                      the Foundation's work.
                    </Body>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {providenceChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => setSelectedProvidence(chip.id)}
                        className={cn(
                          "px-4 py-1.5 text-sm border hairline transition-all",
                          selectedProvidence === chip.id
                            ? 'text-charcoal border-charcoal underline underline-offset-4'
                            : 'text-charcoal/60 border-charcoal/15 hover:border-charcoal/30 hover:text-charcoal'
                        )}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Content Panel */}
                  <div className="border-t border-b hairline py-10 min-h-[140px]">
                    {providenceChips.map((chip) => (
                      <div
                        key={chip.id}
                        className={cn(
                          "transition-opacity duration-300",
                          selectedProvidence === chip.id ? 'opacity-100' : 'opacity-0 hidden'
                        )}
                      >
                        <Body className="text-center leading-relaxed">{chip.content}</Body>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Governance */}
              <section id="governance" className="scroll-mt-28 border-t hairline pt-20">
                <div className="mb-14">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                    Leadership
                  </span>
                  <H2 className="mb-4">Caretakers & Governance</H2>
                  <Body className="text-charcoal/70 max-w-2xl">
                    The Foundation is guided by family members and professionals dedicated to preserving 
                    William's legacy and ensuring the collection serves the public good.
                  </Body>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  {/* Board */}
                  <div>
                    <H3 className="mb-8">Board of Directors</H3>
                    <div className="space-y-5">
                      {boardMembers.map((member) => (
                        <div key={member.name} className="border-b hairline pb-5">
                          <H4 className="mb-1">{member.name}</H4>
                          <p className="text-olive text-sm">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Staff */}
                  <div>
                    <H3 className="mb-8">Foundation Staff</H3>
                    <div className="space-y-5">
                      {staffMembers.map((member) => (
                        <div key={member.name} className="border-b hairline pb-5">
                          <p className="font-medium text-charcoal mb-1">{member.name}</p>
                          <p className="text-sm text-charcoal/60">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Link 
                    to={createPageUrl('Governance')}
                    className="text-olive hover:underline inline-flex items-center"
                  >
                    View Caretakers & Governance <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </section>

              {/* Community Partner - HCZ */}
              <section id="community" className="scroll-mt-28 border-t hairline pt-20">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive block">
                    Community
                  </span>
                </div>
                <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
                  {/* Narrative */}
                  <div>
                    <H2 className="mb-6">Harlem Children's Zone</H2>
                    <Body className="mb-4">
                      William Louis-Dreyfus was an early and steadfast supporter of Harlem Children's 
                      Zone, drawn to its ambitious vision and evidence-based approach. He believed that 
                      investing in children was the most meaningful contribution one could make.
                    </Body>
                    
                    {showHCZExpanded && (
                      <div className="space-y-4 mb-4 border-t hairline pt-4">
                        <Body>
                          His involvement went beyond financial support. He served on the board, visited 
                          programs regularly, and championed the organization's work within his network.
                        </Body>
                        <Body>
                          The Foundation continues to support Harlem Children's Zone, honoring William's 
                          belief that art and education are complementary forces for human flourishing.
                        </Body>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setShowHCZExpanded(!showHCZExpanded)}
                      className="text-olive hover:underline text-sm mb-6"
                    >
                      {showHCZExpanded ? 'Show less' : 'Read more'}
                    </button>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <a 
                        href="https://hcz.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-olive hover:underline inline-flex items-center"
                      >
                        Visit HCZ <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                      <span className="text-charcoal/20">·</span>
                      <Link 
                        to={createPageUrl('HarlemChildrensZone')}
                        className="text-olive hover:underline inline-flex items-center"
                      >
                        Why This Partnership <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="border-b hairline pb-5">
                      <H3 className="mb-1">27,000+</H3>
                      <p className="text-sm text-charcoal/60">Served annually</p>
                    </div>
                    <div className="border-b hairline pb-5">
                      <H3 className="mb-1">97 Blocks</H3>
                      <p className="text-sm text-charcoal/60">Of Central Harlem</p>
                    </div>
                    <div className="border-b hairline pb-5">
                      <H3 className="mb-1">50+ Years</H3>
                      <p className="text-sm text-charcoal/60">Of service</p>
                    </div>
                    <div className="border-b hairline pb-5">
                      <H3 className="mb-1">90%+</H3>
                      <p className="text-sm text-charcoal/60">Graduation rate</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quote Section */}
              <section className="-mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-24 bg-charcoal text-cream">
                <div className="max-w-3xl mx-auto text-center">
                  <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream/90 italic leading-relaxed mb-8">
                    "The true value of a collection lies not in what you own, but in what you share. 
                    Art that is seen, studied, and loved fulfills its purpose."
                  </blockquote>
                  <cite className="text-cream/60 text-sm not-italic">
                    — William Louis-Dreyfus, 1932–2016
                  </cite>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}