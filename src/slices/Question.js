import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step:1,
    question:null,
    editquestion:true,
}

const questionSlice = createSlice({
    name:"question",
    initialState:initialState,
    reducers:{
        setStep:(state,action)=>{
            state.step = action.payload
        },
        setQuestion:(state,action)=>{
            state.question = action.payload
        },
        seteditQuestion:(state,action)=>{
            state.editquestion = action.payload
        },
        resetAll:(state)=>{
           state.step = 1,
           state.question = null,
           state.editquestion = false
        }

    }
})

export const {setQuestion,setStep,seteditQuestion,resetAll} = questionSlice.actions

export default questionSlice.reducer;