import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUserInfo, logoutUser } = userSlice.actions;
export default userSlice.reducer;
