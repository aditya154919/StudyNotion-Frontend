import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../Common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../utils/constant";
import { resetAll, setStep } from "../../../../slices/Courseslice";
import { useNavigate } from "react-router";
import { editCourseDetails } from "../../../../Services/operations/Courseapi";

const Publish = () => {
  const { course } = useSelector((state) => state.course);
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      public: false,
    },
  });
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("public", course?.status === COURSE_STATUS.PUBLISHED);
  }, [course?.status, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetAll());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async (data) => {
    if (!course?._id) return;
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        data.public === true) ||
      (course?.status === COURSE_STATUS.DRAFT && data.public === false)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = data.public
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    try {
      const result = await editCourseDetails(formData, token);
      if (result) goToCourses();
    } finally {
      setLoading(false);
    }
  };

  const onsubmit = (data) => handleCoursePublish(data);
  return (
    <div className="rounded-2xl border border-[#2C333F] bg-gradient-to-br from-[#161D29] to-[#111722] p-5 shadow-xl shadow-black/10 sm:p-8">
      <h1 className="text-xl font-semibold text-white">Publish course</h1>
      <p className="mt-2 text-sm text-gray-400">
        Review your course visibility. You can keep it as a draft and publish
        when it is ready.
      </p>

      <form onSubmit={handleSubmit(onsubmit)}>
        {!course?._id && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100"
          >
            Save the course details first before choosing its publishing status.
          </p>
        )}
        <div className="my-7 rounded-xl border border-[#2C333F] bg-[#0b111b] p-4 sm:p-5">
          <label htmlFor="public" className="flex items-start gap-3">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              disabled={!course?._id || loading}
              className="mt-1 h-4 w-4 rounded border-gray-500 bg-[#2C333F] text-amber-400 focus:ring-2 focus:ring-amber-300"
            />
            <span>
              <span className="block font-semibold text-gray-100">
                Make this course public
              </span>
              <span className="mt-1 block text-sm leading-6 text-gray-400">
                Published courses can be discovered and enrolled in by students.
              </span>
            </span>
          </label>
        </div>

        {course?.studentEnrolled?.length > 0 &&
          course.status === COURSE_STATUS.PUBLISHED && (
            <p className="mb-5 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
              This course has active students, so it cannot be unpublished.
              Individual student access can be managed from your course
              dashboard.
            </p>
          )}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="rounded-xl border border-[#424854] px-5 py-3 font-semibold text-gray-200 transition hover:bg-[#2C333F] disabled:opacity-60"
          >
            Back
          </button>
          <IconBtn
            disabled={loading || !course?._id}
            text={loading ? "Saving..." : "Finish"}
          />
        </div>
      </form>
    </div>
  );
};

export default Publish;
