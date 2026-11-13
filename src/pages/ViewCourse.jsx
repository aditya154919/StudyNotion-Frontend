import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router'
import { getCompletedSectionMaterials, getFullEnrolledCourse } from '../Services/operations/Courseapi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/ViewCourseSlice';
import VideoDetailsSideBar from '../components/cores/ViewCourses/VideoDetailsSideBar';
import ReviewModal from '../components/cores/ViewCourses/ReviewModal';

const ViewCourse = () => {

    const [review,setreview] = useState(false);
    const [materialsState, setMaterialsState] = useState({
        courseId: null,
        items: [],
        unavailable: false,
        loading: true,
    });
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {completedLectures} = useSelector((state)=>state.viewCourse);
    const dispatch = useDispatch();
    const sectionMaterials =
        materialsState.courseId === courseId ? materialsState.items : [];
    const materialsUnavailable =
        materialsState.courseId === courseId && materialsState.unavailable;
    const materialsLoading =
        materialsState.courseId !== courseId || materialsState.loading;

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
    },[courseId, token, dispatch])

    useEffect(() => {
        let active = true;
        const loadSectionMaterials = async () => {
            const materials = await getCompletedSectionMaterials(courseId, token);
            if (!active) return;
            if (Array.isArray(materials)) {
                setMaterialsState({
                    courseId,
                    items: materials,
                    unavailable: false,
                    loading: false,
                });
            } else {
                setMaterialsState({
                    courseId,
                    items: [],
                    unavailable: true,
                    loading: false,
                });
            }
        };
        loadSectionMaterials();
        return () => {
            active = false;
        };
    }, [courseId, token, completedLectures]);

  return (
    <>
    <div className='relative flex min-h-[calc(100vh_-_3.5rem)] min-w-0 flex-col md:flex-row'>
        <div className="order-1 md:hidden">
          <VideoDetailsSideBar
            setreview={setreview}
            mobile
            sectionMaterials={sectionMaterials}
            materialsUnavailable={materialsUnavailable}
            materialsLoading={materialsLoading}
          />
        </div>
        <div className="order-2 min-h-[55vh] min-w-0 flex-1 overflow-auto md:order-2 md:h-[calc(100vh_-_3.5rem)]">
          <div className="px-3 py-3 sm:px-5 sm:py-4 md:mx-6 md:px-0 md:py-0">
            <Outlet />
          </div>
        </div>
        <div className="hidden md:order-1 md:block">
          <VideoDetailsSideBar
            setreview={setreview}
            sectionMaterials={sectionMaterials}
            materialsUnavailable={materialsUnavailable}
            materialsLoading={materialsLoading}
          />
        </div>
    </div>
    {review && (<ReviewModal setreview={setreview}/>)}
    </>
  )
}

export default ViewCourse
