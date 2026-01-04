
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { HiMiniCurrencyRupee } from "react-icons/hi2";

import Upload from "./Upload";
import { COURSE_STATUS } from "../../../../utils/constant";
import { setCourse, setStep } from "../../../../slices/Courseslice";
import { gettag } from "../../../../Services/operations/Authapi";
import {
  createCourse,
  editCourseDetails,
} from "../../../../Services/operations/Courseapi";

const CourseInfo = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      const response = await gettag();
      if (response?.length) setTags(response);
      setLoading(false);
    };
    fetchTags();
  }, []);


  useEffect(() => {
    if (editCourse ) {
    console.log("EDIT COURSE",course)
    setValue("courseName", course.courseName);
    setValue("courseDescription", course.courseDescription);
    setValue("courseBenefits", course.whatYouWillLearn);
    setValue("thumbnail",course.thumbnail)
    setValue("coursePrice", course.price);
    setValue("courseTag", course.tag.name);
    }
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const values = getValues();

    return (
      values.courseName !== course.courseName ||
      values.courseDescription !== course.courseDescription ||
      values.courseBenefits !== course.whatYouWillLearn ||
      values.coursePrice !== course.price ||
      values.courseTag !== course.tag ||
      values.courseImage
    );
  };

 
  const onSubmit = async (data) => {
    setLoading(true);

    //  EDIT COURSE
    if (editCourse) {
      if (!isFormUpdated()) {
        dispatch(setStep(2));
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("courseId", course._id);

      if (data.courseName !== course.courseName)
        formData.append("courseName", data.courseName);

      if (data.courseDescription !== course.courseDescription)
        formData.append("courseDescription", data.courseDescription);

      if (data.courseBenefits !== course.whatYouWillLearn)
        formData.append("whatYouWillLearn", data.courseBenefits);

      if (data.coursePrice !== course.price)
        formData.append("price", data.coursePrice);

      if (data.courseTag !== course.tag)
        formData.append("tag", data.courseTag);

      if (data.courseImage)
        formData.append("thumbnail", data.courseImage);

      const updatedCourse = await editCourseDetails(formData, token);
      dispatch(setCourse(updatedCourse));
      dispatch(setStep(2));
      setLoading(false);
      return;
    }

    // CREATE COURSE
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("tag", data.courseTag);
    formData.append("thumbnail", data.courseImage);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("status", COURSE_STATUS.DRAFT);

    await createCourse(formData, token, dispatch);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6"
    >
      {/* COURSE NAME */}
      <div>
        <label className="text-gray-300">
          Course Title <sup className="text-red-400">*</sup>
        </label>
        <input
          {...register("courseName", { required: true })}
          className="w-full p-2 bg-gray-600 text-gray-300 rounded-md"
          placeholder="Enter Course Title"
        />
        {errors.courseName && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-gray-300">
          Course Description <sup className="text-red-400">*</sup>
        </label>
        <textarea
          {...register("courseDescription", { required: true })}
          className="w-full p-2 bg-gray-600 text-gray-300 rounded-md min-h-32.5"
        />
        {errors.courseDescription && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* PRICE */}
      <div>
        <label className="text-gray-300">
          Course Price <sup className="text-red-400">*</sup>
        </label>
        <div className="relative">
          <input
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className="w-full p-2 pl-10 bg-gray-600 text-gray-300 rounded-md"
          />
          <HiMiniCurrencyRupee className="absolute left-3 top-3 text-gray-400" />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* TAG */}
      <div>
        <label className="text-gray-300">
          Category <sup className="text-red-400">*</sup>
        </label>
        <select
          {...register("courseTag", { required: true })}
          className="w-full p-2 bg-gray-600 text-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.courseTag && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* THUMBNAIL */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* BENEFITS */}
      <div>
        <label className="text-gray-300">
          Benefits <sup className="text-red-400">*</sup>
        </label>
        <textarea
          {...register("courseBenefits", { required: true })}
          className="w-full p-2 bg-gray-600 text-gray-300 rounded-md min-h-32.5"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="bg-gray-400 px-4 py-2 rounded-md "
          >
            Continue Without Saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 bg-yellow-400 px-4 py-2 rounded-md"
        >
          {editCourse ? "Save" : "Next"} <MdNavigateNext />
        </button>
      </div>
    </form>
  );
};

export default CourseInfo;
