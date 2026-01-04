import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../Services/apiconnector";
import { PROFILE } from "../../../Services/api";
// import { setLoading } from '../../../slices/Authslice';
import CountryCode from "../../../data/countrycode.json"
import toast from "react-hot-toast";

const { CONTACTUS_API } = PROFILE;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const SubmitHandler = async (data) => {
    try {
        const toastId = toast.loading("Loding...")
      setLoading(true);

      const res = await apiConnector({
        method: "POST",
        url: CONTACTUS_API,
        body: data,
      });
      console.log("Res", res);
      toast.success("Thanks for Contact Us")
      setLoading(false);
      toast.dismiss(toastId)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(SubmitHandler)}
    >
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-[16px] text-gray-200">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
            {...register("firstName", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-[#AFB2BF]">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="text-[16px] text-gray-200">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter lastName "
            className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="-mt-1 text-[12px] text-[#E7C009]">
              Please enter your name.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[16px] text-gray-200">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-[#E7C009]">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNo" className="text-[16px] text-gray-200">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-17.5 flex-col gap-2">
            <select
              type="text"
              name="phoneNo"
              id="phoneNo"
              placeholder="Enter first name"
              className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-[#E7C009]">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[16px] text-gray-200">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Enter your message here"
          className="rounded-lg bg-[#2C333F] p-2.5 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-[#E7C009]">
            Please enter your Message.
          </span>
        )}
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-[#E7C009] px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-[#585D69] sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
