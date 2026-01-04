import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { apiConnector } from "../Services/apiconnector";
import { AUTHAPI } from "../Services/api";
import toast from "react-hot-toast";
import { setLoading } from "../slices/Authslice";

const{VERIFYOTP_API} = AUTHAPI

const VerifyOtp = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
//   console.log(email);

  const handleVerifyotp = async(e) =>{
    e.preventDefault();
    setLoading(true)
    try {
        const res = await apiConnector({
        method:"POST",
        url:VERIFYOTP_API,
        body:{otp:otp,email:email}
    })

    if(!res.data.success){
        toast.error(res.data.message)
    }
    toast.success("Otp verify success");
    navigate(`/change-pass/${email}`)
    
    } catch (error) {
        console.log("Error",error);
        toast.error(error.response.data.message)
    }
    setLoading(false)
  }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spineer"></div>
      ) : (
        <div className="max-w-125 p-4 lg:p-8">
          <h1 className="text-gray-200 font-semibold text-[1.875rem] leading-9.5">
            Verify OTP
          </h1>
          <p className="text-[1.125rem] leading-6.5 my-4 text-[#AFB2BF]">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyotp}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-12 lg:w-15 border-0 bg-[#161D29] rounded-lg text-gray-200 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-[#FFD60A]"
                />
                
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-[#FFD60A] py-3 px-3 rounded-md mt-6 font-medium text-[#000814]"
            >
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;
