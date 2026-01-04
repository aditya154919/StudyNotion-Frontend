import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router'
import { getFullCourseDetailse, getFullEnrolledCourse } from '../Services/operations/Courseapi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/ViewCourseSlice';
import VideoDetailsSideBar from '../components/cores/ViewCourses/VideoDetailsSideBar';
import ReviewModal from '../components/cores/ViewCourses/ReviewModal';

const ViewCourse = () => {

    const [review,setreview] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const getCourse = await getFullEnrolledCourse(courseId,token);
            // console.log("gettcourse",getCourse)
            dispatch(setCourseSectionData(getCourse?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(getCourse?.courseDetails));
            dispatch(setCompletedLectures(getCourse?.completedVideos))
            let lecture = 0;
            getCourse?.courseDetails?.courseContent?.forEach((sec)=>{
                lecture +=sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lecture))
        }
        setCourseSpecificDetails()
    },[])

    console.log("review",review)
  return (
    <>
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailsSideBar setreview={setreview}/>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
    </div>
    {review && (<ReviewModal setreview={setreview}/>)}
    </>
  )
}

export default ViewCourse
