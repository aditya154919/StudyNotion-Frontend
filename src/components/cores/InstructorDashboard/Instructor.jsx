import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../Services/operations/Profileapi';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../Services/operations/Courseapi';
import { Link } from 'react-router';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const[loading,setLoading] = useState(false);
    const [instructorData,setInstructorData] = useState([]);
    const [course,setCourse] = useState([])

    useEffect(()=>{
        const getCourseDataWithStats = async()=>{
            setLoading(true);
            const instructorData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if(instructorData?.length){
                setInstructorData(instructorData);
            }
            if(result){
                setCourse(result)
            }
            setLoading(false)
        }
        getCourseDataWithStats()
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=>acc + curr.totalEarning,0)
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled,0
)
  return (
    <div className='text-white'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-200'>Hello {user?.firstName} 👋</h1>
        <p className='font-medium text-[#999DAA'>Let's start something new</p>
      </div>
      {loading ?(<div className='spinner'/>):course.length > 0 ?(
        <div>
            <div className='my-4 flex h-112.5 space-x-4'>
                {totalAmount > 0 || totalStudents > 0 ? (
                    <InstructorChart course = {instructorData}/>
                ):(
                    <div className="flex-1 rounded-md bg-[#161D29] p-6">
                  <p className="text-lg font-bold text-gray-200">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-[#C5C7D4]">
                    Not Enough Data To Visualize
                  </p>
                </div>
                )}
                <div className='flex min-w-62.5 flex-col rounded-md bg-[#161D29] p-6'>
                    <p className='text-lg font-bold text-gray-200'>Statistics</p>
                    <div>
                    <p className="text-lg text-[#999DAA]">Total Courses</p>
                    <p className="text-3xl font-semibold text-[#C5C7D4]">
                      {course.length}
                    </p>
                  </div>
                    <div className='mt-4 space-y-4'>
                        <p className='text-lg text-[#999DAA]'>Total Students</p>
                        <p className='text-3xl font-semibold text-[#C5C7D4]'>{totalStudents}</p>
                    </div>
                    <div>
                        <p className='text-lg text-[#999DAA]'>Total income</p>
                        <p className='text-3xl font-semibold text-[#C5C7D4]'>{totalAmount}</p>
                    </div>
                </div>
            </div>
            <div>
                {/* /Render 3 courses */}
                <div className='rounded-md bg-[#161D29] p-6'>
                    <div className='flex items-center justify-between'>
                    <p className='text-lg font-bold text-gray-200'>Your Courses</p>
                    <Link to={"/dashboard/my-courses"}>
                           <p className='text-xs font-semibold text-[#FFD60A]'>View All</p>
                    </Link>
                    </div>
                </div>
                <div className='my-4 flex items-start space-x-6'>
                    {
                        course.slice(0,3).map((item)=>{
                          return  <div>
                                <img
                                src={item.thumbnail}
                                alt={item.courseName}
                                className="h-50 w-full rounded-md object-cover"
                                />
                                <div className='mt-3 w-full'>
                                    <p className='text-sm font-medium text-[#C5C7D4]'>{item.courseName}</p>
                                    <div className='mt-1 flex items-center space-x-2'>
                                        <p className='text-xs font-medium text-[#838894]'>{item.studentEnrolled.length} Students</p>
                                        <p className='text-xs font-medium text-[#838894]'>|</p>
                                        <p className='text-xs font-medium text-[#838894]'>Rs:{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
      ):"Hello"}
    </div>
  )
}

export default Instructor
