import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/Authslice";
import profileReducer from "../slices/Pofileslice";
import cartReducer from "../slices/Cartslice"
import courseReducer from "../slices/Courseslice"
import viewCourseReducer from "../slices/ViewCourseSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
})

export default rootReducer