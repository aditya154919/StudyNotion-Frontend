import React from 'react'
import IconBtn from '../../../../Common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { editProfile } from '../../../../Services/operations/Profileapi'


const genders = ["Male", "Female", "Other"]

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      const updated = await editProfile(token, data, dispatch)
      if (updated) {
        navigate("/dashboard/myprofile")
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
   <>
     <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-8 flex flex-col gap-y-6 rounded-2xl border border-white/5 bg-[#111827] p-5 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-200">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-[14px] text-[#F1F2FF]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] placeholder:text-[#6E727F] focus:border-violet-400 focus:outline-none"
                {...register("firstName", { required: "Please enter your first name." })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-[14px] text-[#F1F2FF]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] placeholder:text-[#6E727F] focus:border-violet-400 focus:outline-none"
                {...register("lastName", { required: "Please enter your last name." })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-[14px] text-[#F1F2FF]">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] placeholder:text-[#6E727F] focus:border-violet-400 focus:outline-none"
                {...register("dateOfBirth", {
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.dateOfBirth || ""}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-[14px] text-[#F1F2FF]">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] focus:border-violet-400 focus:outline-none"
                {...register("gender")}
                defaultValue={user?.gender || ""}
              >
                <option value="">Prefer not to say</option>
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-[14px] text-[#F1F2FF]">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] placeholder:text-[#6E727F] focus:border-violet-400 focus:outline-none"
                {...register("contactNumber", {
                  validate: (value) => {
                    if (!value) return true
                    return (
                      (value.length >= 10 && value.length <= 12) ||
                      "Enter a valid contact number."
                    )
                  },
                })}
                defaultValue={user?.contactNumber || ""}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-[14px] text-[#F1F2FF]">
                About you
              </label>
              <textarea
                name="about"
                id="about"
                rows={3}
                maxLength={500}
                placeholder="Share a little about yourself"
                className="resize-y rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-[16px] leading-6 text-[#F1F2FF] placeholder:text-[#6E727F] focus:border-violet-400 focus:outline-none"
                {...register("about")}
                defaultValue={user?.about || ""}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/myprofile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
   </>
  )
}

export default EditProfile
