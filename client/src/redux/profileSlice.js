import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAndRemoveAlert } from "./alertSlice";

import { v4 as uuidv4 } from "uuid";
export const getProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me", {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    console.log(response.data);
    dispatch(profileSlice.actions.getProfile(response.data));
  } catch (error) {
    dispatch(profileSlice.actions.getProfileErrors(error.message));
  }
};
export const createProfile = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  };
  const data = JSON.stringify(formData);
  try {
    const id = uuidv4();
    const response = await axios.post("api/profile", data, config);
    console.log(response);
    dispatch(profileSlice.actions.getProfile(response.data));
    dispatch(
      setAndRemoveAlert({
        msg: "Profile Created",
        alertType: "success",
        id,
      })
    );
    navigate("/dashboard");
  } catch (error) {
    const id = uuidv4();
    console.log(error);
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors.length > 0) {
      errors.forEach((error) =>
        dispatch(
          setAndRemoveAlert({
            msg: error.msg,
            alertType: "danger",
            id,
          })
        )
      );
    }
  }
};
export const addExperience = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  };
  const data = JSON.stringify(formData);
  try {
    const id = uuidv4();
    const response = await axios.put("api/profile/experience", data, config);
    console.log(response);
    dispatch(profileSlice.actions.getProfile(response.data));
    dispatch(
      setAndRemoveAlert({
        msg: "Experience Added",
        alertType: "success",
        id,
      })
    );
    navigate("/dashboard");
  } catch (error) {
    const id = uuidv4();
    console.log(error);
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAndRemoveAlert({
            msg: error.msg,
            alertType: "danger",
            id,
          })
        )
      );
    }
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  };
  const data = JSON.stringify(formData);
  try {
    const id = uuidv4();
    const response = await axios.put("api/profile/education", data, config);
    console.log(response);
    dispatch(profileSlice.actions.getProfile(response.data));
    dispatch(
      setAndRemoveAlert({
        msg: "Education Added",
        alertType: "success",
        id,
      })
    );
    navigate("/dashboard");
  } catch (error) {
    const id = uuidv4();
    console.log(error);
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAndRemoveAlert({
            msg: error.msg,
            alertType: "danger",
            id,
          })
        )
      );
    }
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
    getProfile(state, action) {
      return { ...state, profile: action.payload, isLoading: false };
    },
    getProfileErrors(state, action) {
      return {
        ...state,
        profile: null,
        profiles: [],
        isLoading: false,
        errors: action.payload,
      };
    },
  },
});

export default profileSlice.reducer;
