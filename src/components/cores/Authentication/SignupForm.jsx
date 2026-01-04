import React, { useState } from 'react'
import Tab from '../../../Common/Tab'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { ACCOUNT_TYPE } from '../../../utils/constant'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../../slices/Authslice'
import { useNavigate } from 'react-router';
import { toast } from "react-hot-toast"
import { signUp } from '../../../Services/operations/Authapi'



const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const[accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange =(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name] :e.target.value
    }))
  }
  
  // const [field,setField] = useState()

  const hanOnSubmit = (e) =>{
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...formData,
      accountType,
    }
    console.log("FormData",signupData)

    dispatch(signUp(signupData,navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }


   const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]
  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      {/* form */}
      <form onSubmit={hanOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className='flex gap-x-4 '>
          <label>
           <p className='mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]'>FirstName <sup className='text-[#EF476F]'>*</sup></p>
           <input
           required
           type='text'
           value={firstName}
           onChange={handleOnChange}
           name='firstName'
           placeholder='Enter your First Name'
           style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg bg-[#161D29] p-2.5 text-[#F1F2FF]"
           />
          </label>

          <label>
           <p className='mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]'>LastName <sup className='text-[#EF476F]'>*</sup></p>
           <input
           required
           type='text'
           value={lastName}
            onChange={handleOnChange}
           name='lastName'
           placeholder='Enter your Last Name'
           style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" rounded-lg bg-[#161D29] p-2.5 text-[#F1F2FF]"
           />
          </label>

        </div>
        {/* email */}
        <div>
          <label className='w-full '>
           <p className='mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]'>Email <sup className='text-[#EF476F]'>*</sup></p>
           <input
           required
           type='email'
          value={email}
           onChange={handleOnChange}
           name='email'
           placeholder='Enter your Email'
           style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-105  rounded-lg bg-[#161D29] p-2.5 text-[#F1F2FF] "
           />
          </label>
        </div>
        {/* password */}
          <div className='flex gap-x-4'>
             <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
              Create Password <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg bg-[#161D29] p-2.5 pr-10 text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9.5 z-8 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
              Confirm Password <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg bg-[#161D29] p-2.5 pr-10 text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9.5 z-8 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          </div>

          <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-300 py-2 px-3 font-medium text-[#000814]"
        >
          Create Account
        </button>

      </form>

    </div>
  )
}

export default SignupForm
