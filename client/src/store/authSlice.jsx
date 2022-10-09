import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: false,
    key: JSON.parse(localStorage.getItem("key")) || false,
  },
  reducers: {
    signin: (state, action) => {
      state.key = action.payload.id;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = false;
      state.key = false;
      localStorage.removeItem("key");
    },
    userControl: (state, action) => {
      state.user = state.user;
    },
  },
});

export const { signin, signup, logout } = authSlice.actions;
export default authSlice.reducer;
