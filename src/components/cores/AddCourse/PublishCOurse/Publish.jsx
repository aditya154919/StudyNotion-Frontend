import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../Common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../utils/constant";
import { resetAll } from "../../../../slices/Courseslice";
import { useNavigate } from "react-router";
import { editCourseDetails } from "../../../../Services/operations/Courseapi";

const Publish = () => {
  const { register, setValue, getValues, handleSubmit } = useForm();
  const { course } = useSelector((state) => state.course);
  const {token} = useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetAll());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    console.log("Heloo");
    console.log(
      "checkbox value:",
      getValues("public"),
      typeof getValues("public")
    );

    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") == false)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onsubmit = () => {
    handleCoursePublish();
  };
  return (
    <div className="rounded-md border bg-[#161D29] border-[#2C333F] p-6">
      <h1 className="text-gray-300 text-xl font-semibold">Publish Course</h1>

      <form onSubmit={handleSubmit(onsubmit)}>
        {/* checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-[#585D69] text-[#6E727F] focus:ring-2 focus:ring-[#F1F2FF]"
            />
            <span className="ml-2 text-[#6E727F]">
              Make this course as public
            </span>
          </label>
        </div>

        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-2 px-5 font-semibold text-[#000814]"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default Publish;
