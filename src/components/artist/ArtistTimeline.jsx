import React from 'react';
import { H3, Body, Caption } from '@/components/ui/typography';

export default function ArtistTimeline({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-olive/20 ml-2" />
      
      <div className="space-y-8 ml-8">
        {events.map((event, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-olive border-2 border-cream" />
            
            {/* Content */}
            <div>
              <Caption className="text-olive mb-2">{event.year}</Caption>
              <H3 className="mb-2 text-xl">{event.title}</H3>
              <Body className="text-charcoal/70">{event.description}</Body>
              {event.location && (
                <p className="text-sm text-charcoal/50 mt-1">{event.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}