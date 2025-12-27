import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const slides = [
    {
      image: 'https://wldfoundation.org/images/gallery/MKG_001.jpg',
      title: t('home.hero1.title'),
      subtitle: t('home.hero1.subtitle'),
      cta1: { label: t('home.hero1.cta1'), href: 'Collection' },
    },
    {
      image: 'https://wldfoundation.org/images/gallery/MKG_015.jpg',
      title: t('home.hero2.title'),
      subtitle: t('home.hero2.subtitle'),
      cta1: { label: t('home.hero2.cta'), href: 'William' },
    },
    {
      image: 'https://wldfoundation.org/images/gallery/MKG_008.jpg',
      title: t('home.hero3.title'),
      subtitle: t('home.hero3.subtitle'),
      cta1: { label: t('home.hero3.cta'), href: 'ArtLoanProgram' },
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section 
      className="relative h-[80vh] min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured content carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img 
            src={slide.image} 
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-cream/80 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-cream text-charcoal hover:bg-cream/90 border-0"
                >
                  <Link to={createPageUrl(slide.cta1.href)}>
                    {slide.cta1.label}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-cream/70 hover:text-cream transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-cream/70 hover:text-cream transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === current 
                ? "w-8 bg-cream" 
                : "bg-cream/40 hover:bg-cream/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current}
          />
        ))}
      </div>
    </section>
  );
}