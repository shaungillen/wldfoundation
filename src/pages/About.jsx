import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { H1, H2, H3, H4, Lead, Body } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, 
  ExternalLink, Heart, BookOpen, Users, Eye, 
  FileText, Plus, X
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Hero Carousel Data
const heroSlides = [
  {
    id: 'mission',
    eyebrow: 'Our Mission',
    title: 'Stewardship, Education, and the Art of Sharing',
    description: 'Preserving and sharing a remarkable collection of contemporary art, honoring the vision of a collector who believed that art belongs to the world.',
    ctas: [
      { label: 'Explore the Collection', url: 'Collection', primary: true },
      { label: 'Plan a Visit', url: 'Visit', primary: false },
    ],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
  },
  {
    id: 'william',
    eyebrow: 'The Collector',
    title: 'A Life in Art',
    description: 'William Louis-Dreyfus (1932–2016) assembled one of the most significant private collections of contemporary art in America through four decades of passionate engagement.',
    ctas: [
      { label: 'Learn About William', url: 'William', primary: true },
    ],
    image: 'https://wldfoundation.org/images/image-foundation.jpg',
  },
  {
    id: 'governance',
    eyebrow: 'Leadership',
    title: 'Caretakers & Governance',
    description: "The Foundation is guided by family members and professionals dedicated to preserving William's legacy and ensuring the collection serves the public good.",
    ctas: [
      { label: 'View Governance', url: 'Governance', primary: true },
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80',
  },
  {
    id: 'community',
    eyebrow: 'Community Partner',
    title: "Harlem Children's Zone",
    description: "William's longtime commitment to education and equity lives on through the Foundation's continued support of HCZ's transformative work.",
    ctas: [
      { label: 'Learn More', url: 'HarlemChildrensZone', primary: true },
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
    content: 'William Louis-Dreyfus was born into a family of commodities traders, but his true passions lay elsewhere—in poetry, in art, and in the quiet observation of human creativity. While he spent his professional life in business, his deepest commitment was to building a collection that reflected his personal vision.',
    anchor: '#biography',
  },
  {
    id: 'poet',
    title: "The Poet's Eye",
    teaser: 'Published poet and literary sensibility',
    content: 'Beyond collecting, William was a devoted poet. He published several volumes of poetry and found in verse a complement to his engagement with visual art. Both, he believed, required attention, patience, and a willingness to see beyond the surface.',
    anchor: '#poetry',
  },
  {
    id: 'collecting',
    title: 'On Collecting',
    teaser: "Philosophy: look where others don't",
    content: "Unlike many collectors of his generation, William was never drawn to the market's darlings. Instead, he followed his own eye, acquiring work by artists who were often undervalued—many of them women, artists of color, or those working in unfashionable mediums.",
    anchor: '#philosophy',
  },
  {
    id: 'timeline',
    title: 'Timeline',
    teaser: 'Key milestones from 1932 to present',
    content: 'Born in 1932, William began collecting in the 1960s and expanded the collection systematically over five decades. He established the Art Loan Program in the 1990s and opened the Mount Kisco Gallery in the 2000s. The Foundation was established following his passing in 2016.',
    anchor: '#timeline',
  },
  {
    id: 'legacy',
    title: 'Legacy',
    teaser: 'Continuing his vision of art as public good',
    content: "Following William's passing, the Foundation was established to ensure his collection would continue to be shared and studied. Today, works travel to institutions worldwide, embodying his belief that art fulfills its purpose when it is seen, studied, and loved.",
    anchor: '',
  },
];

// Collection Movement Data
const collectionMovement = [
  {
    title: 'On View',
    description: 'Experience works at our Mount Kisco Gallery',
    link: 'Gallery',
  },
  {
    title: 'On Loan',
    description: 'Artworks traveling to museums worldwide',
    link: 'ArtLoanProgram',
  },
  {
    title: 'Virtual Tour',
    description: 'Explore the gallery from anywhere',
    link: 'VirtualTour',
  },
  {
    title: 'Writing & Scholarship',
    description: 'Essays, research, and curatorial insights',
    link: 'News',
  },
  {
    title: 'Artists',
    description: 'Discover the creators behind the collection',
    link: 'Artists',
  },
];

// Programs Data
const programs = [
  {
    title: 'Art Loan Program',
    description: 'Works from the collection travel to museums, universities, and cultural institutions worldwide, making contemporary art accessible to diverse audiences.',
    link: 'ArtLoanProgram',
  },
  {
    title: 'Tours & Education',
    description: 'Guided visits, virtual experiences, and educational programs designed to deepen engagement with art and artists.',
    link: 'Tours',
  },
  {
    title: 'News & Writing',
    description: 'Scholarship, essays, and reflections on the collection, contemporary art, and the practice of collecting.',
    link: 'News',
  },
];

// Providence Chips Data
const providenceChips = [
  {
    id: 'choice',
    label: 'Choice',
    content: '[PLACEHOLDER] William believed that every acquisition should reflect genuine conviction, not trend or speculation. Each work in the collection was chosen because it spoke to him personally—a practice of discernment over decades.',
  },
  {
    id: 'attention',
    label: 'Attention',
    content: '[PLACEHOLDER] True appreciation requires sustained looking. William spent time with works, returned to them, and understood that meaning deepens with repeated engagement. This patience informs how the Foundation presents the collection.',
  },
  {
    id: 'responsibility',
    label: 'Responsibility',
    content: '[PLACEHOLDER] Collectors bear responsibility to artists, to the public, and to future generations. William saw himself as a temporary caretaker of works that would outlive him—an ethic the Foundation maintains.',
  },
  {
    id: 'access',
    label: 'Access',
    content: '[PLACEHOLDER] Great art should not be hidden. From the beginning, William lent works to institutions and welcomed visitors. The Foundation continues this commitment through loans, tours, and digital initiatives.',
  },
  {
    id: 'care',
    label: 'Care',
    content: '[PLACEHOLDER] Stewardship means rigorous conservation, proper documentation, and thoughtful presentation. The Foundation maintains the highest standards to ensure these works endure for generations.',
  },
];

// Board Members (from Governance page)
const boardMembers = [
  {
    name: 'Julia Louis-Dreyfus',
    role: 'Board Chair',
    bio: 'Award-winning actress and producer, instrumental in shaping public programs and educational initiatives.',
  },
  {
    name: 'Robert Charles Louis-Dreyfus',
    role: 'Vice Chair',
    bio: 'Oversees financial stewardship and strategic partnerships.',
  },
  {
    name: 'Marjorie Louis-Dreyfus',
    role: 'Secretary',
    bio: 'Guides curatorial direction and scholarship programs.',
  },
];

// Staff Members
const staffMembers = [
  { name: 'Dr. Catherine Wells', role: 'Executive Director' },
  { name: 'Michael Torres', role: 'Director of Collections' },
  { name: 'Sarah Chen', role: 'Curator' },
  { name: 'James Patterson', role: 'Registrar' },
  { name: 'Emily Okonkwo', role: 'Programs Manager' },
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedProvidence, setSelectedProvidence] = useState('choice');
  const [showHCZExpanded, setShowHCZExpanded] = useState(false);
  
  const heroIntervalRef = useRef(null);
  const chaptersScrollRef = useRef(null);
  const movementScrollRef = useRef(null);
  const programsScrollRef = useRef(null);

  // Hero Carousel Auto-play
  useEffect(() => {
    if (!isHoveringHero) {
      heroIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
    }
    return () => clearInterval(heroIntervalRef.current);
  }, [isHoveringHero]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  // Sticky nav items
  const navItems = [
    { label: 'Mission', href: '#mission' },
    { label: 'Principles', href: '#principles' },
    { label: 'William', href: '#william' },
    { label: 'Collection', href: '#collection' },
    { label: 'Programs', href: '#programs' },
    { label: 'Providence', href: '#providence' },
    { label: 'Governance', href: '#governance' },
    { label: 'Community', href: '#community' },
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
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transitionTimingFunction: 'ease-in-out' }}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20" />
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
                <div className="max-w-3xl">
                  <span className="text-xs uppercase tracking-[0.2em] text-cream/70 mb-3 block">
                    {slide.eyebrow}
                  </span>
                  <H1 className="text-cream mb-4">{slide.title}</H1>
                  <p className="text-cream/80 text-lg mb-6 max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {slide.ctas.map((cta, ctaIndex) => (
                      <Button
                        key={ctaIndex}
                        asChild
                        className={cta.primary ? 'bg-cream text-charcoal hover:bg-cream/90' : 'border-cream/30 text-cream hover:bg-cream/10'}
                        variant={cta.primary ? 'default' : 'outline'}
                      >
                        <Link to={createPageUrl(cta.url)}>
                          {cta.label}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
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
            className="w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal ${
                  index === currentSlide ? 'bg-cream w-8' : 'bg-cream/40 hover:bg-cream/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Sticky Anchor Nav */}
      <nav className="sticky top-20 z-40 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 py-3">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-charcoal/70 hover:text-charcoal whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mission Module */}
      <section id="mission" className="py-16 md:py-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Our Mission
            </span>
            <H2 className="mb-6">A Collection in Service of the Public Good</H2>
            <Body className="mb-6">
              For over four decades, William Louis-Dreyfus assembled one of the most significant 
              private collections of contemporary art in the United States. His approach was 
              distinctive: he collected not for status or speculation, but out of genuine passion 
              for the work and deep respect for artists.
            </Body>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="extended" className="border-t border-charcoal/10">
                <AccordionTrigger className="text-olive hover:text-olive/80 py-4">
                  Read more
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 space-y-4">
                  <Body>
                    The Foundation continues this legacy through active stewardship—lending works 
                    to museums and institutions worldwide, supporting scholarship and education, 
                    and welcoming visitors to experience the collection at our Mount Kisco Gallery.
                  </Body>
                  <Body>
                    We believe that great art should be accessible. Through our programs, thousands 
                    of people each year encounter these works, whether in person at a partner 
                    institution, through our virtual tours, or in the pages of scholarly publications.
                  </Body>
                  <ul className="space-y-3 ml-6">
                    <li className="text-charcoal/70 flex items-start">
                      <span className="text-olive mr-2">•</span>
                      <span><strong>Stewardship & Preservation:</strong> Rigorous conservation and documentation standards</span>
                    </li>
                    <li className="text-charcoal/70 flex items-start">
                      <span className="text-olive mr-2">•</span>
                      <span><strong>Access & Sharing:</strong> Active loan program and public engagement initiatives</span>
                    </li>
                    <li className="text-charcoal/70 flex items-start">
                      <span className="text-olive mr-2">•</span>
                      <span><strong>Education & Scholarship:</strong> Research support and educational programming</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Collection')}>
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('ArtLoanProgram')}>
                  Art Loan Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-charcoal/20">
                <Link to={createPageUrl('Visit')}>
                  Plan a Visit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Principles - Interactive Cards */}
      <section id="principles" className="py-16 md:py-20 bg-beige/30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Our Values
            </span>
            <H2>Principles That Guide Us</H2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Stewardship */}
            <div className="bg-white border border-charcoal/10 p-6">
              <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-olive" />
              </div>
              <H3 className="mb-3">Stewardship</H3>
              <Body className="text-sm mb-4">
                We are caretakers, not owners. Every decision considers long-term preservation 
                and accessibility for future generations.
              </Body>
              <Accordion type="single" collapsible>
                <AccordionItem value="stewardship" className="border-t border-charcoal/10">
                  <AccordionTrigger className="text-sm text-olive py-3">
                    Expand
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 space-y-3">
                    <Body className="text-sm">
                      Stewardship means maintaining rigorous conservation standards, ensuring 
                      proper documentation, and carefully vetting all loan requests. We work 
                      with leading conservators and maintain climate-controlled storage.
                    </Body>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link to={createPageUrl('Collection')} className="text-olive hover:underline">
                        View Collection →
                      </Link>
                      <Link to={createPageUrl('ArtLoanProgram')} className="text-olive hover:underline">
                        Loan Program →
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Access */}
            <div className="bg-white border border-charcoal/10 p-6">
              <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-olive" />
              </div>
              <H3 className="mb-3">Access</H3>
              <Body className="text-sm mb-4">
                Great art should not be hidden away. We continually seek new ways to share 
                the collection with diverse audiences.
              </Body>
              <Accordion type="single" collapsible>
                <AccordionItem value="access" className="border-t border-charcoal/10">
                  <AccordionTrigger className="text-sm text-olive py-3">
                    Expand
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 space-y-3">
                    <Body className="text-sm">
                      Through loans to institutions, gallery tours, virtual experiences, and 
                      online resources, we make contemporary art accessible to students, 
                      scholars, and the public.
                    </Body>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link to={createPageUrl('Tours')} className="text-olive hover:underline">
                        Tours & Visits →
                      </Link>
                      <Link to={createPageUrl('VirtualTour')} className="text-olive hover:underline">
                        Virtual Tour →
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Education */}
            <div className="bg-white border border-charcoal/10 p-6">
              <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-olive" />
              </div>
              <H3 className="mb-3">Education</H3>
              <Body className="text-sm mb-4">
                We support scholarship, publish research, and create resources that deepen 
                understanding of the artists and movements in the collection.
              </Body>
              <Accordion type="single" collapsible>
                <AccordionItem value="education" className="border-t border-charcoal/10">
                  <AccordionTrigger className="text-sm text-olive py-3">
                    Expand
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 space-y-3">
                    <Body className="text-sm">
                      We publish essays, support curatorial research, and offer educational 
                      programs for students and the public. Our goal is to foster deeper 
                      engagement with contemporary art.
                    </Body>
                    <div className="flex flex-col gap-2 text-sm">
                      <Link to={createPageUrl('News')} className="text-olive hover:underline">
                        News & Writing →
                      </Link>
                      <Link to={createPageUrl('Tours')} className="text-olive hover:underline">
                        Educational Programs →
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* William Module - Chapters Carousel */}
      <section id="william" className="py-16 md:py-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              The Collector
            </span>
            <H2 className="mb-4">William Louis-Dreyfus</H2>
            <Lead>
              A lawyer and businessman who became one of the most discerning collectors 
              of contemporary art—following his own eye, championing undervalued artists, 
              and believing that art should be shared.
            </Lead>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            <div 
              ref={chaptersScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {williamChapters.map((chapter) => (
                <Dialog key={chapter.id}>
                  <DialogTrigger asChild>
                    <button
                      className="flex-shrink-0 w-[280px] bg-beige/40 border border-charcoal/10 p-6 snap-start text-left hover:border-olive/30 transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 group"
                    >
                      <H4 className="mb-2 group-hover:text-olive transition-colors">{chapter.title}</H4>
                      <p className="text-sm text-charcoal/60 mb-4">{chapter.teaser}</p>
                      <span className="text-sm text-olive inline-flex items-center">
                        Open
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl text-charcoal">{chapter.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <Body>{chapter.content}</Body>
                      <Button asChild variant="outline" className="border-charcoal/20">
                        <Link to={createPageUrl('William') + chapter.anchor}>
                          Read more on William's page
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {/* Scroll Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => scrollCarousel(chaptersScrollRef, 'prev')}
                className="w-10 h-10 rounded-full bg-beige/60 border border-charcoal/10 flex items-center justify-center hover:bg-beige transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-charcoal" />
              </button>
              <button
                onClick={() => scrollCarousel(chaptersScrollRef, 'next')}
                className="w-10 h-10 rounded-full bg-beige/60 border border-charcoal/10 flex items-center justify-center hover:bg-beige transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-charcoal" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
              <Link to={createPageUrl('William')}>
                Explore William's Page
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collection as Public Good - Horizontal Scroller */}
      <section id="collection" className="py-16 md:py-20 bg-charcoal text-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <H2 className="text-cream mb-3">Collection as a Public Good</H2>
            <p className="text-cream/70 max-w-2xl">
              Art fulfills its purpose when it is seen, studied, and shared. Discover the many 
              ways the collection moves through the world.
            </p>
          </div>

          <div className="relative">
            <div 
              ref={movementScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {collectionMovement.map((item, index) => (
                <Link
                  key={index}
                  to={createPageUrl(item.link)}
                  className="flex-shrink-0 w-[260px] bg-cream/5 border border-cream/10 p-6 snap-start hover:bg-cream/10 hover:border-cream/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal group"
                >
                  <H4 className="text-cream mb-2 group-hover:text-cream/90">{item.title}</H4>
                  <p className="text-sm text-cream/60 mb-4">{item.description}</p>
                  <span className="text-sm text-olive inline-flex items-center">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => scrollCarousel(movementScrollRef, 'prev')}
                className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center hover:bg-cream/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-cream" />
              </button>
              <button
                onClick={() => scrollCarousel(movementScrollRef, 'next')}
                className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center hover:bg-cream/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-charcoal"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-cream" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Civic Work */}
      <section id="programs" className="py-16 md:py-20 bg-beige/30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Programs
              </span>
              <H2 className="mb-3">Active Engagement</H2>
              <p className="text-charcoal/70 max-w-2xl">
                From museum loans to educational programming, the Foundation's work extends 
                the collection's reach and impact.
              </p>
            </div>
            <Button asChild variant="outline" className="border-charcoal/20 hidden md:flex">
              <Link to={createPageUrl('Programs')}>
                Browse All Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div 
              ref={programsScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {programs.map((program, index) => (
                <Link
                  key={index}
                  to={createPageUrl(program.link)}
                  className="flex-shrink-0 w-[340px] bg-white border border-charcoal/10 p-6 snap-start hover:border-olive/30 transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 group"
                >
                  <H3 className="mb-3 group-hover:text-olive transition-colors">{program.title}</H3>
                  <Body className="text-sm mb-4">{program.description}</Body>
                  <span className="text-sm text-olive inline-flex items-center">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button asChild variant="outline" className="border-charcoal/20 md:hidden">
                <Link to={createPageUrl('Programs')}>
                  Browse All Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => scrollCarousel(programsScrollRef, 'prev')}
                  className="w-10 h-10 rounded-full bg-beige/60 border border-charcoal/10 flex items-center justify-center hover:bg-beige transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal" />
                </button>
                <button
                  onClick={() => scrollCarousel(programsScrollRef, 'next')}
                  className="w-10 h-10 rounded-full bg-beige/60 border border-charcoal/10 flex items-center justify-center hover:bg-beige transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providence - Chip Reveal */}
      <section id="providence" className="py-16 md:py-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block text-center">
              A Lens
            </span>
            <H2 className="mb-4 text-center">Providence</H2>
            <p className="text-center text-charcoal/70 mb-8">
              Core values that shaped William's approach to collecting and continue to guide 
              the Foundation's work.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {providenceChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedProvidence(chip.id)}
                  className={`px-5 py-2 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 ${
                    selectedProvidence === chip.id
                      ? 'bg-olive text-cream'
                      : 'bg-beige/60 text-charcoal/70 hover:bg-beige hover:text-charcoal'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="bg-beige/30 border border-charcoal/10 p-6 md:p-8 min-h-[160px]">
              {providenceChips.map((chip) => (
                <div
                  key={chip.id}
                  className={`transition-opacity duration-300 ${
                    selectedProvidence === chip.id ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <Body>{chip.content}</Body>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                to={createPageUrl('About') + '#providence'}
                className="text-sm text-olive hover:underline inline-flex items-center"
              >
                Read the full lens
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Preview */}
      <section id="governance" className="py-16 md:py-20 bg-beige/30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              Leadership
            </span>
            <H2 className="mb-3">Caretakers & Governance</H2>
            <p className="text-charcoal/70 max-w-2xl">
              The Foundation is guided by family members and professionals dedicated to preserving 
              William's legacy and ensuring the collection serves the public good.
            </p>
          </div>

          {/* Board of Directors */}
          <div className="mb-12">
            <H3 className="mb-6">Board of Directors</H3>
            <div className="grid md:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <div key={member.name} className="bg-white border border-charcoal/10 p-6">
                  <H4 className="mb-1">{member.name}</H4>
                  <p className="text-olive text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-charcoal/70">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Foundation Staff */}
          <div className="mb-10">
            <H3 className="mb-6">Foundation Staff</H3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {staffMembers.map((member) => (
                <div key={member.name} className="bg-cream p-4 border border-charcoal/10">
                  <p className="font-medium text-charcoal text-sm mb-1">{member.name}</p>
                  <p className="text-xs text-charcoal/60">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
              <Link to={createPageUrl('Governance')}>
                View Caretakers & Governance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Partner - HCZ */}
      <section id="community" className="py-16 md:py-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Narrative */}
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
                Community Partner
              </span>
              <H2 className="mb-6">Harlem Children's Zone</H2>
              <Body className="mb-4">
                William Louis-Dreyfus was an early and steadfast supporter of Harlem Children's 
                Zone, drawn to its ambitious vision and evidence-based approach. He believed that 
                investing in children was the most meaningful contribution one could make.
              </Body>
              
              {!showHCZExpanded && (
                <button
                  onClick={() => setShowHCZExpanded(true)}
                  className="text-olive hover:underline text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                >
                  Read more
                </button>
              )}

              {showHCZExpanded && (
                <div className="space-y-4 mb-6">
                  <Body>
                    His involvement went beyond financial support. He served on the board, visited 
                    programs regularly, and championed the organization's work within his network. 
                    The relationship reflected his core values: a belief in education, a commitment 
                    to equity, and an understanding that systemic change requires sustained effort.
                  </Body>
                  <Body>
                    The William Louis-Dreyfus Foundation continues to support Harlem Children's 
                    Zone, honoring William's belief that art and education are complementary forces 
                    for human flourishing.
                  </Body>
                  <button
                    onClick={() => setShowHCZExpanded(false)}
                    className="text-olive hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2"
                  >
                    Show less
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-charcoal hover:bg-charcoal/90 text-cream">
                  <a href="https://hcz.org" target="_blank" rel="noopener noreferrer">
                    Visit HCZ
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-charcoal/20">
                  <Link to={createPageUrl('HarlemChildrensZone')}>
                    Why This Partnership
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Stats Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-beige/40 p-6 border border-charcoal/10">
                <H3 className="mb-2">27,000+</H3>
                <p className="text-sm text-charcoal/70">Children and adults served annually</p>
              </div>
              <div className="bg-beige/40 p-6 border border-charcoal/10">
                <H3 className="mb-2">97 Blocks</H3>
                <p className="text-sm text-charcoal/70">Of Central Harlem covered</p>
              </div>
              <div className="bg-beige/40 p-6 border border-charcoal/10">
                <H3 className="mb-2">50+ Years</H3>
                <p className="text-sm text-charcoal/70">Of continuous service</p>
              </div>
              <div className="bg-beige/40 p-6 border border-charcoal/10">
                <H3 className="mb-2">90%+</H3>
                <p className="text-sm text-charcoal/70">High school graduation rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-20 bg-charcoal text-cream">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream/90 italic leading-relaxed mb-8">
              "The true value of a collection lies not in what you own, but in what you share. 
              Art that is seen, studied, and loved fulfills its purpose."
            </blockquote>
            <cite className="text-cream/60 text-sm not-italic">
              — William Louis-Dreyfus, 1932–2016
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
}