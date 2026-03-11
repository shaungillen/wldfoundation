import React, { useState, useEffect, useRef } from 'react';
import { H2, H3, Body } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

const timelineData = [
    {
        year: '1932',
        title: 'Early Life',
        event: 'Born in New York City.',
        details: 'William Louis-Dreyfus was born into a family with a long history in global trade and commerce, though his early interests leaned heavily toward poetry and the arts.'
    },
    {
        year: '1954',
        title: 'Education',
        event: 'Graduated from Duke University.',
        details: 'He completed his studies, cultivating a lifelong appreciation for literature and graduating with a deep commitment to the humanities.'
    },
    {
        year: '1960s',
        title: 'The Spark',
        event: 'Began collecting prints and works on paper.',
        details: 'His early acquisitions focused on accessible mediums. He frequented smaller galleries and developed an eye for emerging talent outside the mainstream art market.'
    },
    {
        year: '1970s',
        title: 'Expansion',
        event: 'Expanded collection to include painting and sculpture.',
        details: 'As his collecting intensified, he began acquiring larger canvases and sculptural works, remaining fiercely independent of market trends.'
    },
    {
        year: '1980s',
        title: 'A Unique Vision',
        event: 'Focused on underrepresented artists and emerging voices.',
        details: 'He deliberately sought out artists of color, self-taught creators, and women whose profound work was being overlooked by major institutions.'
    },
    {
        year: '1990s',
        title: 'Sharing the Work',
        event: 'Began systematic Art Loan Program with museums.',
        details: ' Believing that art should be seen rather than hidden in storage, he established protocols to lend works to educational and cultural institutions globally.'
    },
    {
        year: '2000s',
        title: 'The Gallery',
        event: 'Established Mount Kisco Gallery for public access.',
        details: 'He retrofitted a facility in Mount Kisco, NY, creating a dedicated gallery space where students, scholars, and the public could engage directly with the art.'
    },
    {
        year: '2016',
        title: 'Legacy',
        event: 'Passed away; Foundation established in his honor.',
        details: 'Following his passing, the WLD Foundation was formalized to steward his collection, continue his philanthropic vision, and guarantee public access for future generations.'
    },
];

export default function WilliamTimeline() {
    const [activeYear, setActiveYear] = useState(timelineData[0].year);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveYear(entry.target.getAttribute('data-year'));
                    }
                });
            },
            { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToYear = (year) => {
        const target = sectionRefs.current.find(ref => ref?.getAttribute('data-year') === year);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="relative flex flex-col md:flex-row gap-12 lg:gap-24 items-start w-full">
            {/* Sticky Navigation Sidebar */}
            <div className="hidden md:block sticky top-32 w-48 shrink-0">
                <H3 className="mb-8 text-charcoal/40">Eras</H3>
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-charcoal/10" />
                    <div className="flex flex-col space-y-6">
                        {timelineData.map((item) => (
                            <button
                                key={item.year}
                                onClick={() => scrollToYear(item.year)}
                                className={cn(
                                    "relative pl-6 text-left transition-all duration-300 font-serif text-lg",
                                    activeYear === item.year
                                        ? "text-olive scale-105"
                                        : "text-charcoal/40 hover:text-charcoal/80"
                                )}
                            >
                                {/* Indicator Dot */}
                                <div className={cn(
                                    "absolute left-[-2.5px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full transition-all duration-300",
                                    activeYear === item.year ? "bg-olive scale-150" : "bg-transparent"
                                )} />
                                {item.year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrolling Content Area */}
            <div className="flex-1 space-y-24 md:space-y-32 pb-32">
                {/* Mobile quick-nav hint */}
                <div className="md:hidden flex items-center justify-center text-charcoal/40 text-sm mb-8 gap-2 animate-bounce">
                    <span>Scroll to explore</span>
                    <ArrowDown className="w-4 h-4" />
                </div>

                {timelineData.map((item, index) => (
                    <div
                        key={item.year}
                        ref={el => sectionRefs.current[index] = el}
                        data-year={item.year}
                        className={cn(
                            "transition-all duration-700 ease-out border-l flex flex-col justify-center min-h-[40vh]",
                            activeYear === item.year
                                ? "border-olive pl-6 md:pl-12 opacity-100 translate-x-0"
                                : "border-charcoal/10 pl-4 md:pl-8 opacity-40 translate-x-4 mix-blend-luminosity"
                        )}
                    >
                        <span className="font-serif text-5xl md:text-7xl text-charcoal/10 tracking-widest block mb-4 select-none">
                            {item.year}
                        </span>
                        <H2 className="text-3xl md:text-4xl mb-4 text-charcoal">
                            {item.title}
                        </H2>
                        <p className="text-xl md:text-2xl text-olive mb-6 font-serif">
                            {item.event}
                        </p>
                        <Body className="text-lg text-charcoal/80 max-w-2xl leading-relaxed">
                            {item.details}
                        </Body>
                    </div>
                ))}
            </div>
        </div>
    );
}
