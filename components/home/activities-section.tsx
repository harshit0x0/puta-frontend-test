'use client'
import Image from 'next/image'

const activities = [
    { id: 1, title: 'Annual Teachers Conference', date: '2024-03 - 15', image: '/image1.jpeg' },
    { id: 2, title: 'PUTA Welfare Initiative Launch', date: '2024-02-28', image: '/image2.jpeg' },
    { id: 3, title: 'Educational Policy Roundtable', date: '2024-02-10', image: '/image3.jpg' },
]

import React, { useState } from 'react';

export default function ActivitiesCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Assuming 'activities' is defined elsewhere
    const totalSlides = activities.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <section className="w-full my-10">
            <h2 className=" text-2xl lg:text-3xl font-bold my-4 text-blue-900">Recent Activities</h2>
            <div className="relative border bg-white md:p-4 p-2 rounded-lg shadow-md overflow-hidden">
                {/* Carousel Container */}
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        width: `${totalSlides * 100}%`
                    }}
                >
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="w-full flex-shrink-0 lg:px-2"
                        >
                            <div className='relative w-[86vw] h-[30vh] lg:w-[78vw] lg:h-[50vh]'>
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    fill={true}
                                    className="object-cover mb-2 rounded"
                                />
                            </div>
                            <h3 className="font-semibold text-lg my-4 text-blue-700">{activity.title}</h3>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
                    <button
                        onClick={prevSlide}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition z-10"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition z-10"
                    >
                        →
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                    {activities.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full ${currentSlide === index
                                ? 'bg-blue-700'
                                : 'bg-blue-200'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

