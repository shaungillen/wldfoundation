import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function ProgramCard({ 
  title, 
  description, 
  image, 
  href, 
  icon: Icon,
  className 
}) {
  return (
    <Link 
      to={createPageUrl(href)}
      className={cn(
        "group block bg-white border border-charcoal/10 overflow-hidden transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        {Icon && (
          <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-olive" />
          </div>
        )}
        
        <h3 className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-charcoal/60 mb-4 line-clamp-2">
          {description}
        </p>
        
        <span className="inline-flex items-center text-sm text-olive group-hover:translate-x-1 transition-transform">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </Link>
  );
}