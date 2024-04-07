import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("api/profile/me", {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    // dispatch(profileSlice.actions.getProfileErrors(error.message))
  }
};
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profiles: [],
    isLoading: true,
    errors: {},
  },
  reducers: {
    getProfile() {},
    getProfileErrors() {},
  },
});

export default profileSlice.reducer;
