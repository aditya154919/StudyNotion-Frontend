import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { formatDate } from "../../../../utils/formateData";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { COURSE_STATUS } from "../../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { deleteCourse, fetchInstructorCourses } from "../../../../Services/operations/Courseapi";
import ConfirmationModal from "../../../../Common/ConfirmationModal";


const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {token} = useSelector((state)=>state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30;

  
  const handleDeleteCourse = async(courseId) => {
    setLoading(true);
    await deleteCourse({courseId:courseId},token)
    //fetch remening courses after delete
    const res = await fetchInstructorCourses(token);
    if(res){
      setCourses(res);
    }
    setConfirmationModal(null);
    setLoading(false)
  };

  return (
    <>
       <Table className="responsiveTable w-full rounded-xl border border-[#2C333F] bg-[#161D29]">
      <Thead>
        <Tr className="border-b border-[#2C333F]">
          <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-200">
            Courses
          </Th>
          <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-200 w-37.5">
            Duration
          </Th>
          <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-200 w-30">
            Price
          </Th>
          <Th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-200 w-35">
            Action
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {courses?.length === 0 ? (
          <Tr>
            <Td
              colSpan={4}
              className="py-10 text-center text-2xl font-medium text-gray-200 before:content-none"
            >
              No Course Found
            </Td>
          </Tr>
        ) : (
          courses.map((ele) => (
            <Tr key={ele._id} className="border-b border-[#2C333F]">
              {/* COURSES */}
              <Td className="px-6 py-6 before:content-none">
                <div className="flex gap-4">
                  <img
                    src={ele.thumbnail}
                    alt={ele.courseName}
                    className="h-22.5 w-40 rounded-lg object-cover"
                  />

                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-gray-100">
                      {ele.courseName}
                    </p>

                    {/* Course Description Truncation */}
                    <p className="text-xs text-[#838894]">
                      {ele.courseDescription?.split(" ").length > TRUNCATE_LENGTH
                        ? ele.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                        : ele.courseDescription}
                    </p>

                    <p className="text-[12px] text-white">
                      Created: {formatDate(ele.createdAt)}
                    </p>

                    {/* Status Badge */}
                    {ele.status === COURSE_STATUS.DRAFT ? (
                      <span className="mt-1 flex w-fit items-center gap-2 rounded-full bg-[#2C333F] px-2 py-0.5 text-[12px] font-medium text-[#F37290]">
                        <HiClock size={14} />
                        Drafted
                      </span>
                    ) : (
                      <span className="mt-1 flex w-fit items-center gap-2 rounded-full bg-[#2C333F] px-2 py-0.5 text-[12px] font-medium text-[#E7C009]">
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E7C009] text-[#2C333F]">
                          <FaCheck size={8} />
                        </span>
                        Published
                      </span>
                    )}
                  </div>
                </div>
              </Td>

              {/* DURATION (Hardcoded in original, needs dynamic value if available) */}
              <Td className="px-6 py-6 text-sm font-medium text-gray-200 before:content-none">
                2hr 30min
              </Td>

              {/* PRICE */}
              <Td className="px-6 py-6 text-sm font-medium text-gray-200 before:content-none">
                ₹{ele.price}
              </Td>

              {/* ACTION */}
              <Td className="px-6 py-6 before:content-none">
                <div className="flex items-center gap-4">
                  {/* Edit Button */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${ele._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all text-gray-600 duration-200 hover:scale-110 hover:text-[#05A77B]"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  {/* Delete Button */}
                  <button
                  disabled={loading}
                  onClick={()=>{
                    setConfirmationModal({
                      text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleDeleteCourse(ele._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                    })
                  }}
                  title="Delete"
                    className="px-1 transition-all text-gray-600 cursor-pointer duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <FaTrash size={20}></FaTrash>
                  </button>
                </div>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
    {confirmationModal && <ConfirmationModal modelData={confirmationModal}/>}
    </>
  );
};

export default CourseTable;