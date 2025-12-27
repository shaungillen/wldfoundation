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
  },
  {
    id: 'poet',
    title: "The Poet's Eye",
    teaser: 'Published poet and literary sensibility',
  },
  {
    id: 'collecting',
    title: 'On Collecting',
    teaser: "Philosophy: look where others don't",
  },
  {
    id: 'timeline',
    title: 'Timeline',
    teaser: 'Key milestones from 1932 to present',
  },
  {
    id: 'legacy',
    title: 'Legacy',
    teaser: 'Continuing his vision of art as public good',
  },
];

// Collection Movement Data
const collectionMovement = [
  { title: 'On View', description: 'Experience works at our Mount Kisco Gallery', link: 'Gallery', image: 'https://wldfoundation.org/images/gallery/MKG_005.jpg' },
  { title: 'On Loan', description: 'Artworks traveling to museums worldwide', link: 'ArtLoanProgram', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80' },
  { title: 'Virtual Tour', description: 'Explore the gallery from anywhere', link: 'VirtualTour', image: 'https://images.unsplash.com/photo-1577083300638-f9f0bfd4be7c?w=800&q=80' },
  { title: 'Writing & Scholarship', description: 'Essays, research, and curatorial insights', link: 'News', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80' },
  { title: 'Artists', description: 'Discover the creators behind the collection', link: 'Artists', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80' },
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

// Board & Staff Members
const boardMembers = [
  { name: 'Julia Louis-Dreyfus', role: 'Board Chair' },
  { name: 'Robert Charles Louis-Dreyfus', role: 'Vice Chair' },
  { name: 'Marjorie Louis-Dreyfus', role: 'Secretary' },
];

const staffMembers = [
  { name: 'Dr. Catherine Wells', role: 'Executive Director' },
  { name: 'Michael Torres', role: 'Director of Collections' },
  { name: 'Sarah Chen', role: 'Curator' },
];

export default function Explore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [showHCZExpanded, setShowHCZExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  const heroIntervalRef = useRef(null);
  const programsScrollRef = useRef(null);

  // Hero Carousel Auto-play
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!isHoveringHero && !prefersReducedMotion) {
      heroIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
    }
    return () => clearInterval(heroIntervalRef.current);
  }, [isHoveringHero]);

  // Intersection Observer for Active Section
  useEffect(() => {
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
    { id: 'governance', number: '06', label: 'Governance' },
    { id: 'community', number: '07', label: 'Community' },
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
                        className="text-cream hover:text-cream/80 text-sm inline-flex items-center underline underline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
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
            className="w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
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
                  "h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream",
                  index === currentSlide ? 'bg-cream w-8' : 'bg-cream/40 hover:bg-cream/60 w-2'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Mobile Index */}
      <div className="lg:hidden bg-cream">
        <div className="px-4 py-4">
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
          >
            {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            On this page
          </button>
          
          {showMobileNav && (
            <nav className="mt-4 space-y-2 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setShowMobileNav(false)}
                  className={cn(
                    "flex items-center gap-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive",
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
        {/* Desktop Vertical Sticky Rail - Book Index Style - Overlays content */}
        <aside className="hidden lg:block fixed left-8 top-32 z-30 w-[160px]">
          <nav className="sticky top-32 pl-4 border-l border-charcoal/10">
                <p className="text-xs uppercase tracking-[0.15em] text-charcoal/30 mb-5 font-normal" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
                  Explore Index
                </p>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "flex items-center gap-3 py-1.5 transition-all relative group focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive",
                      activeSection === item.id
                        ? 'text-charcoal font-medium'
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

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-12 lg:py-16 lg:pl-52">
            {/* Main Content */}
            <div className="space-y-24 md:space-y-28">
              {/* PATTERN A: Mission - "Pulitzer sentence" with inline links */}
              <section id="mission" className="scroll-mt-28">
                <div className="max-w-4xl">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive mb-6 block">
                    Our Mission
                  </span>
                  
                  <div className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-charcoal mb-8">
                    For over four decades, William Louis-Dreyfus assembled one of the most significant private collections of contemporary art in the United States—focusing on <Link to={createPageUrl('Artists')} className="underline decoration-1 underline-offset-4 hover:text-olive transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive">emerging artists</Link> and <Link to={createPageUrl('Collection')} className="underline decoration-1 underline-offset-4 hover:text-olive transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive">self-taught creators</Link> who followed their own vision.
                  </div>
                  
                  <Lead className="text-charcoal/70 mb-8">
                    The Foundation continues this legacy through active stewardship, ensuring these works remain accessible through <Link to={createPageUrl('ArtLoanProgram')} className="text-olive hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive">museum loans</Link>, <Link to={createPageUrl('Tours')} className="text-olive hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive">educational programs</Link>, and <Link to={createPageUrl('Gallery')} className="text-olive hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive">gallery visits</Link>.
                  </Lead>
                </div>
              </section>

              {/* PATTERN C: Principles - Numbered editorial columns (01/02/03) */}
              <section id="principles" className="scroll-mt-28 pt-20">
                <div className="mb-14">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                    Our Values
                  </span>
                  <H2>Principles That Guide Us</H2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                  {/* 01 Stewardship */}
                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-xl font-mono text-olive">01</span>
                      <H3>Stewardship</H3>
                    </div>
                    <p className="text-charcoal/60 mb-4 leading-relaxed">
                      Caretakers, Not Owners
                    </p>
                    <Body className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                      Every decision considers long-term preservation and accessibility for future 
                      generations. We maintain rigorous conservation standards.
                    </Body>
                    {expandedPrinciple === 'stewardship' && (
                      <div className="pt-4 mb-4">
                        <Body className="text-sm text-charcoal/70 leading-relaxed">
                          We work with leading conservators, maintain climate-controlled storage, and 
                          carefully vet all loan requests to ensure works are handled with the highest care.
                        </Body>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'stewardship' ? null : 'stewardship')}
                      className="text-sm text-charcoal/50 hover:text-olive underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                    >
                      {expandedPrinciple === 'stewardship' ? 'Close' : 'Expand'}
                    </button>
                  </div>

                  {/* 02 Access */}
                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-xl font-mono text-olive">02</span>
                      <H3>Access</H3>
                    </div>
                    <p className="text-charcoal/60 mb-4 leading-relaxed">
                      Art Should Be Shared
                    </p>
                    <Body className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                      Great art should not be hidden away. We continually seek new ways to share 
                      the collection with diverse audiences worldwide.
                    </Body>
                    {expandedPrinciple === 'access' && (
                      <div className="pt-4 mb-4">
                        <Body className="text-sm text-charcoal/70 leading-relaxed">
                          Through loans, gallery tours, virtual experiences, and online resources, we make 
                          contemporary art accessible to students, scholars, and the public.
                        </Body>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'access' ? null : 'access')}
                      className="text-sm text-charcoal/50 hover:text-olive underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                    >
                      {expandedPrinciple === 'access' ? 'Close' : 'Expand'}
                    </button>
                  </div>

                  {/* 03 Education */}
                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-xl font-mono text-olive">03</span>
                      <H3>Education</H3>
                    </div>
                    <p className="text-charcoal/60 mb-4 leading-relaxed">
                      Deepening Understanding
                    </p>
                    <Body className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                      We support scholarship, publish research, and create resources that deepen 
                      understanding of the artists and movements in the collection.
                    </Body>
                    {expandedPrinciple === 'education' && (
                      <div className="pt-4 mb-4">
                        <Body className="text-sm text-charcoal/70 leading-relaxed">
                          We publish essays, support curatorial research, and offer educational programs 
                          to foster deeper engagement with contemporary art.
                        </Body>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedPrinciple(expandedPrinciple === 'education' ? null : 'education')}
                      className="text-sm text-charcoal/50 hover:text-olive underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                    >
                      {expandedPrinciple === 'education' ? 'Close' : 'Expand'}
                    </button>
                  </div>
                </div>
              </section>

              {/* PATTERN D+H: William - Asymmetric split with editorial list */}
              <section id="william" className="scroll-mt-28 pt-20">
                <div className="mb-4 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive block">
                    The Collector
                  </span>
                  <Link 
                    to={createPageUrl('William')}
                    className="hidden lg:inline-flex text-sm text-olive hover:underline items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    Explore William's Page <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
                
                <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
                  {/* Left: Intro */}
                  <div>
                    <H2 className="mb-6">William Louis-Dreyfus</H2>
                    <Lead className="text-charcoal/70 mb-8">
                      A lawyer and businessman who became one of the most discerning collectors 
                      of contemporary art—following his own eye and believing that art should be shared.
                    </Lead>
                    
                    <div className="border-l-2 border-olive pl-6 py-4">
                      <p className="font-serif text-lg text-charcoal/80 italic leading-relaxed">
                        "Unlike many collectors of his generation, William was never drawn to the market's darlings. 
                        Instead, he followed his own eye."
                      </p>
                    </div>
                  </div>

                  {/* Right: Chapter List with vertical spine */}
                  <div className="relative pl-6">
                    {williamChapters.map((chapter, index) => (
                      <Link
                        key={chapter.id}
                        to={createPageUrl('William')}
                        className="block py-6 last:border-b-0 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive focus-visible:-outline-offset-2"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-xs font-mono text-charcoal/30 mt-1.5 flex-shrink-0 group-hover:text-olive transition-colors">
                            Chapter {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <H4 className="mb-2 group-hover:underline transition-all">{chapter.title}</H4>
                            <p className="text-sm text-charcoal/60 leading-relaxed">{chapter.teaser}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 lg:hidden">
                  <Link 
                    to={createPageUrl('William')}
                    className="text-olive hover:underline inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    Explore William's Page <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </section>

              {/* PATTERN E: Collection - Mosaic media grid inside light band */}
              <section id="collection" className="scroll-mt-28 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-24 bg-beige/30">
                <div className="max-w-[1400px] mx-auto">
                  <div className="mb-14">
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                      Explore
                    </span>
                    <H2 className="mb-4">Collection as a Public Good</H2>
                    <p className="text-charcoal/70 max-w-2xl leading-relaxed" style={{ fontSize: 'var(--text-body)' }}>
                      Art fulfills its purpose when it is seen, studied, and shared. Discover the many 
                      ways the collection moves through the world.
                    </p>
                  </div>

                  {/* Mosaic Grid: 1 large + 4 smaller */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Large featured */}
                    <Link
                      to={createPageUrl(collectionMovement[0].link)}
                      className="col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-square overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                    >
                      <img 
                        src={collectionMovement[0].image}
                        alt={collectionMovement[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <H3 className="text-cream mb-2">{collectionMovement[0].title}</H3>
                        <p className="text-cream/80 text-sm">{collectionMovement[0].description}</p>
                      </div>
                    </Link>

                    {/* Smaller tiles */}
                    {collectionMovement.slice(1).map((item, index) => (
                      <Link
                        key={index}
                        to={createPageUrl(item.link)}
                        className="relative aspect-square overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      >
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-cream font-medium mb-1 text-sm">{item.title}</p>
                          <p className="text-cream/70 text-xs line-clamp-2">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* PATTERN F: Programs - Horizontal scroller */}
              <section id="programs" className="scroll-mt-28 pt-20">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                      Explore
                    </span>
                    <H2>Programs</H2>
                  </div>
                  <Link 
                    to={createPageUrl('Programs')}
                    className="hidden md:inline-flex text-sm text-olive hover:underline items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    Browse all <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                {/* Horizontal scroll strip */}
                <div className="relative -mx-4 md:mx-0">
                  <div 
                    ref={programsScrollRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 md:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {programs.map((program, index) => (
                      <Link
                        key={index}
                        to={createPageUrl(program.link)}
                        className="flex-shrink-0 w-[280px] md:w-[320px] snap-start pb-6 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      >
                        <H3 className="mb-3 group-hover:text-olive transition-colors">{program.title}</H3>
                        <Body className="text-sm text-charcoal/70 mb-4 leading-relaxed">{program.description}</Body>
                        <span className="text-sm text-olive inline-flex items-center">
                          Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Scroll controls */}
                  <div className="hidden md:flex justify-end gap-2 mt-6">
                    <button
                      onClick={() => scrollCarousel(programsScrollRef, 'prev')}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4 text-charcoal" />
                    </button>
                    <button
                      onClick={() => scrollCarousel(programsScrollRef, 'next')}
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 md:hidden">
                  <Link 
                    to={createPageUrl('Programs')}
                    className="text-sm text-olive hover:underline inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    Browse all programs <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </section>

              {/* PATTERN B: Governance - Definition list */}
              <section id="governance" className="scroll-mt-28 pt-20">
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

                {/* Definition list style */}
                <div className="max-w-3xl space-y-8 mb-12">
                  {/* Board */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-6">
                      Board of Directors
                    </h3>
                    <dl className="space-y-4">
                      {boardMembers.map((member) => (
                        <div key={member.name} className="flex items-baseline gap-8 pb-4">
                          <dt className="text-sm text-charcoal/50 w-32 flex-shrink-0">{member.role}</dt>
                          <dd className="font-medium text-charcoal">{member.name}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Staff */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-6">
                      Foundation Staff
                    </h3>
                    <dl className="space-y-4">
                      {staffMembers.map((member) => (
                        <div key={member.name} className="flex items-baseline gap-8 pb-4">
                          <dt className="text-sm text-charcoal/50 w-32 flex-shrink-0">{member.role}</dt>
                          <dd className="font-medium text-charcoal">{member.name}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div>
                  <Link 
                    to={createPageUrl('Governance')}
                    className="text-olive hover:underline inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    View Caretakers & Governance <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </section>

              {/* PATTERN D-lite: Community Partner - Split layout with stats */}
              <section id="community" className="scroll-mt-28 pt-20">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-olive block">
                    Community
                  </span>
                </div>
                
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
                  {/* Left: Narrative */}
                  <div>
                    <H2 className="mb-6">Harlem Children's Zone</H2>
                    <Body className="mb-4 leading-relaxed">
                      William Louis-Dreyfus was an early and steadfast supporter of Harlem Children's 
                      Zone, drawn to its ambitious vision and evidence-based approach. He believed that 
                      investing in children was the most meaningful contribution one could make.
                    </Body>
                    
                    {showHCZExpanded && (
                      <div className="space-y-4 mb-4 pt-6 mt-6">
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
                      className="text-sm text-charcoal/50 hover:text-olive underline mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                    >
                      {showHCZExpanded ? 'Show less' : 'Read more'}
                    </button>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <a 
                        href="https://hcz.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-olive hover:underline inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      >
                        Visit HCZ <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                      <span className="text-charcoal/20">·</span>
                      <Link 
                        to={createPageUrl('HarlemChildrensZone')}
                        className="text-olive hover:underline inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                      >
                        Why This Partnership <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Stats - minimal tiles */}
                  <div className="space-y-6">
                    <div className="pb-6">
                      <div className="text-3xl font-serif text-charcoal mb-2">27,000+</div>
                      <p className="text-sm text-charcoal/60">Served annually</p>
                    </div>
                    <div className="pb-6">
                      <div className="text-3xl font-serif text-charcoal mb-2">97 Blocks</div>
                      <p className="text-sm text-charcoal/60">Of Central Harlem</p>
                    </div>
                    <div className="pb-6">
                      <div className="text-3xl font-serif text-charcoal mb-2">50+ Years</div>
                      <p className="text-sm text-charcoal/60">Of service</p>
                    </div>
                    <div className="pb-6">
                      <div className="text-3xl font-serif text-charcoal mb-2">90%+</div>
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