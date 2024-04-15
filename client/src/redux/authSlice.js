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
      const id = uuidv4();
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
      console.log(response);
      dispatch(auth.actions.login({ ...response.data, isAuthenticated: true }));
      localStorage.setItem("x-auth-token", response.data.token);
    } catch (error) {
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
        auth.actions.setError({ token: null, isAuthenticated: false, errors })
      );
      localStorage.removeItem("x-auth-token");
    }
  };

export const authenticate = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };
    const response = await axios.get("/api/auth", config);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("isAuthenicated");
    dispatch(auth.actions.logout());
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
      return {
        ...state,
        ...action.payload,

        loading: false,
      };
    },
    login(state, action) {
      return {
        ...state,
        token: null,
        isAuthenticated: true,
      };
    },
    authenticate(state, action) {
      return { ...state, isAuthenticated: action.payload };
    },
    logout(state, action) {
      localStorage.removeItem("x-auth-token");
      return { ...state, token: null, isAuthenticated: false };
    },
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
