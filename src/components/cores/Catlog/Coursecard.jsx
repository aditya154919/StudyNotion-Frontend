import React from "react";
import { Link } from "react-router";
import { ArrowUpRight, Users } from "lucide-react";
import getAvgRating from "../../../utils/getRatingAvg";
import Rating from "../../../Common/Rating";

const Coursecard = ({ course }) => {
  const reviews = course?.ratingAndReview || course?.ratingAndReviews || [];
  const averageRating = Number(getAvgRating(reviews)) || 0;
  const instructorName = [
    course?.instructor?.firstName,
    course?.instructor?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to={`/course/${course?._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] transition duration-200 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-xl hover:shadow-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0b111b]">
        <img
          src={course?.thumbnail}
          alt={course?.courseName || "Course thumbnail"}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 right-3 rounded-lg bg-[#000814]/90 px-3 py-1.5 text-sm font-bold text-amber-200 shadow-lg backdrop-blur">
          {Number(course?.price) > 0
            ? `₹${Number(course.price).toLocaleString("en-IN")}`
            : "Free"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-12 flex-1 text-base font-bold leading-6 text-white sm:text-lg">
            {course?.courseName || "Untitled course"}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-[#838894] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-200"
          />
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-[#AFB2BF]">
          {instructorName ? `By ${instructorName}` : "Expert-led course"}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#2C333F] pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-sm font-bold text-amber-200">
              {averageRating.toFixed(1)}
            </span>
            <Rating Review_Count={averageRating} Star_Size={15} />
            <span className="truncate text-xs text-[#838894]">
              ({reviews.length})
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[#AFB2BF]">
            <Users size={14} />
            {course?.studentEnrolled?.length || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Coursecard;
