import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ReactStars from "react-stars";
import { apiConnector } from "../../../Services/apiconnector";
import { COURSEAPI } from "../../../Services/api";
import { FaStar } from "react-icons/fa";

const { GETRATING_API } = COURSEAPI;

const ReviewSlider = () => {
  const [reviewData, setReviewData] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const res = await apiConnector({
        method: "POST",
        url: GETRATING_API,
      });
      setReviewData(res.data.data || []);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 text-white">
      <Swiper
        loop={true}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
      >
        {reviewData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full flex-col gap-4 rounded-xl bg-[#161D29] p-5 shadow-md transition hover:scale-[1.02]">
              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    item?.user?.image
                      ? item.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.firstName} ${item?.user?.lastName}`
                  }
                  alt="user"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-200">
                    {item?.user?.firstName} {item?.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item?.course?.courseName}
                  </p>
                </div>
              </div>

              {/* REVIEW TEXT */}
              <p className="text-sm leading-relaxed text-[#DBDDEA]">
                {item?.review?.split(" ").length > truncateWords
                  ? `${item.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")}...`
                  : item?.review}
              </p>

              {/* RATING */}
              <div className="mt-auto flex items-center gap-2">
                <span className="text-sm font-semibold text-[#E7C009]">
                  {item?.rating?.toFixed(1)}
                </span>
                <ReactStars
                  count={5}
                  value={item?.rating}
                  size={18}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
