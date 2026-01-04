import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { setCourse } from "../../../../slices/Courseslice";
import { createSection, updateSection } from "../../../../Services/operations/Courseapi";
import IconBtn from "../../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md"
import { setStep } from "../../../../slices/Courseslice";

const CourseBuilder = () => {
    const {course} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editSectionName,setEditSectionName] = useState(null)

  const cancelEdit =()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }

   const goBack = () => {
    dispatch(setStep(1))
    // dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const handleChangeEditSectionName = (sectionId,sectionName) =>{
    console.log(editSectionName)
     if(editSectionName === sectionId){
        cancelEdit()
        return
     }
    setEditSectionName(sectionId)
    console.log(editSectionName)
    setValue("sectionName", sectionName)
  }

  const onsubmit = async(data) => {
    setLoading(true);
    let result;
    if(editSectionName){
        result = await updateSection({
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id
        },token)
    }
    else{
        const formData = {
            sectionName:data.sectionName,
            courseId:course._id
        }
        result = await createSection(formData,token)
    }
    if(result){
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName","")
    }
    setLoading(false)
  }
  return (
    <div className='"space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6'>
      <h1 className="text-xl text-white font-semibold">Course Sections</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col space-y-2">
          <label>
            <p className="text-white mt-5 text-md">
              Section Name<sup className="text-red-400">*</sup>
            </p>
            <input
              id="sectionName"
              placeholder="Enter Section Name"
              className="w-full p-2 bg-gray-600 text-gray-300  rounded-md mt-0.5"
              {...register("sectionName", { required: true })}
            />
          </label>
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-red-600">
              Section Name required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4 mt-2">
         <button className="border flex flex-row items-center justify-center gap-2 border-yellow-300 p-2 rounded-md mt-2 text-yellow-400 cursor-pointer">
            {
                editSectionName ? "Edit section Name":"Create Name"
            }
            <IoAddCircleOutline className="text-yellow-400 mt-0.5 "/>
         </button>
         {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-[#838894] underline cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {
        course.courseContent.length >0 &&(
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      {/* nexr and privew */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-2 px-4 font-semibold text-[#000814]`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilder;
