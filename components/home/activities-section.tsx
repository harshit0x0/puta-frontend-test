"use client";
import Image from "next/image";
import { Activity } from "@/app/types";
import { useState, useEffect } from "react";
import SwiperCarousel from "./swiper-carousel";
import Loading from "../ui/loading";
// const activities = [
//     { id: 1, title: 'Annual Teachers Conference', date: '2024-03 - 15', image: '/image1.jpeg' },
//     { id: 2, title: 'PUTA Welfare Initiative Launch', date: '2024-02-28', image: '/image2.jpeg' },
//     { id: 3, title: 'Educational Policy Roundtable', date: '2024-02-10', image: '/image3.jpg' },
// ]

export default function ActivitiesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch activities from the server
    async function fetchActivities() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities`
        );
        const data = await response.json();
        console.log("Fetched activities:", data.files);
        const fetchedActivities = data.files.map((activity: Activity) => {
          //change date to ISO format
          const date = new Date(activity?.createdAt ?? "");
          activity.createdAt = date.toDateString();
          return activity;
        });
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

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
      <h2 className=" text-2xl lg:text-3xl font-bold my-4 text-blue-900">
        Recent Activities
      </h2>
      {loading && <Loading />}
      <SwiperCarousel activities={activities} />
    </section>
  );
}
