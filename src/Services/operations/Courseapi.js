import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setCourse, seteditCourse, setStep } from "../../slices/Courseslice";
import { COURSEAPI, SECTIONAPI, tag } from "../api";
import { setLoading } from "../../slices/Authslice";
import { updateCompletedLectures } from "../../slices/ViewCourseSlice";

const {
  CREATECOURSE_API,
  GETINSTRUCTORCOURSES_API,
  UPDATECOURSE_API,
  DELETECOURSE_API,
  GETFULLCOURSEDETAILS_API,
  ENROLLEDCOURSEDETAILS_API,
  RATING_API,
  COURSEPROGRESS_API
} = COURSEAPI;
const {
  CREATESECTION_API,
  CREATESUBSECTION_API,
  UPDATESUBSECTION_API,
  UPDATESECTION_API,
  DELETESECTION_API,
  DELETESUBSECTION_API,
} = SECTIONAPI;
const { TAG_PAGE_API } = tag;

export const createCourse = async (formData, token, dispatch) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATECOURSE_API,
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      throw new Error("Course not created");
    }
    // console.log("Course created", response);
    dispatch(setStep(2));
    dispatch(setCourse(response.data.data));
    result = response.data.data;
  } catch (error) {
    console.log("ERROR", error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const editCourseDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: UPDATECOURSE_API,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    // console.log("RESUlt", res.data.data);
    result = res.data.data;
    toast.success("Course Updated success");
  } catch (error) {
    console.log("Error", error.message);
  }
  toast.dismiss(toastId);
  return result;
};
export const createSection = async (formData, token) => {
  console.log("FormData", formData);
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: CREATESECTION_API,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("SECTION NOT CREATED");
    }
    result = res.data.data;
    console.log("SEction created success");
  } catch (error) {
    console.log("Error", error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (formData, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const result = await apiConnector({
      method: "POST",
      url: CREATESUBSECTION_API,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!result.data.success) {
      throw new Error("SUBsection not created");
    }
    response = result.data;
    toast.success("Lecture Added");
    console.log("Sub section created success", result.data);
  } catch (error) {
    console.log("ERROR", error.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "GET",
      url: GETINSTRUCTORCOURSES_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error("COurse Not found something error");
    }
    console.log("Courseses",response.data.data)
    result = response.data.data;
  } catch (error) {
    console.log("Someting error");
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getTagCourses = async (categoryId) => {
  // console.log("Hello", categoryId);
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: TAG_PAGE_API,
      body: {
        tagId: categoryId,
      },
    });
    if (!response.data.success) {
      throw new Error("TAG COURSES NOT FETCHED");
    }
    result = response.data;
  } catch (error) {
    console.log("Error", error.message);
    // toast.error(error.message)
    // result = error.response.message;
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const result = await apiConnector({
      method: "POST",
      url: DELETECOURSE_API,
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.data.success) {
      throw new Error("Course Could not delete");
    }

    console.log("Course", result.data.message);
    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const getFullCourseDetailse = async (courseId, token, dispatch) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: GETFULLCOURSEDETAILS_API,
      body:courseId,
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("CourseFull Deatils",response.data.data.courseDetails)
    result = response?.data.data.courseDetails;
    dispatch(setCourse(result));
    dispatch(seteditCourse(true));
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const getFullEnrolledCourse = async(courseId,token)=>{
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method:"POST",
      url:ENROLLEDCOURSEDETAILS_API,
      body:{courseId:courseId},
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    if(!res.data.success){
      throw new Error(res.data.message)
    }
    console.log("Enrolled",res.data.data)
    result = res.data.data;
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
  
}

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: UPDATESECTION_API,
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) {
      throw new Error("Error", res.data.message);
    }
    console.log("Updates section", res.data.data);
    result = res.data.data;
    toast.success("Section updated success");
  } catch (error) {
    console.log("Error", error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: DELETESECTION_API,
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      throw new Error("ERROR", response.data.message);
    }
    // console.log("DELETE SECTION SUCCESS");
    result = response.data.data;
    toast.success("Section deleted success");
  } catch (error) {
    // console.log("ERROR call nhi huwa",error.message)
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: DELETESUBSECTION_API,
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error", error.data.message);
    }
    result = res.data.data;
    toast.success("Subsection deleted");
  } catch (error) {
    console.log("ERROR", error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: UPDATESUBSECTION_API,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error", error.data.message);
    }
    result = res.data.data;
    toast.success("SubSection update success");
  } catch (error) {
    console.log("ERROR", error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createRating = async(data,token)=>{
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const res = await apiConnector({
      method:"POST",
      url:RATING_API,
      body:data,
      headers:{
        Authorization :`Bearer ${token}`
      }
    })

    if(!res.data.success){
      throw new Error(res.data)
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............",error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
  return success
}

export const courseProgress = async(data,token,dispatch)=>{
  const toastId = toast.loading("Loading...");
  let result = null
  console.log("mark complete data", data);
  try {
    const response = await apiConnector({
      method:"POST",
      url:COURSEPROGRESS_API,
      body:data,
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    dispatch(updateCompletedLectures(data.subsectionId))
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
  
}