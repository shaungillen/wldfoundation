import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { H2, Lead, Quote } from '@/components/ui/typography';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from '@/components/LanguageContext';

export default function ArtistSpotlight() {
  const { data: artists = [], isLoading } = useQuery({
    queryKey: ['artists', 'featured'],
    queryFn: () => base44.entities.Artist.filter({ featured: true }, '-created_date', 3),
  });
  const { t } = useLanguage();

  const displayArtists = artists.length > 0 ? artists : [
    {
      id: '1',
      name: 'Carmen Herrera',
      lifespan: '1915–2022',
      bio_short: 'Cuban-American abstract minimalist painter whose bold geometric compositions explored the relationship between form and color.',
      portrait_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      quote: 'I do it because I have to do it. It\'s a compulsion that also gives me pleasure.',
    },
    {
      id: '2',
      name: 'Philip Guston',
      lifespan: '1913–1980',
      bio_short: 'Canadian-American painter who shifted from Abstract Expressionism to a highly personal, cartoonish figuration.',
      portrait_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      quote: 'Painting is not made with colors and paint at all. I don\'t know what a painting is.',
    },
    {
      id: '3',
      name: 'Alice Neel',
      lifespan: '1900–1984',
      bio_short: 'American portrait painter known for her psychologically penetrating depictions of artists, writers, and activists.',
      portrait_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
      quote: 'I decided to paint the human comedy—meaning men, women, children...',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-charcoal text-cream">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-olive mb-4 block">
              {t('home.artists.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream">
              {t('home.artists.eyebrow')}
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto border-cream/30 text-cream hover:bg-cream/10">
            <Link to={createPageUrl('Artists')}>
              {t('home.artists.cta')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full bg-cream/10" />
                <Skeleton className="h-6 w-2/3 bg-cream/10" />
                <Skeleton className="h-4 w-1/3 bg-cream/10" />
              </div>
            ))
          ) : (
            displayArtists.map((artist) => (
              <div key={artist.id} className="group">
                <Link to={createPageUrl(`ArtistDetail?id=${artist.id}`)}>
                  <div className="aspect-[3/4] bg-cream/10 overflow-hidden mb-6">
                    {artist.portrait_url ? (
                      <img 
                        src={artist.portrait_url}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif text-4xl text-cream/20">
                          {artist.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-cream group-hover:text-olive transition-colors mb-1">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-cream/50 mb-4">{artist.lifespan}</p>
                </Link>
                
                {artist.quote && (
                  <p className="text-cream/70 italic text-sm mb-4 line-clamp-3">
                    "{artist.quote}"
                  </p>
                )}
                
                <p className="text-cream/60 text-sm mb-4 line-clamp-2">
                  {artist.bio_short}
                </p>
                
                <div className="flex gap-4">
                  <Link 
                    to={createPageUrl(`ArtistDetail?id=${artist.id}`)}
                    className="text-sm text-olive hover:text-olive/80 transition-colors"
                  >
                    Biography →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}