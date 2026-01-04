import React, { useState,useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../CourseInformation/Upload";
import { useForm } from "react-hook-form";
import { createSubSection, updateSubSection } from "../../../../Services/operations/Courseapi";
import { setCourse } from "../../../../slices/Courseslice";

const SubSection = ({
  modelData,
  setModelData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

   useEffect(() => {
  if (view || edit) {
    setValue("lectureTitle", modelData.title);
    setValue("lectureDescription", modelData.description);
    setValue("LectureVedio", modelData.vedioUrl);
  }
}, [view, edit, modelData, setValue]);

 const isFormUpdated = ()=>{
  const currentValues = getValues();
  if (
      currentValues.lectureTitle !== modelData.title ||
      currentValues.lectureDescription !== modelData.description ||
      currentValues.LectureVedio !== modelData.vedioUrl
    ) {
      return true
    }
    return false
 }

 const handleEditSubsection = async()=>{
    const currentValue = getValues();
    const formData = new FormData();
       
    formData.append("sectionId", modelData.sectionId)
    formData.append("subSectionId", modelData._id)  
    
    if (currentValue.lectureTitle !== modelData.title) {
      formData.append("title", currentValue.lectureTitle)
    }
    if (currentValue.lectureDesc !== modelData.description) {
      formData.append("description", currentValue.lectureDescription)
    }
    if (currentValue.lectureVideo !== modelData.vedioUrl) {
      formData.append("video", currentValue.LectureVideo)
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modelData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModelData(null)
    setLoading(false)
 }

  const onsubmit = async (data) => {
    if(view) return;
    if(edit){
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }


    setLoading(true);
    const formData = new FormData();
    formData.append("sectionId", modelData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDescription);
    formData.append("vedio", data.LectureVedio);

    const result = await createSubSection(formData, token);

    // if(result){
    //   const updatedCourseContent = course.courseContent.map((section)=>
    //   section._id === modelData ? result:section
    //   )
    //   const updatedCourse = {...course, courseContent:updatedCourseContent || []}
    //   dispatch(setCourse(updatedCourse))
    // }
    if (result?.data) {
      const updatedSection = {
        ...result.data,
        subSection: result.data.subSection || [], 
      };

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === updatedSection._id
          ? updatedSection
          : {
              ...section,
              subSection: section.subSection || [], // ✅ normalize others
            }
      );

      dispatch(
        setCourse({
          ...course,
          courseContent: updatedCourseContent,
        })
      );
    }

    setModelData(null);
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-1000 mt-0! grid h-screen w-screen overflow-auto place-items-center backdrop-blur-sm bg-opacity-10">
      <div className="my-10 w-11/12 max-w-175 rounded-lg border border-#6E727F bg-[#161D29]">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-#2C333F p-5">
          <p className="text-xl font-semibold text-[#F1F2FF]">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModelData(null) : {})}>
            <RxCross2 className="text-2xl text-[#F1F2FF]" />
          </button>
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className=" flex flex-col gap-5 px-8 py-10"
        >
          <Upload
            name="LectureVedio"
            label="Lecture Vedio"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modelData.vedioUrl : null}
            editData={edit ? modelData.vedioUrl : null}
          />

          {/* Lecture title */}
          <label>
            <p className="font-medium text-gray-300 ">
              Lecture Title<sup className="text-red-400">*</sup>
            </p>
            <input
              id="lectureTitle"
              disabled={view || loading}
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="w-full p-2 bg-gray-600 text-gray-300 mt-2 rounded-md"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-red-500">
                Lecture title is required
              </span>
            )}
          </label>
          {/* Lecture discriptin  */}
          <label>
            <p className="font-medium text-gray-300 ">
              Lecture description<sup className="text-red-400">*</sup>
            </p>
            <textarea
              id="lectureDescription"
              placeholder="Enter short Description"
              {...register("lectureDescription", { required: true })}
              className="w-full p-2 bg-gray-600  text-gray-300 mt-2 rounded-md"
            />
            {errors.lectureDescription && (
              <span className="ml-2 text-xs tracking-wide text-red-500">
                Lecture Ddescription required
              </span>
            )}
          </label>
          {!view && (
            <div className=" flex justify-end">
              <button className="py-2 text-black font-medium cursor-pointer bg-yellow-400 rounded-md px-4 ">
                {edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSection;
