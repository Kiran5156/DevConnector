import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const setAndRemoveAlert =
  ({ msg, alertType, id }) =>
  async (dispatch) => {
    dispatch(setAlert({ msg, alertType, id }));
    setTimeout(() => {
      console.log("removing alert");
      dispatch(removeAlert({ id }));
    }, 3000);
  };

const alert = createSlice({
  name: "alertSlice",
  initialState: [],
  reducers: {
    setAlert(state, action) {
      return [...state, action.payload];
    },
    removeAlert(state, action) {
      return state.filter((alert) => alert.id !== action.payload.id);
    },
  },
});

export const { setAlert, removeAlert } = alert.actions;
export default alert.reducer;
