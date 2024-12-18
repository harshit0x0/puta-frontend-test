'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const news = [
    { id: 1, title: 'PUTA General Body Meeting Announcement', date: '2024-05-01', isNew: true },
    { id: 2, title: 'Teachers Day Celebration Plans', date: '2024-04-28', isNew: true },
    { id: 3, title: 'PUTA Successfully Negotiates Better Working Conditions', date: '2024-04-25', isNew: false },
    { id: 4, title: 'Workshop on New Education Policy', date: '2024-04-20', isNew: false },
    { id: 5, title: 'PUTA Annual Sports Meet Schedule', date: '2024-04-15', isNew: false },
];

export default function NewsSection() {
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState<'down' | 'up'>('down');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) return;

        const autoScroll = () => {
            if (direction === 'down') {
                if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
                    setDirection('up');
                } else {
                    scrollContainer.scrollTo({
                        top: scrollContainer.scrollTop + 1,
                        behavior: 'auto',
                    });
                }
            } else {
                if (scrollContainer.scrollTop <= 0) {
                    setDirection('down');
                } else {
                    scrollContainer.scrollTo({
                        top: scrollContainer.scrollTop - 1,
                        behavior: 'auto',
                    });
                }
            }
        };

        if (!isHovered) {
            const intervalId = setInterval(autoScroll, 50);
            return () => clearInterval(intervalId);
        }
    }, [isHovered, direction]);

    return (
        <section className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Latest News</h2>
            <div className="border bg-white p-4 rounded-lg shadow-md h-[400px] overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="h-full overflow-y-auto scroll-smooth"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="space-y-2">
                        {[...news, ...news].map((item, index) => (
                            <div key={`${item.id}-${index}`} className="border-b pb-2">
                                <Link href={`/news/${item.id}`} className="block hover:bg-gray-100 p-2 rounded transition duration-300">
                                    <div className="flex justify-between items-start">
                                        <span className="font-semibold text-blue-700">{item.title}</span>
                                        {item.isNew && (
                                            <span className="new-badge animate-pulse bg-pink-500 text-white rounded-full px-2 py-1 text-xs relative top-[-2px]">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-600">{item.date}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
