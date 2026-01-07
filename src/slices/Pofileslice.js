import { createSlice } from "@reduxjs/toolkit";

let user = null;

// ✅ SAFELY read from localStorage
if (typeof window !== "undefined") {
  try {
    const storedUser = window.localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage");
    window.localStorage.removeItem("user");
  }
}

const initialState = {
  user,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;

      // ✅ SAFELY write to localStorage
      if (typeof window !== "undefined") {
        if (action.payload) {
          window.localStorage.setItem(
            "user",
            JSON.stringify(action.payload)
          );
        } else {
          window.localStorage.removeItem("user");
        }
      }
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
