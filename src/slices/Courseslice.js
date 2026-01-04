import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step:1,
    course:null,
    editCourse:true,
    paymentLoading:false

}

const courseSlice = createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setStep:(state,action)=>{
            state.step = action.payload
        },
        setCourse:(state,action)=>{
            state.course = action.payload
        },
        seteditCourse:(state,action)=>{
            state.editCourse = action.payload
        },
        setPaymentLoading:(state,action)=>{
            state.paymentLoading = action.payload
        },
        resetAll:(state)=>{
           state.step = 1,
           state.course = null,
           state.editCourse = false
        }

    }
})

export const {setCourse,setPaymentLoading,setStep,seteditCourse,resetAll} = courseSlice.actions

export default courseSlice.reducer;