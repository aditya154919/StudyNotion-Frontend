import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { removeFromCart } from "../../../slices/Cartslice";

const CartCourses = () => {
    const [avgReview,setAvgReview] = useState()
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
  if (!cart || cart.length === 0) {
    setAvgReview(0);
    return;
  }

  const totalRatings = cart.reduce((acc, curr) => {
    return acc + (curr?.ratingAndReviews?.rating || 0);
  }, 0);

  const avg = totalRatings / cart.length;
  setAvgReview(avg.toFixed(1));
}, [cart]);

console.log(avgReview)

  return (
    <div className="flex flex-1 flex-col">
      {cart?.map((item, indx) => (
        <div
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-[#6E727F] pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
             <img
             src={item.thumbnail}
             alt={item.courseName}
             className="h-35 w-60 aspect-square object-cover rounded-md "
             />
             <div className="felx felx-col space-y-2">
                <p className="text-2xl font-medium text-gray-200">{item.courseName}</p>
                <p className="text-xl font-medium text-gray-500">{item.tag.name}</p>
                <p className="text-md font-medium text-gray-400 w-80 line-clamp-2">{item.courseDescription}</p>
             </div>
          </div>
          <div className="felx felx-col items-end space-y-2">
            <button onClick={() =>dispatch(removeFromCart(item._id))} className="flex items-center cursor-pointer  gap-x-1 rounded-md border border-[#424854] bg-[#2C333F] py-3 px-3 text-[#EF476F]">
                <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
             <p className="mb-6 text-3xl font-medium text-yellow-400">
              ₹ {item?.price}
            </p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
