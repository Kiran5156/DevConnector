import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    alertSlice: alertReducer,
    authSlice: authReducer,
    profileSlice: profileReducer,
  },
});

export default store;
