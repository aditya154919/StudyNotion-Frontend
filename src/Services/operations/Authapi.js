import { setLoading, setMessage, setToken } from "../../slices/Authslice";
import { AUTHAPI, tag } from "../api";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/Pofileslice";
import { resetCart } from "../../slices/Cartslice";

const { SIGNUP_API, VERIFY_API, LOGIN_API,LOGOUT_API,FORGOTPASS_API} = AUTHAPI;



export function signUp(signupData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const res = await apiConnector({
        method: "POST",
        url: SIGNUP_API,
        body: signupData, // 👈 DIRECT FLAT OBJECT
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Signup successful! Please verify your email");
      navigate("/verifyemail");
    } catch (error) {
      toast.error("Signup failed");
      console.log("SIGNUP API ERROR", error);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function verifyemail(token,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("verifing email...");
    try {
      const result = await apiConnector({
        method:"POST",
        url:`${VERIFY_API}/${token}`
      });
      if(!result.data.success){
        throw new Error(res.data.message)
      }
      toast.success("Email Verified Success");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error("Verify failed");
      console.log("Error",error)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function login(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging...");
    dispatch(setLoading(true));

    try {
      const result = await apiConnector({
        method: "POST",
        url: LOGIN_API,
        body: formData,
      });

      toast.success("Login success", { id: toastId });

      dispatch(setToken(result.data.refreshtoken));

      const userImage = result.data?.user?.image
        ? result.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`;

      dispatch(setUser({ ...result.data.user, image: userImage }));

      setTimeout(() => navigate("/dashboard/myprofile"), 800);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      toast.error(errorMessage, { id: toastId });
      dispatch(setMessage(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate){
  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout success")
  }
}

export function forgotPassword(email,setEmail){
  return async(dispatch) =>{
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method:"POST",
        url:FORGOTPASS_API,
        body:{email:email}
      })
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmail(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false))
  }
}

const {CREATETAG_API,CREATECOURSE_API,EDITCOURSE_API,TAG_API} = tag

export const gettag = async()=> {

  let result = [];
  try {
    const response = await apiConnector({
      method:"GET",
      url:TAG_API,
    })
    console.log("TAG DETAILS",response);
    if(!response?.data?.success){
      // toast.error("TAG NOT FETCHED")
      console.log("Not fetched")
    };
    result = response.data.data 
    console.log("RESULT",result)
  } catch (error) {
     console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result;
}

