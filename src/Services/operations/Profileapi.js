import toast from "react-hot-toast";
import { AUTHAPI, PROFILE } from "../api";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/Pofileslice";


const {GETENROLLEDCOURSES_API,UPDATEPROFILEPIC_API,EDITPROFILE_API} = PROFILE
const {INSTRUCTORDASHBOARD_API} = AUTHAPI

export const getenrolledCourse = async(token)=>{
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
        method:"POST",
        url:GETENROLLEDCOURSES_API,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(!response.data.success){
        throw new Error(response.data.message)
    }
    console.log("data",response)
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId);
  return result
}

export const getInstructorData = async(token)=>{
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method:"POST",
      url:INSTRUCTORDASHBOARD_API,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    if(!response.data.success){
      throw new Error(response.error)
    }
    console.log("Result",response.data.data);
    result = response.data.data
  } catch (error) {
    console.log("Error",error.response);
    toast.error("Could not get InstructorData")
  }
  toast.dismiss(toastId);
  return result
}

export const UpdateProfilePic = async(token,formData,dispatch)=>{
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method:"POST",
      url:UPDATEPROFILEPIC_API,
      body:formData,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.picture));
      localStorage.setItem(
      "user",
      JSON.stringify(response.data.picture)
    );
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
    toast.error("Could Not Update Display Picture")
  }
  toast.dismiss(toastId)
}

export const editProfile = async(token,data,dispatch)=>{
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector({
      method:"POST",
      url:EDITPROFILE_API,
      body:data,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(
        setUser({ ...response.data.data, image: userImage })
      )
      toast.success("Profile Updated Successfully")
  } catch (error) {
    console.log("Error",error);
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}