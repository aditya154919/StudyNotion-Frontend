
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/Authslice";
import { apiConnector } from "../Services/apiconnector";
import { AUTHAPI } from "../Services/api";
import toast from "react-hot-toast";

const { RESETPASS_API } = AUTHAPI;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const resetToken = location.state?.resetToken;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      toast.error("Reset session expired. Please verify OTP again.");
      navigate("/login");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await apiConnector({
        method: "POST",
        url: RESETPASS_API,
        body: {
          resetToken,
          password,
          confirmPassword
        }
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Password updated successfully");

      setPassword("");
      setConfirmPassword("");

      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Password reset failed");

      toast.error(
        error.response?.data?.message ||
        "Password reset failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="w-full max-w-md bg-[#0f172a] rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-semibold text-white mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white border border-[#1e293b] focus:outline-none focus:border-sky-400"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white border border-[#1e293b] focus:outline-none focus:border-sky-400"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
