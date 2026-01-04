import React, { useEffect, useState } from 'react'
import IconBtn from '../../../../Common/IconBtn'
import { useNavigate } from 'react-router'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from 'react-redux'
import CourseTable from './CourseTable'
import { fetchInstructorCourses } from '../../../../Services/operations/Courseapi'

const MyCourses = () => {
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const [courses,setCourses] = useState([])

    useEffect(()=>{
        const fetchCourses = async()=>{
            const res = await fetchInstructorCourses(token);
            // console.log("RES",res);
            setCourses(res)
        }
        fetchCourses()
    },[])
  return (
    <div>
      <div className='mb-14 flex items-center justify-between px-10'>
         <h1 className='text-2xl font-semibold text-gray-200'>My Courses</h1>
         <IconBtn text="Add course" onclick={()=>navigate("/dashboard/addcourse")}>
               <VscAdd/>
         </IconBtn>
      </div>
      {
        courses && <CourseTable courses={courses} setCourses={setCourses}/>
      }
    </div>
  )
}

export default MyCourses
