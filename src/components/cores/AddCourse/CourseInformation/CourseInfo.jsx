
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
    if (editCourse && course) {
      setValue("courseName", course.courseName || "");
      setValue("courseDescription", course.courseDescription || "");
      setValue("courseBenefits", course.whatYouWillLearn || "");
      setValue("thumbnail", course.thumbnail || "");
      setValue("coursePrice", Number(course.price) || 0);
      setValue("courseTag", course.tag?._id || course.tag || "");
    }
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const values = getValues();
    const courseTagId = course.tag?._id || course.tag || "";

    return (
      values.courseName !== course.courseName ||
      values.courseDescription !== course.courseDescription ||
      values.courseBenefits !== course.whatYouWillLearn ||
      Number(values.coursePrice) !== Number(course.price) ||
      values.courseTag !== courseTagId ||
      (typeof File !== "undefined" && values.courseImage instanceof File)
    );
  };

 
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editCourse) {
        if (!isFormUpdated()) {
          dispatch(setStep(2));
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

        if (Number(data.coursePrice) !== Number(course.price))
          formData.append("price", String(data.coursePrice));

        if (data.courseTag !== (course.tag?._id || course.tag))
          formData.append("tag", data.courseTag);

        if (typeof File !== "undefined" && data.courseImage instanceof File)
          formData.append("thumbnail", data.courseImage);

        const updatedCourse = await editCourseDetails(formData, token);
        if (updatedCourse) {
          dispatch(setCourse(updatedCourse));
          dispatch(setStep(2));
        }
        return;
      }

      const formData = new FormData();
      formData.append("courseName", data.courseName);
      formData.append("courseDescription", data.courseDescription);
      formData.append("price", String(data.coursePrice));
      formData.append("tag", data.courseTag);
      formData.append("thumbnail", data.courseImage);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("status", COURSE_STATUS.DRAFT);

      await createCourse(formData, token, dispatch);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 rounded-2xl border border-[#2C333F] bg-gradient-to-br from-[#161D29] to-[#111722] p-4 shadow-xl shadow-black/10 sm:p-6 lg:p-8"
    >
      {/* COURSE NAME */}
      <div>
        <label className="text-gray-300">
          Course Title <sup className="text-red-400">*</sup>
        </label>
        <input
          {...register("courseName", { required: true })}
          className="mt-2 w-full rounded-xl border border-[#424854] bg-[#0b111b] px-4 py-3 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
          className="mt-2 min-h-36 w-full rounded-xl border border-[#424854] bg-[#0b111b] px-4 py-3 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
            className="w-full rounded-xl border border-[#424854] bg-[#0b111b] py-3 pl-10 pr-4 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
          className="mt-2 w-full rounded-xl border border-[#424854] bg-[#0b111b] px-4 py-3 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
        type="image"
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
          className="mt-2 min-h-36 w-full rounded-xl border border-[#424854] bg-[#0b111b] px-4 py-3 text-gray-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-xl border border-[#424854] px-4 py-3 font-semibold text-gray-200 transition hover:bg-[#2C333F]"
          >
            Continue Without Saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1 rounded-xl bg-amber-300 px-5 py-3 font-bold text-gray-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {editCourse ? "Save" : "Next"} <MdNavigateNext />
        </button>
      </div>
    </form>
  );
};

export default CourseInfo;
