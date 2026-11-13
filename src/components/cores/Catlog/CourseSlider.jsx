import React from "react";
import { BookOpen } from "lucide-react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import Coursecard from "./Coursecard";

const CourseSlider = ({ Courses = [] }) => {
  if (!Courses.length) {
    return (
      <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-[#424854] bg-[#161D29]/60 px-5 text-center">
        <div>
          <BookOpen className="mx-auto mb-3 text-[#838894]" size={28} />
          <p className="font-semibold text-gray-200">No courses to show yet</p>
          <p className="mt-1 text-sm text-[#838894]">
            Check back soon for new learning opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView={1.08}
      spaceBetween={14}
      freeMode
      modules={[FreeMode, Pagination]}
      pagination={{ clickable: true, dynamicBullets: true }}
      breakpoints={{
        540: { slidesPerView: 1.8, spaceBetween: 16 },
        768: { slidesPerView: 2.2, spaceBetween: 18 },
        1024: { slidesPerView: 2.7, spaceBetween: 20 },
        1280: { slidesPerView: 3, spaceBetween: 22 },
      }}
      className="!pb-12"
    >
      {Courses.map((course) => (
        <SwiperSlide key={course._id} className="!h-auto">
          <Coursecard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;
