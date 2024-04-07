import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/profileSlice";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const isLoading = useSelector((state) => state.profileSlice.isLoading);

  const profile = useSelector((state) => state.profileSlice.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  });

  return (
    <React.Fragment>
      {isLoading && profile === null ? <Spinner></Spinner> : <h1>Test</h1>}
    </React.Fragment>
  );
};

export default Dashboard;
