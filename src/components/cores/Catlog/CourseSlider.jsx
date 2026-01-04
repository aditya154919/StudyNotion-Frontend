import React from 'react'
// import Swiper from 'swiper'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import Coursecard from './Coursecard';


const CourseSlider = ({Courses}) => {
  return (
    <>
    {
        Courses.length ? (
           <Swiper 
           slidesPerView={1}
           spaceBetween={25}
           loop={true}
           modules={[FreeMode,Pagination]}
           breakpoints={{
            1024:{
                slidesPerView:3
            }
           }}
           className="max-h-120"
           >
           {
            Courses?.map((course,i)=>(
                <SwiperSlide key={i}>
                   <Coursecard course={course} Height = {"h-[220px]"}/>
                </SwiperSlide>
            ))
           }
           </Swiper>
        ):"Hello"
    }
    </>
  )
}

export default CourseSlider
