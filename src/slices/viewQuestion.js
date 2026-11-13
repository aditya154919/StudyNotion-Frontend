import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionData: [],
  questionEntireData: [],
  currentQuestion: null,
  solvedQuestions: [],
  totalNoOfQuestions: 0,
};

const viewQuestionSlice = createSlice({
  name: "viewQuestion",
  initialState,
  reducers: {
    setQuestionData: (state, action) => {
      state.questionData = action.payload;
    },

    setEntireQuestionData: (state, action) => {
      state.questionEntireData = action.payload;
    },
    setCurrentQuestion:(state,action)=>{
        state.currentQuestion = action.payload;
    },

    setTotalNoOfQuestions: (state, action) => {
      state.totalNoOfQuestions = action.payload;
    },

    setSolvedQuestions: (state, action) => {
      state.solvedQuestions = action.payload;
    },

    updateSolvedQuestions: (state, action) => {
      state.solvedQuestions = [
        ...state.solvedQuestions,
        action.payload,
      ];
    },

    clearQuestionData: (state) => {
      state.questionData = [];
      state.questionEntireData = [];
      state.currentQuestion = null;
      state.solvedQuestions = [];
      state.totalNoOfQuestions = 0;
    },
  },
});

export const {
  setQuestionData,
  setEntireQuestionData,
  setCurrentQuestion,
  setTotalNoOfQuestions,
  setSolvedQuestions,
  updateSolvedQuestions,
  clearQuestionData,
} = viewQuestionSlice.actions;

export default viewQuestionSlice.reducer;