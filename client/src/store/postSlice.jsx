import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    activePostPopup: false,
  },
  reducers: {
    activeCreatePost: (state) => {
      state.activePostPopup = !state.activePostPopup;
    },
  },
});

export const { activeCreatePost } = authSlice.actions;
export default authSlice.reducer;
