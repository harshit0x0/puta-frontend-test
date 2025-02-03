import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Activity } from "@/app/types";

const SwiperCarousel = ({ activities }: { activities: Activity[] }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="w-full h-80"
      >
        {activities.map((activity) => (
          <SwiperSlide key={activity._id} className="flex justify-center">
            <div className="relative w-full h-64 border rounded-lg overflow-hidden">
              <Image
                src={activity.url}
                alt={activity.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <div className="text-center mt-2">
              <h3 className="text-lg font-semibold">{activity.name}</h3>
              <p className="text-sm text-gray-500">{activity.createdAt}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
