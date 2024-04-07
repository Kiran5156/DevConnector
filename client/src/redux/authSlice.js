import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAndRemoveAlert } from "./alertSlice";
import { v4 as uuidv4 } from "uuid";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/users",
        JSON.stringify({ name, email, password }),
        config
      );

      dispatch(
        auth.actions.register({ ...response.data, isAuthenticated: true })
      );
    } catch (error) {
      console.log(error);
      const id = uuidv4();
      const errors = error.response.data.errors;
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

      dispatch(
        auth.actions.register({
          token: null,
          isAuthenticated: false,
          user: null,
        })
      );
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/auth", body, config);
      dispatch(auth.actions.login({ ...response.data, isAuthenticated: true }));
    } catch (error) {
      const id = uuidv4();
      const errors = error.response.data.errors;
      // console.log(errors);
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
      dispatch(auth.actions.login({ token: null, isAuthenticated: false }));
    }
  };

const auth = createSlice({
  name: "authSlice",
  initialState: {
    token: localStorage.getItem("x-auth-token"),
    isAuthenticated: localStorage.getItem("x-auth-token") ? true : false,
    user: null,
    loading: true,
  },
  reducers: {
    register(state, action) {
      if (action.payload.isAuthenticated === false) {
        localStorage.removeItem("x-auth-token");
      } else {
        localStorage.setItem("x-auth-token", action.payload.token);
      }

      return {
        ...state,
        ...action.payload,

        loading: false,
      };
    },
    login(state, action) {
      if (action.payload.token) {
        localStorage.setItem("x-auth-token", action.payload.token);

        return { ...state, token: action.payload.token, isAuthenticated: true };
      } else {
        localStorage.removeItem("x-auth-token");

        return {
          ...state,
          token: null,
          isAuthenticated: false,
        };
      }
    },
    authenticate(state, action) {
      return { ...state, isAuthenticated: true };
    },
    logout(state, action) {
      console.log(state);
      localStorage.removeItem("x-auth-token");
      return { ...state, token: null, isAuthenticated: false };
    },
  },
});

export const { logout, authenticate } = auth.actions;
export default auth.reducer;
