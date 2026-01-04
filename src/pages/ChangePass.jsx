import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { setLoading } from "../slices/Authslice";
import { apiConnector } from "../Services/apiconnector";
import { AUTHAPI } from "../Services/api";
import toast from "react-hot-toast";
const {RESETPASS_API} = AUTHAPI

const ResetPassword = () => {
    const {email} = useParams()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // call reset password API
    console.log("Password reset:", password);
    setLoading(true);
    try {
        const res = await apiConnector({
        method:"POST",
        url:RESETPASS_API,
        body:{
            password:password,
            confirmPassword:confirmPassword,
            email:email
        }
        })

        if(!res.data.success){
            toast.error(res.data.message)
        }
        toast.success("Password Updated");
        setTimeout(() => navigate("/login"), 1000);

    } catch (error) {
        console.log("Eror")
        toast.error(error.response.data.message)
    }
    setLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="w-full max-w-md bg-[#0f172a] rounded-2xl p-8 shadow-2xl">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Enter your new password below
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* New Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white
                         border border-[#1e293b] focus:outline-none
                         focus:border-sky-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white
                         border border-[#1e293b] focus:outline-none
                         focus:border-sky-400"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300
                       text-black font-semibold py-3 rounded-lg
                       transition-all duration-200"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
