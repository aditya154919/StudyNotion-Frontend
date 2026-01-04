import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import getAvgRating from '../../../utils/getRatingAvg'
import Rating from '../../../Common/Rating'

const Coursecard = ({course,Height}) => {
  const [avgReviewCount , setAvgReviewCount] = useState()

  useEffect(()=>{
    const rating = getAvgRating(course.ratingAndReview);
    setAvgReviewCount(rating)
  })
  return (
    <>
    <Link to={`/course/${course._id}`}>
     <div>
        <div className='rounded-lg'>
            <img
            src={course.thumbnail}
            alt='Course Img'
            className={`${Height} w-full object-cover rounded-md`}
            />
        </div>
        <div className='flex flex-row justify-between  px-2 py-2'>
          <p className='text-white text-xl font-medium'>{course.courseName}</p>
           <p className="text-md text-gray-50">
             By:  {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
        </div>
       <div className="flex items-center gap-2">
              <span className="text-[#FFF970]">{avgReviewCount || 0}</span>
              <Rating Review_Count={avgReviewCount} />
              <span className="text-gray-500">
                {course?.ratingAndReviews?.length}Ratings
              </span>
            </div>
        <p className='text-white px-2 text-md font-medium'>Rs:{course.price}</p>
     </div>
    </Link>
    </>
  )
}

export default Coursecard
