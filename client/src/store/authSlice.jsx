import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || false,
  },
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
    },
    signup: (state, action) => {
      console.log("test");
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { signin, signup, logout } = authSlice.actions;
export default authSlice.reducer;
