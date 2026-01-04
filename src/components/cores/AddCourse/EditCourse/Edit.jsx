import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import Section from '../Section';
import { getFullCourseDetailse } from '../../../../Services/operations/Courseapi';
import { setCourse, seteditCourse } from '../../../../slices/Courseslice';
// import Section from '../../../../../SERVER/modules/Section';

const Edit = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) =>state.auth)
    const {courseId} = useParams();
   const {course} = useSelector((state)=>state.course)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{(
        async()=>{
            setLoading(true);
            const result = getFullCourseDetailse(courseId,token,dispatch)
            // console.log("Ka hal ba",result)
            if(result?.courseDetails){
                dispatch(seteditCourse(true))
                // console.log("Hello ji ",result?.courseDetails)
                // dispatch(setCourse(result?.courseDetails))
                
            }
            setLoading(false)
        }
    )()},[])

      if (loading) {
      return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='m-y-8 mb-4 text-gray-200 font-semibold text-2xl flex justify-start'>
        Edit Course
      </h1>
      <div className='mx-auto max-w-150'>
        {
            course ? (
                <Section/>
            ):<p className="mt-14 text-center text-3xl font-semibold text-gray-400">
            Course not found
          </p>
        }
      </div>
    </div>
  )
}

export default Edit
