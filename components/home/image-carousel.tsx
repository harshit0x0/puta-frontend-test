'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
    { src: '/image1.jpeg', alt: 'University Campus' },
    { src: '/image2.jpeg', alt: 'Students in Laboratory' },
    { src: '/image3.jpg', alt: 'Agricultural Field' },
    { src: '/image4.jpeg', alt: 'Graduation Ceremony' },
    { src: '/image5.jpg', alt: 'Graduation Ceremony' },
]

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    return (
        <div className="relative w-full mx-auto md:w-full h-[30vh] md:h-[80vh] overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill={true}
                        priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900 bg-opacity-50 text-white">
                        <p className="text-sm">{image.alt}</p>
                    </div>
                </div>
            ))}
            <button
                className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-900 bg-opacity-80 text-white p-2 rounded"
                onClick={handlePrev}
            >
                &#8592;
            </button>
            <button
                className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-900 bg-opacity-80 text-white p-2 rounded"
                onClick={handleNext}
            >
                &#8594;
            </button>
        </div>
    )
}