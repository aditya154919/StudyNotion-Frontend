import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Services/operations/Authapi'

const LoginForm = () => {
  const [showPassword,setShowPassword] = useState(false)
  // const {message} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const {email,password} = formData;



  const handleOnChange=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e) =>{
   e.preventDefault();

   console.log("Formdata",formData)
   dispatch(login(formData,navigate));

   setFormData({
    email:"",
    password:""
   })
  }

  return (
    
    <form onSubmit={handleSubmit}
    className="mt-6 flex w-full flex-col gap-y-4">
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-[#161D29] p-3 text-[#F1F2FF]"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-5.5 text-[#F1F2FF]">
          Password <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-lg bg-[#161D29] p-3 pr-12 text-[#F1F2FF]"
        />
        <span
        onClick={() =>setShowPassword(!showPassword)}
          className="absolute right-3 top-9.5 z-10 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>


      <button
        type="submit"
        className="mt-6 rounded-lg bg-[#FFD60A] py-2 px-3 font-medium text-#000814"
      >
        Sign In
      </button>

    </form>
  )
}

export default LoginForm
