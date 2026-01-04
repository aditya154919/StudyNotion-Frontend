import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../Services/operations/paymentApi";
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getFullCourseDetailse } from "../Services/operations/Courseapi";
import getAvgRating from "../utils/getRatingAvg";
import Rating from "../Common/Rating";
import { formatDate } from "../utils/formateData";
import CourseDetailsCard from "../Common/CourseDetailsCard";
import Footer from "../components/cores/HomePage/Footer";
import ConfirmationModal from "../Common/ConfirmationModal";

const CourseDetils = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseId = useParams();

  const { course } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const res = await getFullCourseDetailse(courseId, token, dispatch);
      setCourseData(res);
    };
    getCourse();
  }, [courseId]);
  console.log("course", courseData);
  const reviewCount = getAvgRating(courseData?.ratingAndReview);

  const [totalNoofLecture, settotalNoofLecture] = useState(0);
  useEffect(() => {
    let lectures = 0;
  });
  const handleBuyCourse = ()=>{
    if(token){
      // console.log("Hello ji",token)
      buyCourse(token,[courseId],user,navigate,dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !courseData) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }
  return (
    <>
      <div className="relative w-full bg-[#161D29]">
        {/* hero section */}
        <div className="mx-auto flex  box-content px-4  2xl:relative">
          <div className="mx-auto grid min-h-90.5 max-w-112.5 justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-202.5">
            <div className="relative block max-h-120 lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={courseData?.thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 px-20 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-[#F1F2FF]">
              <div>
                <p className="text-2xl font-bold text-[#F1F2FF] sm:text-[42px]">
                  {courseData.courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>
                {courseData?.courseDescription}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{reviewCount}</span>
                <Rating Review_Count={reviewCount} Star_Size={24} />
                <span>{`(${course?.ratingAndReview.length} reviews)`}</span>
                <span>{`${course?.studentEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By{" "}
                  {`${course?.instructor.firstName} ${course?.instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(course?.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-[#585D69] py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-[#F1F2FF]">
                Rs. {course?.price}
              </p>
              <button className="cursor-pointer rounded-md bg-[#FFD60A] px-5 py-2 font-semibold text-[#000814]" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="cursor-pointer rounded-md bg-[#000814] px-5 py-2 font-semibold text-[#F1F2FF]">Add to Cart</button>
            </div>
          </div>
          {/* courseCard */}

          <div className="right-1 top-15 mx-auto hidden -translate-x-23  w-1/3 max-w-80 translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={course}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-gray-50 lg:w-315">
       <div className="mx-auto max-w-162.5 lg:mx-0 xl:max-w-202">
          <div className="my-8 border border-[#424854] p-8">
           <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {course?.whatYouWillLearn}
            </div>
          </div>

          <div className="mb-12 py-4">
              <p className="text-[20px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    course?.instructor.image
                      ? course?.instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${course?.instructor.firstName} ${course?.instructor.lastName}`
                  }
                  alt="Author"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="text-lg">{`${course?.instructor.firstName} ${course?.instructor.lastName}`}</p>
              </div>
              <p className="text-[#adafc0]">
                {course?.instructor?.about}
              </p>
            </div>
       </div>
      </div>

      <Footer/>
      {confirmationModal && <ConfirmationModal modelData={confirmationModal} />}
    </>
    
  );
};

export default CourseDetils;
