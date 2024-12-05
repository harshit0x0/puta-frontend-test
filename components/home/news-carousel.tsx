'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/items'
import { Card, CardContent, CardFooter } from '@/components/ui/items'

const news = [
    {
        id: 1,
        title: 'General Body Meeting Announcement',
        date: 'December 15, 2024',
        image: '/placeholder.svg',
        description: 'Annual General Body Meeting to be held at the University Auditorium.',
    },
    {
        id: 2,
        title: 'New Executive Committee Elected',
        date: 'December 10, 2024',
        image: '/placeholder.svg',
        description: 'Results of the recent PUTA elections have been announced.',
    },
    {
        id: 3,
        title: 'Academic Workshop Series',
        date: 'December 5, 2024',
        image: '/placeholder.svg',
        description: 'Upcoming workshop series on modern teaching methodologies.',
    },
]

export default function NewsCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % news.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
    }

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {news.map((item) => (
                        <Card key={item.id} className="w-full flex-shrink-0">
                            <CardContent className="p-4">
                                <div className="aspect-video relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                            </CardContent>
                            <CardFooter className="px-4 py-2">
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    )
}

