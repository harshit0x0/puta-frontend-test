'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NewsItem {
    title: string;
    link: string;
}

interface NewsScrollStripProps {
    newsItems: NewsItem[];
}

const NewsScrollStrip: React.FC<NewsScrollStripProps> = ({ newsItems }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState<boolean>(true);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        if (!scrollContainer) return;

        let animationFrameId: number;
        const scrollStep: number = 1;

        const autoScroll = () => {
            if (isScrolling && scrollContainer) {
                scrollContainer.scrollLeft += scrollStep;

                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                }

                animationFrameId = requestAnimationFrame(autoScroll);
            }
        };

        if (isScrolling) {
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isScrolling]);

    return (
        <div
            ref={scrollRef}
            className="w-full overflow-x-hidden whitespace-nowrap bg-gray-800 py-3 my-2"
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
        >
            <div className="inline-block animate-scroll">
                {newsItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className="inline-block mx-4 text-red-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.title}
                    </Link>
                ))}
                {newsItems.map((item, index) => (
                    <Link
                        key={`duplicate-${index}`}
                        href={item.link}
                        className="inline-block mx-4 text-red-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Demo News Items
const demoNewsItems: NewsItem[] = [
    {
        title: "PUTA Launches New Research Initiative",
        link: "/news/research-initiative"
    },
    {
        title: "Annual Conference Dates Announced",
        link: "/news/conference-2024"
    },
    {
        title: "Breakthrough in Academic Collaboration",
        link: "/news/collaboration-breakthrough"
    },
    {
        title: "New Grant Opportunities for Members",
        link: "/news/grant-opportunities"
    },
    {
        title: "Distinguished Lecturer Series Starts Next Month",
        link: "/news/lecturer-series"
    }
];

export default function NewsScroll() {
    return <NewsScrollStrip newsItems={demoNewsItems} />;
}