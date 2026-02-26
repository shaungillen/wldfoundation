import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

/**
 * NotAvailable — in-app graceful state for missing entities.
 * Use instead of allowing a Base44 404 to render.
 */
export default function NotAvailable({
    title = 'Not Found',
    message = 'The requested item could not be found.',
    backLabel = 'Go Back',
    backHref = 'Home',
}) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 bg-cream px-4">
            <div className="max-w-md text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-olive mb-4">404</p>
                <h1 className="font-serif text-4xl text-charcoal mb-4">{title}</h1>
                <p className="text-charcoal/60 mb-8 leading-relaxed">{message}</p>
                <Link
                    to={createPageUrl(backHref)}
                    className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-olive transition-colors border border-charcoal/20 hover:border-olive/40 px-5 py-2.5 rounded-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {backLabel}
                </Link>
            </div>
        </div>
    );
}
