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
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const truncateWords = 15;

  useEffect(() => {
    let active = true;
    const fetchAllReviews = async () => {
      try {
        const res = await apiConnector({
          method: "POST",
          url: GETRATING_API,
        });
        const reviews = res.data?.data;
        if (active) {
          if (Array.isArray(reviews)) {
            setReviewData(reviews);
          } else {
            setUnavailable(true);
          }
        }
      } catch (error) {
        console.error("Could not load course reviews:", error);
        if (active) setUnavailable(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchAllReviews();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 text-white">
      {loading ? (
        <div className="grid min-h-40 place-items-center text-sm text-[#AFB2BF]">
          Loading learner reviews...
        </div>
      ) : reviewData.length > 0 ? (
        <Swiper
          loop={reviewData.length > 3}
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
          {reviewData.map((item, index) => {
            const reviewText =
              typeof item?.review === "string" ? item.review : "";
            const words = reviewText.split(/\s+/).filter(Boolean);
            const rating = Number(item?.rating) || 0;

            return (
              <SwiperSlide key={item?._id || index}>
                <div className="flex h-full flex-col gap-4 rounded-xl bg-[#161D29] p-5 shadow-md transition hover:scale-[1.02]">
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

                  <p className="text-sm leading-relaxed text-[#DBDDEA]">
                    {words.length > truncateWords
                      ? `${words.slice(0, truncateWords).join(" ")}...`
                      : reviewText}
                  </p>

                  <div className="mt-auto flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#E7C009]">
                      {rating.toFixed(1)}
                    </span>
                    <ReactStars
                      count={5}
                      value={rating}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="grid min-h-40 place-items-center rounded-xl border border-[#2C333F] bg-[#161D29] px-5 text-center text-sm text-[#AFB2BF]">
          {unavailable
            ? "Learner reviews are temporarily unavailable."
            : "No learner reviews yet."}
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
