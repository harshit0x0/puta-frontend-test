import ImageCarousel from "@/components/home/image-carousel";
import AboutSection from "@/components/home/about-section";
import PresidentMessage from "@/components/home/president-message";
import NewsSection from "@/components/home/news-section";
import ActivitiesSection from "@/components/home/activities-section";
import NewsScroll from "@/components/home/news-scroll-strip";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ImageCarousel />
      <NewsScroll />
      <div className="container mx-auto md:px-2 py-8">
        <AboutSection />
        <PresidentMessage />
        <div className="flex flex-col lg:flex-row gap-8 mx-4 lg:mx-0  mt-8">
          <NewsSection />
          <div className="lg:w-2/3 w-full min-h-[40vh]  text-center">
            <ActivitiesSection />
          </div>
        </div>
        <div className="mx-4"></div>
      </div>
    </div>
  );
}
