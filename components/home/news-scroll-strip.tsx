"use client";
import React, { useState, useEffect, useRef } from "react";
// import Loading from '../ui/loading';
import Link from "next/link";

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

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 8) {
          scrollContainer.scrollLeft = 0;
        }
        // console.log(scrollContainer.scrollLeft, scrollContainer.scrollWidth);
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

export default function NewsScroll() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    // Fetch news from the server
    async function fetchNews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news`
        );
        const data = await response.json();
        console.log("Fetched news:", data.files);
        if (!data.files || data.files.length === 0) return [];
        const news = data.files.map((news: any) => ({
          title: news.description,
          link: news.url.replace("/raw/upload/", "/upload/fl_attachment/"),
        }));
        setNews(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        return [];
      }
    }
    fetchNews();
    // setIsLoading(false);
  }, []);
  return <NewsScrollStrip newsItems={news} />;
}
