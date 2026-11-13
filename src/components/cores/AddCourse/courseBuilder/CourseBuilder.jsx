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
    if (!course?.courseContent?.length) {
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
    try {
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
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="space-y-6 rounded-2xl border border-[#2C333F] bg-gradient-to-br from-[#161D29] to-[#111722] p-4 shadow-xl shadow-black/10 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-semibold text-white">Course sections</h1>
        <p className="mt-1 text-sm text-gray-400">
          Organize your material into sections, then add lessons to each one.
        </p>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col space-y-2">
          <label>
            <p className="mt-2 text-sm font-medium text-gray-200">
              Section Name<sup className="text-red-400">*</sup>
            </p>
            <input
              id="sectionName"
              placeholder="e.g. Getting started"
              className="mt-2 w-full rounded-xl border border-[#424854] bg-[#0b111b] px-4 py-3 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              {...register("sectionName", { required: true })}
            />
          </label>
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-red-600">
              Section Name required
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
         <button disabled={loading} className="flex items-center justify-center gap-2 rounded-xl border border-amber-300/50 px-4 py-2.5 font-semibold text-amber-200 transition hover:bg-amber-300/10 disabled:opacity-60">
            {
                loading ? "Saving..." : editSectionName ? "Save section" : "Add section"
            }
            <IoAddCircleOutline className="text-amber-300"/>
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
        course?.courseContent?.length >0 &&(
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      {/* nexr and privew */}
      <div className="flex justify-between gap-3 border-t border-[#2C333F] pt-5">
        <button
          type="button"
          onClick={goBack}
          className="rounded-xl border border-[#424854] px-5 py-2.5 font-semibold text-gray-200 transition hover:bg-[#2C333F]"
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
