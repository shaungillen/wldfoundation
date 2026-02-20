import React, { useState } from 'react';
import { H3, Body, Caption } from '@/components/ui/typography';
import { MapPin, Calendar, Palette } from 'lucide-react';

export default function ArtistTimeline({ events }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  if (!events || events.length === 0) return null;

  const getEventIcon = (title) => {
    if (title.includes('Born') || title.includes('Died')) return Calendar;
    if (title.includes('Exhibition') || title.includes('Exhibited')) return MapPin;
    return Palette;
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-olive/40 via-olive/20 to-olive/10 ml-[15px] hidden md:block" />
      
      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.title);
          const isExpanded = expandedIndex === index;
          const isLongDescription = event.description?.length > 100;
          
          return (
            <div 
              key={index} 
              className="relative pl-0 md:pl-12 group"
              onClick={() => isLongDescription && setExpandedIndex(isExpanded ? null : index)}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-olive/10 border-2 border-olive hidden md:flex items-center justify-center group-hover:bg-olive group-hover:border-olive transition-colors">
                <Icon className="w-4 h-4 text-olive group-hover:text-cream transition-colors" />
              </div>
              
              {/* Content */}
              <div className={`bg-cream border border-charcoal/10 p-6 transition-all ${isLongDescription ? 'cursor-pointer hover:border-olive/30' : ''}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <Caption className="text-olive font-semibold text-sm">{event.year}</Caption>
                  {event.location && (
                    <span className="text-xs text-charcoal/50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                  )}
                </div>
                
                <H3 className="mb-3 text-xl md:text-2xl">{event.title}</H3>
                
                <Body className={`text-charcoal/70 ${!isExpanded && isLongDescription ? 'line-clamp-2' : ''}`}>
                  {event.description}
                </Body>
                
                {isLongDescription && (
                  <button className="text-sm text-olive hover:underline mt-2">
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}