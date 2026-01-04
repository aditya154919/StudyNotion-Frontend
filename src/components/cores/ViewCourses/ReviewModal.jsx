import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";
import IconBtn from "../../../Common/IconBtn";
import { createRating } from "../../../Services/operations/Courseapi";

const ReviewModal = ({ setreview }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { courseEntireData } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating);
    // console.log("Ratind value",courseRating)
  };
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setreview(false);
  };
  return (
    <div className="fixed inset-0 z-1000 mt-0! grid h-screen w-screen place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-140 rounded-lg border border-[#6E727F] bg-[#161D29]">
        <div className="flex items-center justify-between rounded-t-lg bg-[#2C333F] p-5">
          <p className="text-gray-300 text-lg">Add Review</p>
          <button onClick={() => setreview(false)}>
            <RxCross2 className="text-2xl text-gray-200" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user.image}
              alt={user?.firstName}
              className="aspect-square w-12.5 rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-gray-200">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-200">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              color2={"#ffd700"}
            />

            <div className="flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="courseExperience"
                className="text-sm text-gray-200"
              >
                Add your Expirence<sup className="text-red-400">*</sup>
              </label>
              <textarea
                id="courseExperience"
                aria-placeholder="Add your Experience here"
                {...register("courseExperience", { required: true })}
                className="rounded-lg bg-[#2C333F] p-3 text-[16px] leading-6 text-gray-200
                  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none resize-x-none min-h-32.5 w-full"
              />
              {errors.courseExperience && (
                <span className="text-red-500">Please Add your Experience</span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setreview(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-2 px-5 font-semibold text-[#000814]`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
