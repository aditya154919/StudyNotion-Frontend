import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShareSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import {ACCOUNT_TYPE} from "../utils/constant"
import copy from "copy-to-clipboard"
import { useNavigate } from "react-router";
import { setAddToCart } from "../slices/Cartslice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleShare = () => {
   copy(window.location.href);
  toast.success("Copy to clipboard")
  }
  
  const handleAddCart = () => {
    if(user?.accountType == ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if(token){
      dispatch(setAddToCart(course));
      // toast.success("Course Added to cart success")
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }
  return (
    <>
      <div className="flex flex-col gap-2 rounded-md bg-[#2C333F] p-4  text-[#F1F2FF]">
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="max-h-52 min-h-45 w-100 overflow-hidden rounded-2xl object-cover md:max-w-full"
        />
        <div className="p-2">
          <div className="space-x-1  text-2xl font-semibold">
            Rs:{course?.price}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="cursor-pointer rounded-md bg-[#FFD60A] px-5 py-2 font-semibold text-[#000814]"
            onClick={
              user && course?.studentEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          {(!user || !course?.studentEnrolled.includes(user?._id)) && (
            <button 
            onClick={handleAddCart}
            className="cursor-pointer rounded-md bg-[#000814] px-5 py-2 font-semibold text-[#F1F2FF]">
              Add to Cart
            </button>
          )}
        </div>
        <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-2 cursor-pointer text-[#E7C009] "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
      </div>
    </>
  );
};

export default CourseDetailsCard;
