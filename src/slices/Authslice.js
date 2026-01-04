
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromStorage = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch {
    return null;
  }
};

const initialState = {
  signupData: null,
  loading: false,
  token: getTokenFromStorage(),
  message:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token",JSON.stringify(action.payload))
    },
    setMessage(state,action){
      state.message = action.payload
    }
    
  },
});

export const { setSignupData, setLoading, setToken,setMessage } =
  authSlice.actions;

export default authSlice.reducer;
