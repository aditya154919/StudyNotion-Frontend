import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Services/operations/Authapi";
import { useNavigate } from "react-router";

const ForgotPass = () => {
//   const [loading, setLoading] = useState(false);
  const {loading} = useSelector((state)=>state.auth)
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e)=>{
   e.preventDefault();
   dispatch(forgotPassword(email,setEmail));
   navigate(`/verifyOtp/${email}`)
  }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-125 p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-9.5 text-gray-200">
            {!emailSent ? "Reset Pawword" : "Check Mail"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-6.5 text-gray-400">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.89rem] leading-5.5 text-gray-200">
                  Enter Your Email
                </p>
                <input
                  required
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg w-full bg-[#2C333F] p-3 text-[16px] leading-6 text-[#F1F2FF] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-[#6E727F] focus:outline-none"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 cursor-pointer w-full rounded-lg bg-[#FFD60A] py-3 px-3 font-medium text-[#000814]"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
