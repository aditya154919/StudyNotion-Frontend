
const BASE_URL = "https://studynotion-backend-1-dar5.onrender.com"
// "http://localhost:4000/api/v1"

export const AUTHAPI = {
    SIGNUP_API:BASE_URL+"/signup",
    VERIFY_API:BASE_URL+"/verify",
    LOGIN_API:BASE_URL+"/login",
    LOGOUT_API:BASE_URL+"/logout",
    FORGOTPASS_API:BASE_URL +"/forgotPassword",
    VERIFYOTP_API:BASE_URL+"/verifyOtp",
    RESETPASS_API:BASE_URL+"/resetPassword",
    INSTRUCTORDASHBOARD_API:BASE_URL+"/instructorDashboard"
}

export const tag = {
    CREATETAG_API:BASE_URL +"/tag/createTag",
    TAG_API: BASE_URL + "/tag/getAllTag",
    TAG_PAGE_API:BASE_URL + "/tag/tagPageDetails"
    
}


export const COURSEAPI = {
    CREATECOURSE_API:BASE_URL +"/tag/createCourse",
    EDITCOURSE_API:BASE_URL + "/tag/getCourseDetails",
    GETFULLCOURSEDETAILS_API :BASE_URL + "/tag/getFullCourseDetails",
    GETINSTRUCTORCOURSES_API:BASE_URL + "/tag/getInstructorCourses",
    UPDATECOURSE_API:BASE_URL+"/tag/updateCourse",
    DELETECOURSE_API:BASE_URL+"/tag/deleteCourse",
    ENROLLEDCOURSEDETAILS_API:BASE_URL +"/tag/getFullEnrolledCourse",
    RATING_API:BASE_URL + "/tag/createRating",
    COURSEPROGRESS_API:BASE_URL + "/tag/courseProgress",
    GETRATING_API:BASE_URL+"/tag/getRating"
}

export const SECTIONAPI = {
    CREATESECTION_API:BASE_URL +"/tag/createSection",
    UPDATESECTION_API:BASE_URL +"/tag/updateSection",
    CREATESUBSECTION_API:BASE_URL + "/tag/createSubSection",
    DELETESECTION_API:BASE_URL +"/tag/deleteSection",
    DELETESUBSECTION_API:BASE_URL +"/tag/deleteSubSection",
    UPDATESUBSECTION_API:BASE_URL+ "/tag/updateSubSection"
}

export const PAYMENTAPI = {
    CREATEORDER_API:BASE_URL+"/payment/capturePayment",
    VERIFYPAYMENT_API:BASE_URL+"/payment/verifyPayment",
    SENDMAILPAYMENT_API:BASE_URL+"/payment/sendMailSuccess"
}
export const PROFILE = {
    GETENROLLEDCOURSES_API:BASE_URL + "/getEnrolledCourses",
    CONTACTUS_API:BASE_URL+"/contactUs",
    UPDATEPROFILEPIC_API:BASE_URL+"/updateProfilePic",
    EDITPROFILE_API:BASE_URL+"/updateProfile"
}

export const STREAM = {
    CREATESTREAM_API:BASE_URL+"/stream/createRoom",
    GETSTREAMDATA_API:BASE_URL+"/stream/getStreamData",
    GETTOKEN_API:BASE_URL+"/stream/token",
    GETENROLLEDSTUDENTROOM:BASE_URL+"/stream/studentRoom",
    SENDNOTIFICATION_API:BASE_URL+"/stream/notification",
    ENDSTREAM_API:BASE_URL+"/stream/endStream",
    UPLOADRECORDING_API:BASE_URL+"/stream/uploadrecording"
}